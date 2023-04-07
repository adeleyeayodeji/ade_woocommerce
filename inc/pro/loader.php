<?php
// add basic plugin security.
defined('ABSPATH') || exit;
if (!in_array('ade-custom-shipping-premium/ade-custom-shipping-premium.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // adding to the menu
    function _ade_custom_shipping_pro()
    {
        add_menu_page(
            'Ade Custom Shipping Pro', // $page_title
            'Ade Custom Pro', // $menu_title
            'manage_options', //  $capability
            'ade-custom-shipping', // $menu_slug
            'ade_custom_shipping_propage', // $function
            plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'assets/img/ade_logo_new.png', // Plugin $icon_url
            200 // Plugin $position
        );
    }
    add_action('admin_menu', '_ade_custom_shipping_pro');

    function ade_custom_shipping_propage()
    {
        require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/pro/dashboard.php';
    }
}
