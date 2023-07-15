<?php

/**
 * Plugin Name: Ade Custom Shipping
 * Plugin URI: https://wordpress.org/plugins/ade-custom-shipping/
 * Author: Adeleye Ayodeji
 * Author URI: https://adeleyeayodeji.com
 * Description: Add shipping zones 3 levels deep for ecommerce.
 * Version: 4.1.1
 * License: GPL2
 * License URL: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// add basic plugin security.
defined('ABSPATH') || exit;

if (!defined('ADE_CUSTOM_PLGUN_FILE')) {
  define('ADE_CUSTOM_PLGUN_FILE', __FILE__);
}
//core
require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/core.php';
require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/plugin_path.php';

function ade_custom_shipping_page_link($links)
{
  $links[] = '<a href="' .
    admin_url('admin.php?page=wc-settings&tab=shipping&zone_id=new') .
    '">' . __('Go to Shipping') . '</a>';
  $links[] = '<a href="' .
    admin_url(!in_array('ade-custom-shipping-premium/ade-custom-shipping-premium.php', apply_filters('active_plugins', get_option('active_plugins'))) ? 'admin.php?page=ade-custom-shipping' : 'admin.php?page=ade-custom-shipping-premium') .
    '">' . __(!in_array('ade-custom-shipping-premium/ade-custom-shipping-premium.php', apply_filters('active_plugins', get_option('active_plugins'))) ? '<b>Enable LGA editor</b>' : 'Go to Editor') . '</a>';
  return $links;
}
function ade_custom_js()
{
  wp_enqueue_script(
    'ade-custom-js', // name your script so that you can attach other scripts and de-register, etc.
    plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'assets/js/ade-custom-js.js', // this is the location of your script file
    array('jquery') // this array lists the scripts upon which your script depends
  );
  //Localise
  $ade_custom_params = array(
    'nounce_url' => wp_nonce_url(self_admin_url('update.php?action=install-plugin&plugin=woocommerce'), 'install-plugin_woocommerce'),
    'ajax_url' => admin_url('admin-ajax.php')
  );
  wp_localize_script('ade-custom-js', 'ade_custom_params', $ade_custom_params);
  //Add admin styles
  wp_register_style('ade_custom_wp_admin_css', plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'assets/css/style.css', false, '1.0.0');
  wp_enqueue_style('ade_custom_wp_admin_css');
}
add_action('admin_enqueue_scripts', 'ade_custom_js');
//enqueue wc js
add_action('wp_enqueue_scripts', function () {
  //check if page is cart or checkout page
  if (function_exists('WC')) {
    if (is_cart() || is_checkout()) {
      if (get_option('ade_state_spliting') == 'yes' || get_option('ade_state_spliting') == '') {
        //check if plugin is installed
        if (in_array('ade-custom-shipping-checkout/ade-custom-shipping-checkout.php', apply_filters('active_plugins', get_option('active_plugins')))) {
          //do  nothing
        } else {
          //cart
          wp_enqueue_script(
            'ade-wc-custom-cart-js', // name your script so that you can attach other scripts and de-register, etc.
            plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'assets/js/wc-custom-cart.js', // this is the location of your script file
            array('jquery'), // this array lists the scripts upon which your script depends
            time()
          );
          //checkout
          wp_enqueue_script(
            'ade-wc-custom-checkout-js', // name your script so that you can attach other scripts and de-register, etc.
            plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'assets/js/wc-custom-checkout.js', // this is the location of your script file
            array('jquery'), // this array lists the scripts upon which your script depends
            time()
          );
        }
      }
    }
  }
});

// Menu
add_filter('plugin_action_links_' . plugin_basename(ADE_CUSTOM_PLGUN_FILE), 'ade_custom_shipping_page_link');

function ade_custom_check_install()
{
  if (!function_exists('WC')) {
    add_action('admin_notices', 'ade_custom_install_woocommerce_admin_notice');
  }
  //User review note
  $new = new RMFile();
  $newme = (int)$new->displayNotification();
  if ($newme >= 5) add_action('admin_notices', 'ade_custom_add_review_note');
}

add_action('plugins_loaded', 'ade_custom_check_install', 11);
//Notice
require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/plugin_notice.php';
//Plugin data
require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/plugin_data.php';
require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/auth/ajax.php';
require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/pro/loader.php';

//Proudly made with LOVE by Adeleye Ayodeji => adeleyeayodeji.com 

add_action("wp_head", function () {
  if (function_exists('WC')) {
    if (is_checkout() && get_option('ade_state_spliting') == 'yes') {
      $checkout = WC()->checkout();
      //get checkout billing state
      $billing_state = $checkout->get_value('billing_state') ?: null;
      if ($billing_state) {
        $dd1 = explode(', ', $billing_state);
        // enqueue_script as param
?>
        <script>
          var ade_billing_state = '<?php echo isset($dd1[1]) ? $dd1[1] : ''; ?>';
          var ade_billing_city = '<?php echo isset($dd1[0]) ? $dd1[0] : ''; ?>';
        </script>
      <?php
      } else {
      ?>
        <script>
          var ade_billing_state = '';
          var ade_billing_city = '';
        </script>
      <?php
      }
    } else {
      ?>
      <script>
        var ade_billing_state = '';
        var ade_billing_city = '';
      </script>
<?php
    }
  }
}, 10, 0);
