var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var concat      = require('gulp-concat');
var connect     = require('gulp-connect');
var plumber     = require('gulp-plumber');
var watch       = require('gulp-watch');
var livereload  = require('gulp-livereload');
var browserSync = require('browser-sync');
var imagemin    = require('gulp-imagemin');
var jeet        = require('jeet');
var rupture     = require('rupture');
var files       = ['index.html', './build/css/main.css', './build/js/main.js'];


//Browser Sync
gulp.task('browser-sync', function() {
    browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

//Stylus Task
gulp.task( 'stylus', function() {
    gulp.src( './source/styl/main.styl' )
      .pipe(stylus({ compress: true }) )
      .pipe(concat('main.css'))
      .pipe(plumber())
        .pipe(stylus({
            use:[jeet(),rupture()],
            compress: true
        }))
      .pipe(browserSync.reload({stream:true}))
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

//Minify img

gulp.task('imagemin', function() {
    return gulp.src('source/img/**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/img/'));
});

//Watch Task
gulp.task( 'watch', function() {
  gulp.watch( files, [ 'files' ]);
  gulp.watch('./source/styl/**/*.styl', ['stylus']);
  gulp.watch('./source/js/*.js', ['scripts']);
  gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
});


//Connect Task
gulp.task( 'connect', function() {
  connect.server({ livereload: true });
});

//Default Task
gulp.task( 'default', [ 'stylus', 'files', 'watch', 'connect', 'scripts', 'browser-sync', 'imagemin' ]);