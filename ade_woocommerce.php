<?php
/**
 * Plugin Name: Ade WooCommerce States
 * Plugin URI: https://adeleyeayodeji.com
 * Author: Adeleye Ayodeji
 * Author URI: https://adeleyeayodeji.com
 * Description: Add shipping zones 3 levels deep for woocommerce.
 * Version: 0.1.0
 * License: GPL2
 * License URL: http://www.gnu.org/licenses/gpl-2.0.txt
 * text-domain: 2lsw
*/

// add basic plugin security.
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'ADE_WOOCOOMERCE_PLGUN_FILE' ) ) {
	define( 'ADE_WOOCOOMERCE_PLGUN_FILE', __FILE__ );
}

add_filter( 'woocommerce_states', 'ade_wooceommerce' );

$json = json_decode(file_get_contents(plugin_dir_path( ADE_WOOCOOMERCE_PLGUN_FILE ) . 'inc/all_cities.json'));


function ade_wooceommerce( $states ) {
    global $json;

    $map = array();

    foreach ( $json as $city) {
        for ($i=0; $i < count($city->lgas); $i++) { 
            $map[strtolower(str_replace(" ", "", $city->lgas[$i]))] = $city->lgas[$i] . ', '.$city->state;
        }
    }
    
    $states['NG'] = $map;
    
    return $states;
}

//Proudly made by Adeleye Ayodeji