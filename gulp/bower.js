var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern : ['gulp-*', 'main-bower-files', 'del'],
  camelize: true
});

/**
 * Code performs gulp building from the bower_components folder.
 * For all Less, Sass and CSS files, they are first compiled/copied into a
 * temp directory before being concatenated into a single CSS file
 * @exports null
 */

(() => {
  'use strict';

  /*
   * Compile Less files from bower components into CSS in the temp directory
   */
  gulp.task('bower-less',  () => {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter("**/*.less"))
      .pipe($.less())
      .pipe(gulp.dest('.tmp/'));
  });

  /*
   * Compile Sass files from bower components into CSS in the temp directory
   */
  gulp.task('bower-sass',  () => {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter("**/*.scss"))
      .pipe($.sass())
      .pipe(gulp.dest('.tmp/'));
  });

  /*
   * Copy font files from bower components folder into the public assets folder
   */
  gulp.task('bower-fonts',  () => {
    return gulp.src(
      [
        "bower_components/*/{font,fonts}/*",
      ]
    )
      .pipe($.flatten())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe(gulp.dest("public/assets/fonts"));
  });

  /*
   * Copy CSS files from bower components folder into the temp directory
   */
  gulp.task('bower-css', () => {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.css'))
      .pipe($.flatten())
      .pipe(gulp.dest('.tmp'));
  });

  /*
   * concatenate all CSS files in the temp directory, clean them and copy
   * them into the public assets folder
   */
  gulp.task('bower-stylesheets', ['bower-less', 'bower-sass', 'bower-css'],  () => {
    return gulp.src(
      [
        ".tmp/*.css"
      ]
    )
      .pipe($.concat('vendor.css'))
      .pipe($.replace('../font/', '../fonts/'))
      .pipe($.cleanCss())
      .pipe(gulp.dest("public/assets/css"));
  });

  /*
   * Process all bower components JS files into public assets folder as
   * vendor.js
   */
  gulp.task('bower-js', () => {
    var jsFilter = $.filter('**/*.js');
    return gulp.src($.mainBowerFiles())
      .pipe(jsFilter)
      .pipe($.if(process.env.NODE_ENV === 'development', $.sourcemaps.init({loadMaps: true})))
      .pipe($.concat('vendor.js'))
      .pipe($.uglify())
      .pipe($.if(process.env.NODE_ENV === 'development', $.sourcemaps.write('./')))
      .pipe(gulp.dest('public/assets/js'));
  });

  /*
   * Process bower JS, CSS and font resources
   */
  gulp.task('bower', ['bower-js', 'bower-stylesheets', 'bower-fonts']);

})();
