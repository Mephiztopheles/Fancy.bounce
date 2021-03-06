(function( window, $, Fancy ) {

    Fancy.require( {
        jQuery: false,
        Fancy : "1.0.8"
    } );
    var NAME    = "FancyBounce",
        VERSION = "1.0.3";

    function FancyBounce( element, settings ) {
        var SELF     = this;
        SELF.element = element;
        SELF.version = VERSION;
        SELF.name    = NAME;

        SELF.settings = $.extend( {}, Fancy.settings [ NAME ], settings );

        SELF.animate = function( me, callback, step, margin ) {
            if( step % 2 == 0 ) {
                // even
                me.animate( {
                    marginLeft : margin.left + SELF.settings.margin,
                    marginRight: margin.right - SELF.settings.margin
                }, SELF.settings.speed / ( SELF.settings.times + 1 ) - 10, function() {
                    if( step + 1 < SELF.settings.times )
                        callback( me, callback, step + 1, margin );
                    else
                        me.animate( {
                            marginRight: margin.right || '',
                            marginLeft : margin.left || ''
                        }, SELF.settings.speed / ( SELF.settings.times + 1 ) - 10, function() {
                            SELF.settings.onEnd( me );
                        } );
                } );
            } else {
                // odd
                me.animate( {
                    marginRight: margin.right + SELF.settings.margin,
                    marginLeft : margin.left - SELF.settings.margin
                }, SELF.settings.speed / ( SELF.settings.times + 1 ) - 10, function() {
                    if( step + 1 < SELF.settings.times )
                        callback( me, callback, step + 1, margin );
                    else
                        me.animate( {
                            marginRight: margin.right || '',
                            marginLeft : margin.left || ''
                        }, SELF.settings.speed / ( SELF.settings.times + 1 ) - 10, function() {
                            SELF.settings.onEnd( me );
                        } );
                } );
            }
        };

        SELF.element.each( function() {
            var me     = $( this ),
                i      = 0,
                margin = {
                    top   : parseInt( me.css( 'marginTop' ) ),
                    right : parseInt( me.css( 'marginRight' ) ),
                    bottom: parseInt( me.css( 'marginBottom' ) ),
                    left  : parseInt( me.css( 'marginLeft' ) )
                };

            SELF.animate( me, SELF.animate, i, margin );

        } );

        return SELF;
    }


    FancyBounce.api = FancyBounce.prototype = {};
    FancyBounce.api.version = VERSION;
    FancyBounce.api.name    = NAME;

    Fancy.settings [ NAME ] = {
        margin: 5,
        speed : 100,
        times : 4,
        onEnd : function() {}
    };

    Fancy.bounce     = VERSION;
    Fancy.api.bounce = function( settings ) {
        return new FancyBounce( this.element, settings );
    };
})( window, jQuery, Fancy );
