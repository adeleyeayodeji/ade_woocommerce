<?php
// add basic plugin security.
defined('ABSPATH') || exit;
function ade_custom_install_woocommerce_admin_notice()
{
?>
    <div class="error">
        <p>Ade Custom Shipping is enabled but not effective. It requires
            <?php
            echo sprintf(
                '<a class="install-now button" data-slug="%s" href="%s" aria-label="%s" data-name="%s">%s </a>',
                esc_attr("woocommerce"),
                esc_url(wp_nonce_url(self_admin_url('update.php?action=install-plugin&plugin=woocommerce'), 'install-plugin_woocommerce')),
                esc_attr(sprintf(_x('Install %s now', 'plugin'), "Woocommerce")),
                esc_attr("Woocommerce"),
                __('Woocommerce')
            );
            ?>
            in order to work.
        </p>
    </div>
<?php
}


function ade_custom_add_review_note()
{
?>
    <div id="message" class="updated notice is-dismissible ade_custom">
        <img align="left" src="<?php echo plugin_dir_url(ADE_CUSTOM_PLGUN_FILE) . 'assets/img/ade_logo.png'; ?>" class="ade_logo_" alt="Ade Custom Shipping">
        <p>
            It's great to see that you've been using the <b>Ade Custom Shipping</b> plugin for a while now. Hopefully you're
            happy with
            it! If so, would you consider leaving a positive review? <br>It really helps to support the plugin and helps
            others
            to discover it too!
            <br>
            <span style="display: block; margin: 0.5em 0.5em 0 0; clear: both;">
                <?php
                echo sprintf(
                    '<a href="%s" title="%s" target="_blank" rel="noopener noreferrer">%s</a>',
                    esc_url("https://wordpress.org/support/plugin/ade-custom-shipping/reviews/", 'ade_custom_shpping'),
                    esc_attr("Ade Custom Shipping"),
                    __("Sure, I'd love to!")
                );
                ?>
                |
                <?php
                echo sprintf(
                    '<a href="#" id="ade_custom_later" aria-label="%s" target="_blank" rel="noopener noreferrer">%s</a>',
                    esc_attr("Ade Custom Shipping"),
                    __("Maybe Later")
                );
                ?>

            </span>

        </p>

        <button type="button" class="notice-dismiss">
            <span class="screen-reader-text">
                Dismiss this
                notice.</span>
        </button>
    </div>
<?php
}
