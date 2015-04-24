var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');
    
gulp.task('sass', function() {
  return sass('public/stylesheets/sass/style.scss', {style: 'expanded'})
    .pipe(gulp.dest('public/stylesheets/css'));
});

gulp.task('exportcss', ['sass'], function() {
  return gulp.src(['bower_components/normalize.css/normalize.css', 'bower_components/dynamic/css/dynamic.css', 'public/stylesheets/css/style.css'])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Styles tasks complete' }))
    .pipe(livereload());
});

gulp.task('lintjs', function() {
  return gulp.src('public/javascripts/limbo/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
});

gulp.task('exportjs', ['lintjs'], function() {
  return gulp.src(['bower_components/jquery/dist/jquery.js', 'public/javascripts/limbo/**/*.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
});

gulp.task('templates', function() {
  return gulp.src('')
    .pipe(livereload());
});

gulp.task('stylesheets', ['sass', 'exportcss']);

gulp.task('javascripts', ['lintjs', 'exportjs']);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['bower_components/normalize.css/normalize.css', 'bower_components/dynamic/css/dynamic.css', 'public/stylesheets/sass/style.scss'], ['stylesheets']);
  gulp.watch('public/javascripts/limbo/**/*.js', ['javascripts']);
  gulp.watch('views/**', ['templates']);
  nodemon({script: 'app.js'});
});