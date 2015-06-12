define( ['config'], function(config) {

    'use strict';

    require.config( config );

    require( [ 'app/app' ], function( app ) {
        'use strict';
        
        app.Initialize();
    } );

} );