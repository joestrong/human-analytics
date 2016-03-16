"use strict";
let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');

let watchPaths = {
  sass: './sass/**/*.scss',
  js: './js/**/*.js'
};
let sourceFiles = {
  sass: './sass/app.scss',
  js: './js/app.js',
};
let dest = './';

gulp.task('mdl', function() {
  gulp.src('./node_modules/material-design-lite/material.css')
    .pipe(rename('_material.scss'))
    .pipe(gulp.dest('./sass'))
});

gulp.task('sass', ['mdl'], function() {
  gulp.src(sourceFiles.sass)
    .pipe(sass())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(dest));
});

gulp.task('scripts', function() {
  gulp.src(sourceFiles.js)
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(dest));
});

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', function() {
  gulp.watch(watchPaths.sass, ['sass']);
  gulp.watch(watchPaths.js, ['scripts']);
});
