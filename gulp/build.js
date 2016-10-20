var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern : ['gulp-*', 'del'],
  camelize: true
});

/**
 * Code performs gulp pre-build cleaning, building and post-build cleaning
 * @exports null
 */

(() => {
  "use strict";

  gulp.task('pre-clean', (done) => {
    return $.del(['public/assets/', '.tmp/'], done);
  });

  // Deletes any temporary files after a build
  gulp.task('post-clean', (done) => {
    return $.del(['.tmp/'], done);
  });

  /**
   * The main build task.
   * If there are changes on the code or additional images, they are
   * automatically updated to the public folder on the development NODE_ENV
   */
  gulp.task('build', ['assets', 'bower', 'browserify'], () => {
    if(process.env.NODE_ENV === 'development'){
      console.log('Watching for changes...');
      gulp.watch('./assets/images/**/*.{jpg|png|gif}', ['images']);
      gulp.watch('./assets/sass/**/*.scss', ['sass']);
      gulp.watch('./src/**/*.pug', ['views']);
      gulp.watch('./bower_components/**/*', ['bower']);
    }
    return gulp.start('post-clean');
  });

  gulp.task('productionbuild', ['build'], () => {
    require('process').exit(0);
  });

})();
