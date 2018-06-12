<?php

function ntt_features_scripts() {
    
    $down_arrowhead_icon = ntt_get_svg( array( 'icon' => 'down-arrowhead-icon', ) );
    $up_arrowhead_icon = ntt_get_svg( array( 'icon' => 'up-arrowhead-icon', ) );
    $up_arrow_icon = ntt_get_svg( array( 'icon' => 'up-arrow-icon', ) );
    $search_icon = ntt_get_svg( array( 'icon' => 'search-icon', ) );
    $dismiss_icon = ntt_get_svg( array( 'icon' => 'dismiss-icon', ) );
    $ellipsis_icon = ntt_get_svg( array( 'icon' => 'ellipsis-icon', ) );

    $ntt_l10n['showSubNavText']     = __( 'Show Sub-Nav', 'ntt' );
    $ntt_l10n['hideSubNavText']     = __( 'Hide Sub-Nav', 'ntt' );
    
    $ntt_l10n['toggleSearchText']   = __( 'Toggle Search', 'ntt' );
    $ntt_l10n['showSearchText']     = __( 'Show Search', 'ntt' );
    $ntt_l10n['hideSearchText']     = __( 'Hide Search', 'ntt' );
    
    $ntt_l10n['toggleActionsText']  = __( 'Toggle Actions', 'ntt' );
    $ntt_l10n['showActionsText']     = __( 'Show Actions', 'ntt' );
    $ntt_l10n['hideActionsText']     = __( 'Hide Actions', 'ntt' );
    
    $ntt_l10n['downArrowheadIcon']  = $down_arrowhead_icon;
    $ntt_l10n['upArrowheadIcon']    = $up_arrowhead_icon;
    $ntt_l10n['upArrowIcon']        = $up_arrow_icon;
    $ntt_l10n['searchIcon']         = $search_icon;
    $ntt_l10n['dismissIcon']        = $dismiss_icon;
    $ntt_l10n['ellipsisIcon']        = $ellipsis_icon;
    
    wp_localize_script( 'ntt-script', 'nttData', $ntt_l10n );
}
add_action('wp_enqueue_scripts', 'ntt_features_scripts', 0);

function ntt_features_html_css() {
    
    if ( is_active_sidebar( 'main-header-aside' ) ) {
        echo ' '. 'ntt-primary-menu-f5e';
    } 

    if ( is_active_sidebar( 'entity-primary-axns' ) ) {
        echo ' '. 'ntt-primary-axns-overflow-f5e';
    }

    if ( has_custom_logo() ) {
        echo ' '. 'ntt-custom-logo-f5e';
    }

    $r = array(
        'go-content-nav',
        'go-start-nav',
        'overflow-axns',
        'primary-search',
        'sub-nav',
    );

    foreach ( $r as $css ) {
        echo ' '. 'ntt-'. esc_attr( $css ). '-f5e';
    }
}
add_action( 'ntt_html_css_wp_hook', 'ntt_features_html_css');