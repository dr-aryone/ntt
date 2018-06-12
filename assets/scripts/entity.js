var $document,
    $window,
    $html,
    $body,
    documentHeight,
    windowHeight,
    $goStartNav;

( function( $ ) {

    $document = $( document );
    $window = $( window );
    $html = $( document.documentElement );
    $body = $( document.body );
    documentHeight = document.body.offsetHeight;
    windowHeight = window.innerHeight;
    $goStartNav = $( '#go-start-nav' );

    /**
     * Scrolled
     * https://stackoverflow.com/a/7392655
     */
    var scrolledCounter = 0;
    
    $.fn.scrolled = function ( waitTime, fn ) {
        if ( typeof waitTime === "function" ) {
            fn = waitTime;
            waitTime = 640;
        }
        var tag = "scrollTimer" + scrolledCounter++;
        this.scroll( function () {
            var self = $( this );
            var timer = self.data( tag );
            if ( timer ) {
                clearTimeout( timer );
            }
            timer = setTimeout(function () {
                self.removeData( tag );
                fn.call( self[0] );
            }, waitTime);
            self.data( tag, timer );
        } );
    }

    /**
     * HTML_OK
     */
    htmlOkFn = {
        
        // Button OBJ
        buttonObj: function( css, customCss, dataName, textLabel, textCss, icon ) {

            $text = $( '<span />', {
                'class': textCss + '---txt' + ' ' + 'txt',
                'text': textLabel
            } );

            $label = $( '<span />', {
                'class': css + '---l' + ' ' + 'l'
            } ).append( $text ).clone().append( icon );

            $elem = $( '<button />', {
                'class': css + '---a a b',
                'title': textLabel
            } ).append( $label );

            $obj = $( '<div />', {
                'class': css + ' ' + customCss + ' ' + 'obj',
                'data-name': dataName
            } ).append( $elem );

            return $obj;
        },

        group: function( css, customCss, dataName ) {

            $cr = $( '<div />', {
                'class': css + '---cr',
            } );

            $group = $( '<div />', {
                'class': css + ' ' + customCss + ' ' + 'group',
                'data-name': dataName
            } ).append( $cr );

            return $group;
        },

        cp: function( css, customCss, dataName ) {
            
            $cr = $( '<div />', {
                'class': css + '---cr',
            } );

            $cp = $( '<div />', {
                'class': css + ' ' + customCss + ' ' + 'cp',
                'data-name': dataName
            } ).append( $cr );

            return $cp;
        }
    };

    /**
     * Wrap Text Nodes
     * https://stackoverflow.com/a/18727318
     */
    function wrapTextNode( $elem ) {
        var $textNodeMU = $( '<span />', { 'class': 'txt' } );
        $elem.contents().filter( function() {
            return this.nodeType === 3;
        } ).wrap( $textNodeMU );
    }

    /**
     * Remove Empty Elements
     * https://stackoverflow.com/a/18727318
     */
    function removeEmpty( $elem ) {
        $elem.each( function() {
            var $this = $( this );
            if ( $this.html().replace(/\s|&nbsp;/g, '' ).length == 0 ) {
                $this.remove();
            }
        } );
    }

    /**
     * Sub-Nav Feature
     */
    function subNav( $cp ) {

        if ( $html.hasClass( 'ntt-sub-nav-f5e' ) ) {
            $cp.addClass( 'sub-nav-f5e' );
        } else {
            return;
        }
        
        var $entityNav = $( '#entity-primary-nav' ),
            $navi = $( '.page_item, .menu-item' ),
            $children = $( '.page_item_has_children > .children, .menu-item-has-children > .sub-menu' ),
            $parents = $( '.page_item_has_children, .menu-item-has-children' ),
            showText = nttData.showSubNavText,
            hideText = nttData.hideSubNavText,
            icon = $( nttData.downArrowheadIcon ),
            $parent,
            $subNavButton,
            $subNavFeature = $( '.sub-nav-f5e' );
        
        $cp.find( $children ).before(
            htmlOkFn.buttonObj(
                'sub-nav-toggle-axn',
                'toggle-axn axn',
                'Sub-Navigation Toggle Action',
                hideText,
                'toggle-sub-nav',
                icon
            )
        );

        $subNavButton = $cp.find( '.sub-nav-toggle-axn---a' );

        // Functions
        subNavFn = {

            // Activate
            on: function() {
                var $this = $( this );
                
                $this.closest( $parents )
                    .addClass( 'active-sub-nav' )
                    .removeClass( 'inactive-sub-nav' );

                $this.attr( {
                    'aria-expanded': 'true',
                    'title': hideText
                } );

                $this.find( '.toggle-sub-nav---txt' ).text( hideText );

                $subNavFeature
                    .addClass( 'off-f5e' )
                    .removeClass( 'on-f5e' );
                
                $this.closest( $subNavFeature )
                    .addClass( 'on-f5e' )
                    .removeClass( 'off-f5e' );

                $html
                    .addClass( 'sub-nav--on' )
                    .removeClass( 'sub-nav--off' );
            },
            
            // Deactivate in <html>
            htmlOff: function() {
                
                if ( ! $parents.hasClass( 'active-sub-nav' ) ) {
                    $html
                        .addClass( 'sub-nav--off' )
                        .removeClass( 'sub-nav--on' );
                }
            },

            // Deactivate
            off: function() {
                var $this = $( this );
                
                $this.closest( $parents )
                    .addClass( 'inactive-sub-nav' )
                    .removeClass( 'active-sub-nav' );

                $this.attr( {
                    'aria-expanded': 'false',
                    'title': showText
                } );

                $this.find( '.toggle-sub-nav---txt' ).text( showText );

                $subNavFeature
                    .addClass( 'on-f5e' )
                    .removeClass( 'off-f5e' );
                
                $this.closest( $subNavFeature )
                    .addClass( 'off-f5e' )
                    .removeClass( 'on-f5e' );

                subNavFn.htmlOff();
            },

            // Deactivate All
            allOff: function() {

                $parents
                    .addClass( 'inactive-sub-nav' )
                    .removeClass( 'active-sub-nav' );

                $navi
                    .removeClass( 'active-other-sub-nav' );

                $subNavButton.attr( {
                    'aria-expanded': 'false',
                    'title': showText
                } );

                $cp.find( '.toggle-sub-nav---txt' ).text( showText );

                $subNavFeature
                    .addClass( 'off-f5e' )
                    .removeClass( 'on-f5e' );

                subNavFn.htmlOff();
            },

            // Deactivate Siblings with Children
            siblingsOff: function() {
                var $this = $( this );

                $this.closest( $parents ).siblings( '.page_item_has_children, .menu-item-has-children' )
                    .addClass( 'inactive-sub-nav' )
                    .removeClass( 'active-sub-nav' );
            },

            // Activate Sub-Nav Item Siblings
            subNavSiblingsOn: function() {
                var $this = $( this );
                
                $this.closest( $parents ).nextAll()
                    .removeClass( 'active-other-sub-nav' );
            },
            
            // Deactivate Sub-Nav Item Siblings
            subNavSiblingsOff: function() {
                var $this = $( this );
                
                $this.closest( $parents ).nextAll()
                    .addClass( 'active-other-sub-nav' );
            }
        };

        // Run: Deactivate All
        subNavFn.allOff();

        // User Action: Button Click
        $subNavButton.on( 'click.ntt', function( e ) {
            e.preventDefault();
            
            var $this = $( this );
            $parent = $this.closest( $parents );

            if ( $parent.hasClass( 'inactive-sub-nav' ) ) {
                subNavFn.on.apply( this );
                
                if ( $cp.is( $entityNav ) ) {
                    subNavFn.subNavSiblingsOff.apply( this );
                }
            
            } else if ( $parent.hasClass( 'active-sub-nav' ) ) {
                subNavFn.off.apply( this );
                
                if ( $cp.is( $entityNav ) ) {
                    subNavFn.subNavSiblingsOn.apply( this );
                }
            }

            if ( $cp.is( $entityNav ) ) {
                subNavFn.siblingsOff.apply( this );
            }
        } );

        // User Action: Document Click
        $document.on( 'touchmove.ntt click.ntt', function ( e ) {
            if ( $html.hasClass( 'sub-nav--on' ) && ! $( e.target ).closest( $parents ).length ) {
                subNavFn.allOff();
            }
        } );
        
        // User Action: ESC Key
        $document.on( 'keyup.ntt', function ( e ) {
            if ( $html.hasClass( 'window--loaded' ) && $html.hasClass( 'sub-nav--on' ) && e.keyCode == 27 ) {
                subNavFn.allOff();
            }
        } );
    }

    subNav( $( '#entity-primary-nav' ) );
    
    subNav( $( '.widget_nav_menu' ) );
    
    subNav( $( '.widget_pages' ) );

    /**
     * Primary Search Feature
     */
    ( function() {

        $( '#entity-primary-axns' ).find( '.widget_search:first' )
            .attr( 'id', 'primary-search' )
            .attr( 'data-name', 'Primary Search' );
        
        var $primarySearch = $( '#primary-search' ),
            $search = $primarySearch.find( '.search' ),
            toggleText = nttData.toggleSearchText,
            showText = nttData.showSearchText,
            hideText = nttData.hideSearchText,
            searchIcon = $( nttData.searchIcon ),
            dismissIcon = $( nttData.dismissIcon ),
            toggleSearchIcon = $( nttData.searchIcon ),
            toggleDismissIcon = $( nttData.dismissIcon ),
            $toggle, $toggleText,
            $submitLabel = $primarySearch.find( '.submit-search-axn---l' ),
            $reset = $primarySearch.find( '.reset-search-axn---a' ),
            $resetLabel = $primarySearch.find( '.reset-search-axn---l' ),
            $input = $primarySearch.find( '.search-input' );

        if ( $primarySearch.length && $html.hasClass( 'ntt-primary-search-f5e' ) ) {
            $primarySearch.addClass( 'primary-search-f5e primary-action' )
        } else {
            return;
        }

        // Create Toggle Button
        $search.before(
            htmlOkFn.buttonObj(
                'primary-search-toggle-axn',
                'toggle-axn axn',
                'Primary Search Toggle Action',
                toggleText,
                'toggle-search',
                toggleSearchIcon
            )
        );

        // Icons in Buttons
        $submitLabel.append( searchIcon );
        $resetLabel.append( dismissIcon );

        $toggle = $primarySearch.find( '.primary-search-toggle-axn---a' );
        $toggleText = $primarySearch.find( '.toggle-search---txt' );

        // Functions
        primarySearchFn = {

            // Activate
            on: function() {
                
                $toggle.attr( {
                    'aria-expanded': 'true',
                    'title': hideText
                } );

                $toggleText
                    .text( hideText )
                    .after( toggleDismissIcon );

                toggleSearchIcon.remove();
                
                $primarySearch
                    .addClass( 'active-search on' )
                    .removeClass( 'inactive-search off' );

                $html
                    .addClass( 'ntt-primary-search-f5e--on' )
                    .removeClass( 'ntt-primary-search-f5e--off' );

                $input.focus().select();
            },

            // Deactivate
            off: function() {
                
                $toggle.attr( {
                    'aria-expanded': 'false',
                    'title': showText
                } );

                $toggleText
                    .text( showText )
                    .after( toggleSearchIcon );

                toggleDismissIcon.remove();
                
                $primarySearch
                    .addClass( 'inactive-search off' )
                    .removeClass( 'active-search on' );

                $html
                    .addClass( 'ntt-primary-search-f5e--off' )
                    .removeClass( 'ntt-primary-search-f5e--on' );
            },

            // Toggle
            toggle: function() {
                if ( $primarySearch.hasClass( 'off' ) ) {
                    primarySearchFn.on();
                } else if ( $primarySearch.hasClass( 'on' ) ) {
                    primarySearchFn.off();
                }
            },

            // Input Status
            inputPopulation: function() {

                if ( $input.val() == '' ) {
                    $primarySearch
                        .addClass( 'empty-search' )
                        .removeClass( 'populated-search' );
                } else if ( ! $input.val() == '' ) {
                    $primarySearch
                        .addClass( 'populated-search' )
                        .removeClass( 'empty-search' );
                }
            }
        };

        primarySearchFn.off();
        primarySearchFn.inputPopulation();

        // User Action: Toggle Button Click
        $toggle.on( 'click.ntt', function( e ) {
            e.preventDefault();
            
            primarySearchFn.toggle();
        } );

        // User Action: Reset Button Click
        $reset.on( 'click.ntt', function( e ) {
            e.preventDefault();
            
            $input.val( '' ).focus();
            primarySearchFn.inputPopulation();
        } );

        // User Action: Content Input
        $input.on( 'keypress.ntt input.ntt', function() {
            primarySearchFn.inputPopulation();
        } );

        // User Action: Document Click
        $document.on( 'touchmove.ntt click.ntt', function ( e ) {
            if ( $primarySearch.hasClass( 'on' ) && ! $( e.target ).closest( $toggle ).length && ! $( e.target ).closest( $search ).length ) {
                primarySearchFn.off();
            }
        } );
        
        // User Action: ESC Key
        $document.on( 'keyup.ntt', function ( e ) {
            if ( $html.hasClass( 'window--loaded' ) && $primarySearch.hasClass( 'on' ) && e.keyCode == 27 ) {
                primarySearchFn.off();
            }
        } );
    } ) ();

    /**
     * Overflow Actions
     */
    function overflowActions( $elem ) {

        var $widgets = $elem.find( '.widget:not(.primary-action)' );

        if ( $widgets.length && $html.hasClass( 'ntt-primary-axns-overflow-f5e' ) ) {
            $elem.addClass( 'overflow-axns-f5e' );
        } else {
            return;
        }

        var $cr = $elem.children(),
            $overflowActions,
            $overflowActionsGroup,
            toggleText = nttData.toggleActionsText,
            showText = nttData.showActionsText,
            hideText = nttData.hideActionsText,
            moreIcon = $( nttData.ellipsisIcon ),
            $toggle, $toggleText,
            $elem,
            nttF5eOn = 'ntt-overflow-axns-f5e--on',
            nttF5eOff = 'ntt-overflow-axns-f5e--off',
            f5eOn = 'overflow-axns-f5e--on',
            f5eOff = 'overflow-axns-f5e--off',
            on = 'active-overflow-axns',
            off = 'inactive-overflow-axns-f5e';

        $widgets.wrapAll(
            htmlOkFn.cp(
                'overflow-axns',
                'axns',
                'Overflow Actions'
            )
        );

        $widgets.wrapAll(
            htmlOkFn.group(
                'overflow-axns-group',
                'axns-group',
                'Overflow Actions Group'
            )
        );

        $overflowActions = $elem.find( '.overflow-axns' );
        $overflowActionsGroup = $overflowActions.find( '.overflow-axns-group' );

        $cr.append( $overflowActions );

        // Create Toggle Button
        $overflowActionsGroup.before(
            htmlOkFn.buttonObj(
                'overflow-axns-toggle-axn',
                'toggle-axn axn',
                'Overflow Actions Toggle Action',
                toggleText,
                'toggle-actions',
                moreIcon
            )
        );

        $toggle = $overflowActions.find( '.overflow-axns-toggle-axn---a' );
        $toggleText = $( '.toggle-actions---txt' );

        // Functions
        overflowActionsFn = {

            // Activate
            on: function() {
                var $this = $( this );

                $this.attr( {
                    'aria-expanded': 'true',
                    'title': hideText
                } );

                $this.find( $toggleText ).text( hideText );
                
                $this.closest( $elem )
                    .addClass( on + ' ' + f5eOn )
                    .removeClass( off + ' ' + f5eOff );

                $html
                    .addClass( nttF5eOn )
                    .removeClass( nttF5eOff );
            },

            // Deactivate
            off: function() {
                var $this = $( this );

                $this.attr( {
                    'aria-expanded': 'false',
                    'title': showText
                } );

                $this.find( $toggleText ).text( showText );
                
                $elem
                    .addClass( off + ' ' + f5eOff )
                    .removeClass( on + ' ' + f5eOn );

                $html
                    .addClass( nttF5eOff )
                    .removeClass( nttF5eOn );
            },

            // Deactivate All
            allOff: function() {

                $toggle.attr( {
                    'aria-expanded': 'false',
                    'title': showText
                } );

                $overflowActions.find( $toggleText ).text( showText );

                $elem
                    .addClass( off + ' ' + f5eOff )
                    .removeClass( on + ' ' + f5eOn );

                $html
                    .addClass( nttF5eOff )
                    .removeClass( nttF5eOn );
            },
        };

        // Run: Deactivate
        overflowActionsFn.allOff();

        // User Action: Button Click
        $toggle.on( 'click.ntt', function( e ) {
            e.preventDefault();
            
            var $this = $( this );
            $elem = $this.closest( $elem );

            if ( $elem.hasClass( off ) ) {
                overflowActionsFn.on.apply( this );
            
            } else if ( $elem.hasClass( on ) ) {
                overflowActionsFn.off.apply( this );
            }
        } );

        // User Action: Document Click
        $document.on( 'touchmove.ntt click.ntt', function ( e ) {
            if ( $html.hasClass( nttF5eOn ) && ! $( e.target ).closest( $overflowActions ).length ) {
                overflowActionsFn.off();
            }
        } );
        
        // User Action: ESC Key
        $document.on( 'keyup.ntt', function ( e ) {
            if ( $html.hasClass( 'window--loaded' ) && $html.hasClass( nttF5eOn ) && e.keyCode == 27 ) {
                overflowActionsFn.off();
            }
        } );
    }

    overflowActions( $( '#entity-primary-axns' ) );

    /**
     * Go to Content Nav Feature
     */
    ( function() {

        var $cp = $( '#go-content-nav' );
        
        if ( $html.hasClass( 'ntt-go-content-nav-f5e' ) ) {
            $cp.addClass( 'go-content-nav-f5e' );
        } else {
            return;
        }
        
        var $navi = $cp.find( '.go-content-navi---a' );
        
        // Functions
        goContentNavFn = {
            
            // Activate
            on: function() {
                $cp
                    .addClass( 'go-content-nav--on' )
                    .removeClass( 'go-content-nav--off' );
                    
                $html
                    .addClass( 'ntt-go-content-nav--on' )
                    .removeClass( 'ntt-go-content-nav--off' );
            },
            
            // Deactivate
            off: function() {
                $cp
                    .addClass( 'go-content-nav--off' )
                    .removeClass( 'go-content-nav--on' );

                $html
                    .addClass( 'ntt-go-content-nav--off' )
                    .removeClass( 'ntt-go-content-nav--on' );
            }
        };
        
        goContentNavFn.off();

        if ( $cp.hasClass( 'go-content-nav--on' ) ) {
            
        } else if ( $cp.hasClass( 'go-content-nav--off' ) ) {
            $html
                .addClass( 'ntt-go-content-nav--off' )
                .removeClass( 'ntt-go-content-nav--on' );
        }
        
        // User Actions
        $navi
            .on( 'focusin.ntt', function() {
                goContentNavFn.on();
            } )
            .on( 'focusout.ntt', function() {
                goContentNavFn.off();
            } )
            .on( 'click.ntt', function() {
                $navi.blur();
                goStartNavFn.off();
            } );

        // User Action: ESC Key
        $document.on( 'keyup.ntt', function ( e ) {
            if ( $html.hasClass( 'window--loaded' ) && $cp.hasClass( 'go-content-nav--on' ) && e.keyCode == 27 ) {
                goContentNavFn.off();
                $navi.blur();
            }
        } );
    } ) ();

    /**
     * Go to Start Nav Feature
     */
    ( function() {

        // Icon
        $goStartNav.find( '.go-start-navi---l' ).append( $( nttData.upArrowIcon ) );
    } ) ();

    ( function() {
        var $textWidget = $( '.textwidget' ),
            $htmlWidgetContent,
            $content = $( '.content---cr' ),
            $contentP = $content.find( '> p' ),
            $visuals,
            $visualsA,
            $contentImg = $content.find( 'img' ),
            $contentGallery = $content.find( '.gallery' ),
            $contentAll;

        // Calendar Widget
        $( '.widget_calendar td:has( a )' ).each( function() {
            $( this ).addClass( 'widget-calendar-date--active' );
        } );

        wrapTextNode( $( '.widget_calendar th, .widget_calendar td' ) );

        // Meta Widget
        wrapTextNode( $( '.widget_meta a' ) );

        // Recent Comments Widget
        wrapTextNode( $( '.widget_recent_comments li' ) );

        // Recent Comments Widget
        wrapTextNode( $( '.tag-cloud-link' ) );

        // Text, Custom HTML Widgets
        $textWidget
            .addClass( 'content' )
            .wrapInner( '<div class="content---cr"></div>' );

        $htmlWidgetContent = $( '.custom-html-widget .content---cr' );
        wrapTextNode( $htmlWidgetContent );
        removeEmpty( $htmlWidgetContent.find( '> .txt' ) );

        // Table
        wrapTextNode( $( 'td, th' ) );
        
        // Post Password
        wrapTextNode( $( '.post-password-form label' ) );

        // Content
        wrapTextNode( $content );
        wrapTextNode( $contentP );

        $contentAll = $content.children();
        removeEmpty( $contentAll );

        // Content Images
        
        // <a><img></a>
        $contentImg.each( function() {
            var $this = $( this );
            $this.parent( 'a' ).addClass( 'visuals---a' );
        } );

        // Identify <p> that contains only one <img>
        $contentP.each( function(){
            var $this = $( this ),
                $count = $this.contents().filter( function(){ return this.nodeType == Node.ELEMENT_NODE || ( this.nodeType == Node.ELEMENT_NODE && !!$.trim( this.nodeValue ) ) } ).length,
                $text = $this.children( '.txt' ).length,
                $image = $this.children( 'img' ).length,
                $anchor = $this.children( '.visuals---a' ).length;

            if ( $count == 1 && ( $image || $anchor ) ) {
                $this.addClass( 'solo-visuals' )
            }

            if ( $text >= 1 && ( $image >= 1 || $anchor >= 1 ) ) {
                $this.addClass( 'textual-visuals' )
            }
        } );

        $visuals = $( '.solo-visuals' );
        $visualsA = $( '.visuals---a' );

        // Duplicate <img> classes to parent <a> and <p>
        $contentImg.each( function() {
            var $this = $( this );
            $this.closest( $visuals ).addClass( $this.attr( 'class' ) );
            $this.closest( $visualsA ).addClass( $this.attr( 'class' ) );
        } );

        // Gallery
        $contentGallery.has( '.gallery-caption' ).addClass( 'captioned-gallery' )
            .closest( '.gallery-wrapper' ).addClass( 'captioned-gallery' );

        $( '.cm-singular .content---cr' ).children( 'p:has( [id*=more-]:only-child )' ).addClass( 'show-more-marker');
            
    }() );

    $document.ready( function() {
        
        $html
            .addClass( 'dom--ready' )
            .removeClass( 'dom--unready' );
    
    } );
    
    $window.load( function() {

        $html
            .addClass( 'window--loaded' )
            .removeClass( 'window--unloaded' );

    } );
} )( jQuery );