<?php
// add basic plugin security.
defined('ABSPATH') || exit;
//Check
function ade_activate_database()
{
  AdeCustomSHipping::activate_database();
}
function ade_rm_database()
{
  // AdeCustomSHipping::rm_database();
}
register_activation_hook(ADE_CUSTOM_PLGUN_FILE, 'ade_activate_database');
register_deactivation_hook(ADE_CUSTOM_PLGUN_FILE, 'ade_rm_database');
//Trigger
AdeCustomSHipping::instance();
//add custom class
require_once plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/AdeCustomClass.php';
