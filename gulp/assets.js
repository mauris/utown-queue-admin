var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern : ['gulp-*'],
  camelize: true
});

/**
 * Code performs gulp building from the assets folder.
 * @exports null
 */

(() => {
  "use strict";

  /**
   * Copy the images from assets/images over to the public folder
   */
  gulp.task('images', () => {
    return gulp.src('assets/images/**/*.{jpg,png,gif}')
      .pipe(gulp.dest('public/assets/images/'))
      .pipe($.notify({'message': 'Images are loaded.', onLast: true}));
  });

  /**
   * Copy the css files over to public folder
   */
  gulp.task('css', () => {
    return gulp.src([
        "assets/css/**/*"
      ])
      .pipe(gulp.dest('public/assets/css'));
  });

  /**
   * Performs compilation of Sass code to CSS code in public folder
   * will check for Sass errors, autoprefix, clean CSS and concatenate into
   * one single file
   */
  gulp.task('sass', () => {
    return gulp.src('assets/sass/main.scss')
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer())
      .pipe($.cleanCss())
      .pipe($.concat('style.css'))
      .pipe($.replace('http://', '//'))
      .pipe(gulp.dest('public/assets/css/'))
      .pipe($.notify({'message': 'Sass compilation complete.', onLast: true}));
  });

  gulp.task('views', () => {
    return gulp.src([
        "src/components/**/*.pug",
        "src/pages/**/*.pug",
        "src/*.pug"
      ])
      .pipe($.pug())
      .pipe(gulp.dest('public/assets/views'))
      .pipe($.notify({'message': 'Views compilation complete.', onLast: true}));
  });

  gulp.task("assets", ['sass', 'images', 'css', 'views']);
})();
