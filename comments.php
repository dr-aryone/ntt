<?php
// comments_template()

if ( post_password_required() ) {
	return;
}

$comment_text = __( 'Comment', 'ntt' );
$log_in_text = __( 'Log In', 'ntt' );
$log_out_text = __( 'Log Out', 'ntt' );

// title_reply
$title_reply_mu = '<div class="compose-comment-glabel obj">';
    $title_reply_mu .= '<span class="l">';
        $title_reply_mu .= '<span class="compose---text">'. esc_html_x( 'Compose', 'Compose Comment', 'ntt' ). '</span>';
        $title_reply_mu .= ' '. '<span class="comment---text">'. esc_html_x( 'Comment', 'Compose Comment', 'ntt' ). '</span>';
    $title_reply_mu .= '</span>';
$title_reply_mu .= '</div>';

// title_reply_to
$title_reply_to_mu = '<div class="comment-reply-glabel obj">'. esc_html__( 'Reply to', 'ntt' ). ' '. '%s'. '</div>';

// logged_in_as
$logged_in_as_mu = '<div class="admin-account-log-status cp" data-name="Admin Account Log Status">';
    $logged_in_as_mu .= '<div class="admin-account-log-status---cr">';
        $logged_in_as_mu .= '<div class="logged-in-admin-account cp" data-name="Logged In Admin Account">';
            $logged_in_as_mu .= '<div class="logged-in-admin-account---cr">';
                $logged_in_as_mu .= '<span class="logged-in-admin-account-glabel obj">';
                    $logged_in_as_mu .= '<span class="txt">'. esc_html_x( 'Logged in as', 'Logged in as [Name]', 'ntt' ). '</span>';
                $logged_in_as_mu .= '</span>';
                $logged_in_as_mu .= ' '. '<span class="logged-in-admin-account-name obj">';
                    $logged_in_as_mu .= '<a href="'. admin_url( 'profile.php' ).'" title="'. $user_identity.'">';
                        $logged_in_as_mu .= '<span class="txt">'. $user_identity.'</span>';
                    $logged_in_as_mu .= '</a>';
                $logged_in_as_mu .= '</span>';
            $logged_in_as_mu .= '</div>';
        $logged_in_as_mu .= '</div>';
        $logged_in_as_mu .= '<div class="log-out-admin-account-axn axn obj" data-name="Log Out Admin Account Action">';
            $logged_in_as_mu .= '<a href="'. esc_url( wp_logout_url( get_permalink() ) ).'" title="'. esc_attr( $log_out_text ).'">';
                $logged_in_as_mu .= '<span class="txt">'. esc_html( $log_out_text ). '</span>';
            $logged_in_as_mu .= '</a>';
        $logged_in_as_mu .= '</div>';
    $logged_in_as_mu .= '</div>';
$logged_in_as_mu .= '</div>';

// must_log_in
$must_log_in_mu = '<div class="log-in-required-note note cp" data-name="Log In Required Note">';
    $must_log_in_mu .= '<div class="log-in-required-note--cr note---cr">';
        $must_log_in_mu .= '<p><a href="'. esc_url( wp_login_url( get_permalink() ) ). '" title="'. esc_attr( $log_in_text ).'">'. esc_html( $log_in_text ). '</a> '. ' '. '<span class="to-comment---text">'. esc_html_x( 'to comment.', 'Log In to comment.', 'ntt' ). '</span>'. '</p>';
    $must_log_in_mu .= '</div>';
$must_log_in_mu .= '</div>';

// Comment Author Message Field | comment_field
$comment_field_mu = '<div class="comment-author-message-field field cp" data-name="Comment Author Message Field">';
    $comment_field_mu .= '<div class="comment-author-message-field---cr field---cr">';
    $comment_field_mu .= '<label for="comment" class="comment-author-message-field-label field-label obj">';
        $comment_field_mu .= '<span class="l">';
            $comment_field_mu .= '<span class="field-label---txt">'. esc_html( $comment_text ). '</span>';
        $comment_field_mu .= '</span>';
    $comment_field_mu .= '</label>';
        $comment_field_mu .= '<div class="comment-author-message-field-textbox form-element obj">';
            $comment_field_mu .= '<textarea name="comment" placeholder="'. esc_attr( $comment_text ).'" title="'. esc_attr( $comment_text ).'" maxlength="65525" required id="comment" class="text-input"></textarea>';
        $comment_field_mu .= '</div>';
    $comment_field_mu .= '</div>';
$comment_field_mu .= '</div>';

// cancel_reply_before
$cancel_reply_axn_start_mu = '<span class="cancel-reply-axn axn obj" data-name="Cancel Reply Action">';

// cancel_reply_after
$cancel_reply_axn_end_mu = '</span>';

// cancel_reply_link
$cancel_reply_text = __( 'Cancel Reply', 'ntt' );

$cancel_reply_link_mu = '<span title="'. esc_attr( $cancel_reply_text ). '" class="l">';
    $cancel_reply_link_mu .= '<span class="cancel---text">'. esc_html_x( 'Cancel', 'Cancel Reply', 'ntt' ). '</span>';
    $cancel_reply_link_mu .= ' '. '<span class="reply---text">'. esc_html_x( 'Reply', 'Cancel Reply', 'ntt' ). '</span>';
$cancel_reply_link_mu .= '</span>';
?>

<section class="comment-md cm md" data-name="Comment Module">
    <div class="comment-md---cr">
        <div id="comments" class="comments cp" data-name="Comments">
            <div class="comments---cr">
                <div class="comments-header header cn" data-name="Comments Header">
                    <div class="comments-header---cr">
                        <h2 class="comments-name obj">
                            <span class="txt"><?php esc_html_e( 'Comments', 'ntt' ); ?></span>
                        </h2>
                        <?php ntt_comments_actions_snippet(); ?>
                    </div>
                </div>
                <div class="comments-main main cn" data-name="Comments Main">
                    <div class="comments-main---cr">
                
                        <?php
                        if ( have_comments() ) {
                            ?>
                            <div class="comments-group cp">
                                <ul class="comments-group---cr">
                                    
                                    <?php
                                    wp_list_comments( array(
                                        'style'         => 'ul',
                                        'avatar_size'   => 48,
                                        'callback'      => 'ntt_comment',
                                        'echo'          => true,
                                    ) );
                                    ?>
                                </ul>
                            </div>
                            <?php
                        } else {

                            if ( comments_open() ) {
                                $comments_content_esc = esc_html__( 'Be the first to comment.', 'ntt' );
                            } else {
                                $comments_content_esc = esc_html__( 'There are no comments.', 'ntt' );
                            }
                            ?>
                            <div class="empty-comments-note note cp" data-name="Empty Comments Note">
                                <div class="empty-comments-note---cr note---cr">
                                    <p><?php echo $comments_content_esc ?></p>
                                </div>
                            </div>
                            <?php
                        }
                        ?>
                    </div>
                </div>

                <?php
                if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) {
                    ?>
                    <div class="comments-footer footer cn" data-name="Comments Footer">
                        <div class="comments-footer---cr">
                            <?php ntt_comments_nav(); ?>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>
        </div>
        
        <?php
        // comment-form.php
        comment_form( array(
            'id_form'                   => 'commentform',
            'class_form'                => 'comment-form cp',
        
            'title_reply_before'        => '',
            'title_reply_after'         => '',
        
            // Comment Creation Name and Compose Comment Generic Label
            'title_reply'               => $title_reply_mu,
            
            // Reply to <Comment Author Name> | Appears only if JS is not supported or if comment-reply.js is not loaded; it replaces title_reply
            'title_reply_to'            =>  $title_reply_to_mu,
        
            // Cancel Reply Action
            'cancel_reply_before'       => $cancel_reply_axn_start_mu,
            'cancel_reply_after'        => $cancel_reply_axn_end_mu,
            'cancel_reply_link'         => $cancel_reply_link_mu,
        
            // Signed in as <Admin Account Name>
            'logged_in_as'              => $logged_in_as_mu, 
        
            // Settings > Discussion > [Check] Users must be registered and logged in to comment
            'must_log_in'               => $must_log_in_mu,
        
            // Comment Textarea
            'comment_field'             => $comment_field_mu,
        
            // Submit Comment Action
            'id_submit'                 => 'submit-comment-axn',
            'class_submit'              => 'submit-comment-axn',
            'label_submit'              => esc_attr_x( 'Submit', 'Submit Comment', 'ntt' ),
        
            // Notes
            'comment_notes_before'      => '',
            'comment_notes_after'       => '',
        ) );
        ?>
    </div>
</section>