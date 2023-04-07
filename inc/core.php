<?php
// add basic plugin security.
defined('ABSPATH') || exit;
class AdeCustomSHipping
{
    public static $json;
    public static $json_gh;

    public static function instance()
    {
        //More function 
        self::$json = unserialize(get_option("ade_custom_ng"));
        self::$json_gh = unserialize(get_option("ade_custom_gh"));
        add_filter('woocommerce_states',  array(__CLASS__, 'ade_custom_shipping'));
        add_filter('woocommerce_states', array(__CLASS__, 'ade_custom_shipping_gh'));
        //wc settings
        add_filter('woocommerce_general_settings', array(self::class, 'wcsettingsarea'), 10, 1);
    }

    public static function activate_database()
    {
        if (file_exists(plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities.json')) {
            $json = json_decode(file_get_contents(plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities.json'));
            $json_gh = json_decode(file_get_contents(plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities_gh.json'));
            if (get_option("ade_custom_ng") == false) {
                add_option('ade_custom_ng', serialize($json), '', 'yes');
                add_option('ade_custom_gh', serialize($json_gh), '', 'yes');
            }
            // RMFile
            $data = new RMFile();
            $data->unlinkFiles();
        } else {
            $json_txt = file_get_contents(plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities.txt');
            $json_txt_gh = file_get_contents(plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities_gh.txt');
            if (get_option("ade_custom_ng") == false) {
                add_option('ade_custom_ng', $json_txt, '', 'yes');
                add_option('ade_custom_gh', $json_txt_gh, '', 'yes');
                //RMFIle
                new RMFile();
            }
        }
    }

    public static function rm_database()
    {
        delete_option('ade_custom_ng');
        delete_option('ade_custom_gh');
        delete_option('ade_custom_time');
    }

    public static function ade_custom_shipping($states)
    {
        $map = array();

        foreach (self::$json as $city) {
            $ade_state_reference = get_option("ade_state_reference");
            if ($ade_state_reference) {
                $ade_state_reference = unserialize($ade_state_reference);
                if (is_array($ade_state_reference)) {
                    $is_active = $ade_state_reference["ade_state_reference"];
                    $data_array = $ade_state_reference["ade_lgas_state_reference"];
                    if ($is_active == "1") {
                        if (in_array($city->state, $data_array)) {
                            //skip
                            continue;
                        }
                    }
                }
            }
            for ($i = 0; $i < count($city->lgas); $i++) {
                $map[$city->lgas[$i] . ', ' . $city->state] = $city->lgas[$i] . ', ' . $city->state;
            }
        }

        $states['NG'] = $map;

        return $states;
    }

    public static function ade_custom_shipping_gh($states)
    {
        $map = array();

        foreach (self::$json_gh as $city) {
            if (count($city->lgas) == 0) {
                // $map[strtolower(str_replace(" ", "", $city->region))] = $city->region;
                $map[$city->region] = $city->region;
            } else {
                for ($i = 0; $i < count($city->lgas); $i++) {
                    // $map[strtolower(str_replace(" ", "", $city->lgas[$i].$i.$i))] = $city->lgas[$i] . ', '.$city->state. ', '.$city->region;
                    $map[$city->lgas[$i] . ', ' . $city->state . ', ' . $city->region] = $city->lgas[$i] . ', ' . $city->state . ', ' . $city->region;
                }
            }
        }

        $states['GH'] = $map;

        return $states;
    }

    public static function wcsettingsarea($settings)
    {
        $key = 0;

        foreach ($settings as $values) {
            $new_settings[$key] = $values;
            $key++;

            // Inserting array just after the post code in "Store Address" section
            if ($values['id'] == 'woocommerce_store_postcode') {
                $new_settings[$key] = array(
                    'title'    => __('Ade State Splitting', 'ade-custom-shipping'),
                    'desc'     => __('Enable', 'ade-custom-shipping'),
                    'id'       => 'ade_state_spliting',
                    'default'  => 'yes',
                    'type'     => 'checkbox',
                    'desc_tip' => __('Enable Ade Custom Shipping State Splitting, works only for Nigeria'),
                );
                $key++;
            }
        }
        return $new_settings;
    }
}
