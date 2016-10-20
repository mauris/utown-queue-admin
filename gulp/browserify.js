var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern : ['gulp-*'],
  camelize: true
});
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');

function compile(watch) {
  var brwsfy = browserify('./src/index.js', { debug: true });
  var bundler = watchify(brwsfy);

  brwsfy.transform('babelify', {presets: ["es2015"]});
  brwsfy.transform('debowerify');
  brwsfy.transform('brfs');

  function rebundle() {
    return bundler.bundle()
      .on('error', (err) => { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/assets/js'))
      .pipe($.notify({'message': 'Browserify complete.', onLast: true}));
  }

  if (watch) {
    bundler.on('update', () => {
      console.log('-> rebundling...');
      return rebundle();
    });
  }

  return rebundle();
}

gulp.task('browserify', () => {
  return compile(process.env.NODE_ENV === 'development');
});
