( function() {

    var config = {
        "baseUrl": "/js",
        "paths": {
            "jquery": "libs/jquery",
            "jqueryPrivate": "components/jqueryPrivate"
        },
        "map": {
            // '*' means all modules will get 'jquery-private'
            // for their 'jquery' dependency.
            '*': {
                'jquery': 'jqueryPrivate'
            },

            // 'jquery-private' wants the real jQuery module
            // though. If this line was not here, there would
            // be an unresolvable cyclic dependency.
            'jqueryPrivate': {
                'jquery': 'jquery'
            }
        },
        "shim": {
        }
    };

    this.config = config;

}.call( this ) );