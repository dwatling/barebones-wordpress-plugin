<?php
/*
Plugin Name: My WordPress Plugin
Version: 1.0.0
Author: Dan Watling
Author URI: http://danwatling.com
*/

if (!function_exists('add_action')) {
    // If we're being invoked directly, exit
    exit;
}

define('MYWPPLUGIN_VERSION', '1.0.0');
define('MYWPPLUGIN_MINIMUM_WP_VERSION', '3.2');
define('MYWPPLUGIN__PLUGIN_DIR', plugin_dir_path(__FILE__));

$wpVersion = $GLOBALS['wp_version'];
if (version_compare($wpVersion, MYWPPLUGIN_MINIMUM_WP_VERSION, '<')) {
    // Failed version check

    $message = "<strong>My WordPress Plug-in requires WordPress version $MYWPPLUGIN_MINIMUM_WP_VERSION or higher. Found: ($wpVersion)</strong>";

    echo $message;

    exit;
}


class MyWordPressPlugin {
    public function __construct() {
        add_action('admin_menu', array($this, 'add_pages'));
        add_action('admin_enqueue_scripts', array($this, 'add_scripts'));
    }

    public function add_pages() {
        // Add an entry to the Admin > Tools section
        add_management_page('My Page Title', 'My Side menu', 'manage_options', 'm', array($this, 'tools_page'));
    }

    public function add_scripts() {
        wp_register_script('_mywpplugin-vendor-script', plugin_dir_url( __FILE__ ) . 'js/vendor.min.js');
        wp_register_script('_mywpplugin-app-script', plugin_dir_url( __FILE__ ) . 'js/app.min.js', array('jquery', '_mywpplugin-vendor-script'));
        wp_register_style('_mywpplugin-css', plugin_dir_url( __FILE__ ) . 'css/app.min.css');

        wp_enqueue_script('_mywpplugin-vendor-script');
        wp_enqueue_script('_mywpplugin-app-script');
        wp_enqueue_style('_mywpplugin-css');
    }

    public function tools_page() {
        include "wordpress-plugin.page.php";
    }
}

new MyWordPressPlugin();

?>