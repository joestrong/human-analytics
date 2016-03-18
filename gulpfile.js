"use strict";
let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let babelify = require('babelify');
let browserify = require('browserify');
let source = require('vinyl-source-stream');

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
    browserify(sourceFiles.js, { debug: true })
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('app.min.js'))
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(gulp.dest(dest));
});

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', function() {
  gulp.watch(watchPaths.sass, ['sass']);
  gulp.watch(watchPaths.js, ['scripts']);
});
