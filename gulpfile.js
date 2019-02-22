var gulp = require('gulp'),
	runSequence = require('run-sequence');
	browserSync = require('browser-sync').create();
	pug = require('gulp-pug');
	less = require('gulp-less');
	path = require('path');
	autoprefixer = require('gulp-autoprefixer');
    concat = require('gulp-concat'), 
    uglify = require('gulp-uglify'), 
    rename = require('gulp-rename'), 
    del = require('del');

/* --------------------------------------------------------
   ----------------- Таски ---------------------------
------------------------------------------------------------ */



gulp.task('pug', function buildHTML() {
  	return gulp.src('app/pug/**/*.pug')
  	.pipe(pug())
    .pipe(gulp.dest("dist"))
});

gulp.task('less', function () {
  	return gulp.src('app/less/**/*.less')
    .pipe(less({
      	paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('app/js/*.js') 
        .pipe(concat('scripts.js')) 
        .pipe(gulp.dest('dist/js')); 
});


gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('build', gulp.series('clean', 'pug', 'less', 'scripts', function(done) {
  // do more stuff
  done();
}));

gulp.task('watch', function() {
    gulp.watch('app/pug/*.pug', gulp.series ('pug'));
    gulp.watch('app/less/*.less', gulp.series ('less'));
    gulp.watch('app/js/*.js', gulp.series ('scripts'));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        files: ['dist/']
    });
});

gulp.task('default', gulp.parallel('build', 'watch', 'server', function(done) {
  // do more stuff
  done();
}));