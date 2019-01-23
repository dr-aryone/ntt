<?php

// https://www.thewebtaylor.com/articles/wordpress-creating-breadcrumbs-without-a-plugin

if ( ! function_exists( 'ntt_breadcrumbs_nav' ) ) {
    function ntt_breadcrumbs_nav() {
        global $post;
        
        if ( is_page() && $post->post_parent && ! is_attachment() ) {
            
            $anc = get_post_ancestors( $post->ID );
            $anc = array_reverse( $anc );

            if ( ! isset( $breadcrumbs_ancestors_mu ) ) {
                $breadcrumbs_ancestors_mu = null;
            }

            foreach ( $anc as $ancestor ) {
                $navi_ancestors = '<div class="breadcrumb-navi--ancestor breadcrumb-navi obj item">';
                    $navi_ancestors .= '<a href="'. esc_url( get_permalink( $ancestor ) ). '" title="'. esc_attr( get_the_title( $ancestor ) ). '" class="breadcrumb-navi---a">';
                        $navi_ancestors .= '<span class="breadcrumb-navi---l">';
                           $navi_ancestors .= '<span class="breadcrumb-navi---txt">'. esc_html( get_the_title( $ancestor ) ). '</span>';
                        $navi_ancestors .= '</span>';
                    $navi_ancestors .= '</a>';
                $navi_ancestors .= '</div>';

                $breadcrumbs_ancestors_mu .= $navi_ancestors;
            }

            $navi_current_mu = '<div class="breadcrumb-navi--current breadcrumb-navi obj item">';
                $navi_current_mu .= '<span class="breadcrumb-navi--current---l breadcrumb-navi---l">';
                    $navi_current_mu .= '<span class="breadcrumb-navi---txt">'. esc_html( get_the_title() ). '</span>';
                $navi_current_mu .= '</span>';
            $navi_current_mu .= '</div>'; ?>

            <div class="cm-nav breadcrumbs-nav nav cp" data-name="Breadcrumbs Navigation">
                <div class="cm-nav---cr breadcrumbs-nav---cr">

                    <div class="breadcrumbs-nav-ename cm-nav-ename nav-ename ename obj" data-name="Breadcrumbs Navigation Element Name">
                        <span class="breadcrumbs-nav-ename---txt"><?php echo esc_html__( 'Breadcrumbs Navigation', 'ntt' ); ?></span>
                    </div>

                    <div class="breadcrumbs-nav-group nav-group group">
                        <?php echo $breadcrumbs_ancestors_mu. ' '. $navi_current_mu; ?>
                    </div>
                
                </div>
            </div>
            <?php    
        }
    }
}