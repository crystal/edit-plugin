<?php

/*
 * Plugin Name: Edit Plugin
 * Description: Edit the 5 most recent posts.
 * Version:     0.1.0
 * Author:      Crystal Tate
 * Author URI:  https://github.com/crystal
 * Text Domain: edit-plugin
 */

class Edit_Plugin {
	public static $menu_slug = 'edit-plugin';

	public static function add_hooks() {
		add_action( 'init',                  array( __CLASS__, 'init' ) );
		add_action( 'admin_menu',            array( __CLASS__, 'admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_enqueue_scripts' ) );
	}

	public static function init() {
		wp_register_script( 'edit-plugin', plugins_url( 'build/app.js', __FILE__ ), array(), time(), true );
		wp_register_style( 'edit-plugin-css', plugins_url( 'build/app.css', __FILE__ ), array(), time() );
	}

	public static function admin_menu() {
		add_menu_page( __( 'Edit Plugin', 'react-in-wp-admin' ), __( 'Edit Plugin', 'react-in-wp-admin' ), 'manage_options', self::$menu_slug, array( __CLASS__, 'admin_page' ) );
	}

	public static function admin_enqueue_scripts( $hook_suffix ) {
		if ( 'toplevel_page_' . self::$menu_slug != $hook_suffix ) {
			return;
		}

		wp_enqueue_script( 'wp-api' );
		wp_enqueue_script( 'edit-plugin' );
		wp_enqueue_style( 'edit-plugin-css' );
	}

	public static function admin_page() {
		?>
		<div id="app"></div>
		<?php
	}

}

Edit_Plugin::add_hooks();
