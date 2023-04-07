<?php
// add basic plugin security.
defined('ABSPATH') || exit;
class RMFile extends AdeCustomSHipping
{
    public function __construct()
    {
        $this->addNotification();
    }

    public function addNotification()
    {
        $currenttime = date('Y-m-d H:i:s');
        add_option('ade_custom_time', "$currenttime", '', 'yes');
    }

    public function updateNotification()
    {
        $currenttime = date('Y-m-d H:i:s');
        update_option('ade_custom_time', "$currenttime", '', 'yes');
    }

    public function dumpcache()
    {
        $ng_cache = plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities.txt';
        $gh_cache = plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities_gh.txt';
        file_put_contents($ng_cache, get_option("ade_custom_ng"), FILE_TEXT);
        file_put_contents($gh_cache, get_option("ade_custom_gh"), FILE_TEXT);
    }

    public function unlinkFiles()
    {
        unlink(plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities.json');
        $clear = unlink(plugin_dir_path(ADE_CUSTOM_PLGUN_FILE) . 'inc/all_cities_gh.json');
        if ($clear) {
            $this->dumpcache();
        };
    }

    public function displayNotification()
    {
        $notification_time = get_option('ade_custom_time');
        $currenttime = date('Y-m-d H:i:s');
        $now = new DateTime("$notification_time");
        $ref = new DateTime("$currenttime");
        $diff = $now->diff($ref);
        //log questions
        return $diff->d;
    }
}
