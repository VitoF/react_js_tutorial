define( ['jquery'], function( $ ) {

    'use strict';
    
    return ( function() {

        var APP = ( function() {

            var app = {};

            app.initModule = function( element, module, params ) {
                if ( element.length ) {
                    require( [ "modules/" + module ], function( Module ) {
                        return Module.Initialize( element, params );
                    } );
                }
            };

            app.Initialize = function() {
                $( document )
                    .ready( function() {
//                        app.initModule( $( '[data-carousel="module"]' ), 'promocarousel' );
                       
                    } );
            };

            return app;

        }() ); //-- APP

        return APP;

    }() );

} );