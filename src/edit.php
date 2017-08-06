<?php

/*
 * Plugin Name: Edit
 * Description: Edit the 5 most recent posts.
 * Version:     0.1.0
 * Author:      Crystal Tate
 * Author URI:  https://github.com/crystal
 * Text Domain: edit
 */

class Edit {
	public static $menu_slug = 'edit';

	public static function add_hooks() {
		add_action( 'init',                  array( __CLASS__, 'init' ) );
		add_action( 'admin_menu',            array( __CLASS__, 'admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_enqueue_scripts' ) );
	}

	public static function init() {
		wp_register_script( 'edit', plugins_url( 'build/admin.js', __FILE__ ), array(), time(), true );
		wp_register_style( 'edit-css', plugins_url( 'css/components.css', __FILE__ ), array(), time() );
	}

	public static function admin_menu() {
		add_menu_page( __( 'Edit', 'react-in-wp-admin' ), __( 'Edit', 'react-in-wp-admin' ), 'manage_options', self::$menu_slug, array( __CLASS__, 'admin_page' ) );
	}

	public static function admin_enqueue_scripts( $hook_suffix ) {
		if ( 'toplevel_page_' . self::$menu_slug != $hook_suffix ) {
			return;
		}

		wp_enqueue_script( 'edit' );
		wp_enqueue_style( 'edit-css' );
	}

	public static function admin_page() {
		?>
		<div id="edit-container"></div>
		<?php
	}

}

Edit::add_hooks();
