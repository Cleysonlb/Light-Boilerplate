var gulp       = require('gulp');
var stylus     = require('gulp-stylus');
var concat     = require('gulp-concat');
var connect    = require('gulp-connect');
var watch      = require('gulp-watch');
var livereload = require('gulp-livereload');
var jeet       = require('jeet');
var rupture    = require('rupture');
var files      = ['index.html', './build/css/main.css', './build/js/main.js'];

//Stylus Task
gulp.task( 'stylus', function() {
    gulp.src( './source/styl/**/*.styl' )
      .pipe(stylus({ compress: true }) )
      .pipe(concat('main.css'))
      .pipe(stylus({
            use:[jeet(),rupture()],
        }))
      .pipe( gulp.dest( './build/css' ) );
  });

//Concat Javascript Task
gulp.task('scripts', function() {
  gulp.src('./source/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js'));
});

//Brower reload Task
gulp.task( 'files', function() {
  gulp.src( files ).pipe( connect.reload() );
});

//Watch Task
gulp.task( 'watch', function() {
  gulp.watch( files, [ 'files' ]);
  gulp.watch('./source/styl/**/*.styl', ['stylus']);
  gulp.watch('./source/js/*.js', ['scripts']);
});

//Connect Task
gulp.task( 'connect', function() {
  connect.server({ livereload: true });
});

//Default Task
gulp.task( 'default', [ 'stylus', 'files', 'watch', 'connect', 'scripts' ]);