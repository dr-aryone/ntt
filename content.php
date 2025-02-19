<article id="entry-<?php the_id(); ?>" <?php post_class( ntt_get_comments_css() ); ?> data-name="Entry">
    <div class="entry---cr">

        <?php ntt_entry_header(); ?>
        <div class="entry-main main cn" data-name="Entry Main">
            <div class="entry-main---cr">
                <div class="entry-content content-trunk cp" data-name="Entry Content">
                    <div class="entry-content---cr">
            
                        <?php
                        if ( is_singular() || is_home() || is_archive() ) {
                            if ( has_excerpt() ) {
                                ntt_entry_summary_content();
                            }
                            ntt_entry_full_content();
                        } elseif ( is_search() ) {
                            ntt_entry_summary_content();
                        } else {
                            ntt_entry_full_content();
                        }
                        ?>
                    </div>
                </div>
                <?php ntt_after_entry_content_wp_hook(); ?>
            </div>
        </div>
        
        <?php ntt_entry_footer(); ?>
    </div>
</article>