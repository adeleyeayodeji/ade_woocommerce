<?php

// add basic plugin security.
defined('ABSPATH') || exit;
add_action('wp_ajax_nopriv_maybe_later', 'ade_custom_maybelater');
add_action('wp_ajax_maybe_later', 'ade_custom_maybelater');

function ade_custom_maybelater()
{
    $new = new RMFile();
    $new->updateNotification();
    return "success";
    die();
}
