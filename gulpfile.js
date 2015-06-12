var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] });
    minifycss = require('gulp-minify-css'),
    shell = require('gulp-shell'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    del = require('del'),
    swig = require('gulp-swig'),
    shell = require('gulp-shell'),
    imageop = require('gulp-image-optimization'),
    processhtml = require('gulp-processhtml'),
    react = require('gulp-react');

	
/*******************************************************************************
	SOURCES AND RESULT PATHS
*******************************************************************************/
var paths = {
    result: 'result/',
    
    //-----------------------------------------
    //---STYLES
    //-----------------------------------------
    less: 'src/less/**/*.less',
    
    css: 'result/css/',
    
    //-----------------------------------------
    //---HTML
    //-----------------------------------------
    htmlsrc: 'src/html/*.html',
    
    htmlRESULT: 'result/views/',
    
    //-----------------------------------------
    //---JS
    //-----------------------------------------
    jsSRC: 'src/js/**',
    jsRESULT: 'result/js/',
    
    jsxSRC: 'src/jsx/**',
    
    //-----------------------------------------
    //---Images
    //-----------------------------------------
    imgSRC: 'src/images/**',
    imgRESULT: 'result/images',
    
    //-----------------------------------------
    //---Fonts
    //-----------------------------------------
    fontsSRC: 'src/fonts/**',
    fontsRESULT: 'result/fonts',
    
    //-----------------------------------------
    //---JSON
    //-----------------------------------------
    jsonSRC: 'src/json/**',
    jsonRESULT: 'result/json'
}

/*******************************************************************************
	OPTIMIZE IMAGES TASK
*******************************************************************************/
gulp.task('opt_img', [], function() {
    gulp.start('imagesOpt');
});

/*******************************************************************************
	DEFAULT TASK
*******************************************************************************/
gulp.task('default', ['connect','clean'], function() {
    gulp.start('html');
    gulp.start('styles');
    gulp.start('jsx');
	gulp.start('scripts');
	gulp.start('json');
//	gulp.start('images');
//	gulp.start('fonts');
    gulp.watch(paths.htmlsrc, ['html']);
    gulp.watch(paths.less, ['styles']);
    gulp.watch(paths.jsSRC, ['scripts']);
    gulp.watch(paths.jsxSRC, ['jsx']);
    gulp.watch(paths.jsonSRC, ['json']);
//    gulp.watch(paths.imgSRC, ['images']);
//    gulp.watch(paths.fontsSRC, ['fonts']);
});

gulp.task('clean', function(cb) {
    del(['result'], cb);
});


/*******************************************************************************
	LESS
*******************************************************************************/
gulp.task('styles', function() {
   return gulp.src([paths.less])
	  .pipe(concat('style.css'))
      .pipe(less({
        plugins: [autoprefix]
      }))
      .pipe(gulp.dest(paths.css))
	  .pipe(minifycss())
	  .pipe(concat('style.min.css'))
	  .pipe(gulp.dest(paths.css));
});


/*******************************************************************************
	JS just copy all files to Result directory
*******************************************************************************/

gulp.task('scripts', function() {
  return gulp.src(paths.jsSRC)
    .pipe(gulp.dest(paths.jsRESULT));
});
gulp.task('jsx', function() {
  return gulp.src([paths.jsxSRC])
    .pipe(concat('react_app.js'))
    .pipe(react())
    .pipe(gulp.dest(paths.jsRESULT));
});

/*******************************************************************************
	HTML
*******************************************************************************/
gulp.task('html', function(){
    gulp.src(paths.htmlsrc)
    .pipe(processhtml({
        process: true,
        templateSettings: {
            interpolate: /{{([\s\S]+?)}}/g // twig
        },
        data: {
            cssurl: '/css/style.min.css',
            imgurl: '/images/',
            devimg: '/devimages/',
            brand: '0'
        },
        defaults: {
            cache: false
        }
    }))
    .pipe(gulp.dest(paths.htmlRESULT));
});

/*******************************************************************************
	WEB SERVER
*******************************************************************************/
gulp.task('connect', function() {
    connect.server({
        root: 'result',
        livereload: false,
        port: 1234
    });
});


/*******************************************************************************
	JSON
*******************************************************************************/
gulp.task('json', function() {
    gulp.src(paths.jsonSRC)
    .pipe(gulp.dest(paths.jsonRESULT));
});

/*******************************************************************************
	Copy IMAGES and FONTS
*******************************************************************************/
gulp.task('images', function() {
  return gulp.src(paths.imgSRC)
    .pipe(gulp.dest(paths.imgRESULT));
});
gulp.task('imagesOpt', function() {
  return gulp.src(paths.imgSRC)
    .pipe(gulp.dest(paths.imgRESULT));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fontsSRC)
    .pipe(gulp.dest(paths.fontsRESULT));
});