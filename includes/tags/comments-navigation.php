<?php
if ( ! function_exists( 'ntt_comments_nav' ) ) {
    function ntt_comments_nav() {
        
        if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) {
            ?>
            <div class="comments-nav nav cp" data-name="Comments Navigation">
                <div class="comments-nav---cr nav---cr">
                    <div class="comments-nav-name nav-name obj">
                        <span class="txt"><?php esc_html_e( 'Comments Navigation', 'ntt' ); ?></span>
                    </div>
            
                    <?php
                    $next_text = _x( 'Next', 'Next Comments', 'ntt' );
                    $previous_text = _x( 'Previous', 'Previous Comments', 'ntt' );
                    $comments_text = _x( 'Comments', '[Next / Previous] Comments', 'ntt' );

                    $l_mu = '<span title="'. esc_attr( '%3$s' ). '" class="l">';
                        $l_mu .= '<span class="'. esc_attr( '%2$s' ). '">'. esc_html( '%1$s' ). '</span>';
                        $l_mu .= ' '. '<span class="comments---text">'. esc_html( $comments_text ) .'</span>';
                    $l_mu .= '</span>';

                    // Next Navigation Item
                    $next_navi = sprintf( $l_mu,
                        $next_text,
                        'next---text',
                        $next_text. ' '. $comments_text
                    );

                    // Previous Navigation Item
                    $previous_navi = sprintf( $l_mu,
                        $previous_text,
                        'previous---text',
                        $previous_text. ' '. $comments_text
                    );

                    if ( get_next_comments_link() ) {
                        ?>
                        <div class="next-comments-navi comments-navi navi obj">
                            <?php next_comments_link( $next_navi ); ?>
                        </div>
                        <?php
                    }
                
                    if ( get_previous_comments_link() ) {
                        ?>
                        <div class="previous-comments-navi comments-navi navi obj">
                            <?php previous_comments_link( $previous_navi ); ?>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </div>
            <?php
        }
    }
}