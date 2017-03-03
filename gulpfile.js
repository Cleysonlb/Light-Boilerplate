const gulp        = require('gulp');
const stylus      = require('gulp-stylus');
const concat      = require('gulp-concat');
const connect     = require('gulp-connect');
const plumber     = require('gulp-plumber');
const watch       = require('gulp-watch');
const livereload  = require('gulp-livereload');
const browserSync = require('browser-sync');
const imagemin    = require('gulp-imagemin');
const jeet        = require('jeet');
const rupture     = require('rupture');
const stylint     = require('gulp-stylint');
const files       = ['index.html', './build/css/main.css', './build/js/main.js'];

//Browser Sync
gulp.task('browser-sync', () => {
    browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

//Stylus Task
gulp.task( 'stylus', () => {
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

//Stylus lint Task

gulp.task('gulp-stylint', () => {
    gulp.src('./source/styl/**/*.styl')
      .pipe(stylint({config: '.stylintrc'}))
      .pipe(stylint.reporter())
});

//Concat Javascript Task
gulp.task('scripts', () => {
  gulp.src('./source/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js'));
});

//Brower reload Task
gulp.task( 'files', () => {
  gulp.src( files ).pipe( connect.reload() );
});

//Minify img
gulp.task('imagemin', () => {
    return gulp.src('source/img/**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/img/'));
});

//Watch Task
gulp.task( 'watch', () => {
  gulp.watch( files, [ 'files' ]);
  gulp.watch('./source/styl/**/*.styl', ['stylus']);
  gulp.watch('./source/js/*.js', ['scripts']);
  gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
  gulp.watch('./source/styl/**/*.styl', ['gulp-stylint']);
});


//Connect Task
gulp.task( 'connect', () => {
  connect.server({ livereload: true });
});

//Default Task
gulp.task( 'default', [ 'stylus', 'gulp-stylint', 'files', 'watch', 'connect', 'scripts', 'browser-sync', 'imagemin' ]);
