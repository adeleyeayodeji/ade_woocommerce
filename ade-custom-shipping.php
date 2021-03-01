<?php
/**
 * Plugin Name: Ade Custom Shipping
 * Plugin URI: https://wordpress.org/plugins/ade_custom_shipping/
 * Author: Adeleye Ayodeji
 * Author URI: https://adeleyeayodeji.com
 * Description: Add shipping zones 3 levels deep for ecommerce.
 * Version: 1.0
 * License: GPL2
 * License URL: http://www.gnu.org/licenses/gpl-2.0.txt
*/

// add basic plugin security.
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'ADE_CUSTOM_PLGUN_FILE' ) ) {
	define( 'ADE_CUSTOM_PLGUN_FILE', __FILE__ );
}

add_filter( 'woocommerce_states', 'ade_custom_shipping' );
add_filter( 'woocommerce_states', 'ade_custom_shipping_gh' );

$json = json_decode(file_get_contents(plugin_dir_path( ADE_CUSTOM_PLGUN_FILE ) . 'inc/all_cities.json'));
$json_gh = json_decode(file_get_contents(plugin_dir_path( ADE_CUSTOM_PLGUN_FILE ) . 'inc/all_cities_gh.json'));


function ade_custom_shipping( $states ) {
    global $json;

    $map = array();

    foreach ( $json as $city) {
        for ($i=0; $i < count($city->lgas); $i++) { 
            $map[] = $city->lgas[$i] . ', '.$city->state;
        }
    }
    
    $states['NG'] = $map;
    
    return $states;
}

function ade_custom_shipping_gh( $states ) {
    global $json_gh;

    $map = array();

    foreach ( $json_gh as $city) {
        if(count($city->lgas) == 0){
            $map[] = $city->region;
        }else{
            for ($i=0; $i < count($city->lgas); $i++) { 
                $map[] = $city->lgas[$i] . ', '.$city->state. ', '.$city->region;
            }
        }
    }
    
    $states['GH'] = $map;
    
    return $states;
}

//Proudly made by Adeleye Ayodeji => adeleyeayodeji.com