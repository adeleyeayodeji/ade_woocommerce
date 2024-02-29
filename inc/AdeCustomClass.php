<?php
//check for security
if (!defined('ABSPATH')) {
    exit('Direct script access denied.');
}

/**
 * Ade Custom Shipping Class
 * 
 * @package AdeCustomShipping
 * @since 4.1.5
 * @author Adeleye Ayodeji
 * @link https://adeleyeayodeji.com
 */
class AdeCustomClass
{
    /**
     * Constructor
     * 
     * @since 4.1.5
     */
    public function __construct()
    {
        //enqueue admin script
        add_action('admin_enqueue_scripts', array($this, 'ade_custom_js'));
    }

    /**
     * Enqueue admin script
     * 
     * @since 4.1.5
     */
    public function ade_custom_js()
    {
        //add style wp-components-css
        wp_enqueue_style('wp-components');
        //add script
        wp_enqueue_script(
            'ade-custom-build-js',
            plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'build/ade-core.js',
            array('jquery', 'select2', 'jquery-blockui', 'wp-element', 'wp-components', 'wp-i18n'),
            ADE_CUSTOM_SHIPPING_VERSION
        );
        //Localise
        $ade_custom_params = array(
            'ajax_url' => admin_url('admin-ajax.php'),
            //Nigeria states
            'woocommerce_states' => WC()->countries->get_states('NG'),
        );
        wp_localize_script('ade-custom-build-js', 'ade_custom_params', $ade_custom_params);
        //Add admin styles
        wp_enqueue_style('ade-custom-build-css', plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'build/ade-core.css', false, ADE_CUSTOM_SHIPPING_VERSION);
    }
}

//init class
new AdeCustomClass();
