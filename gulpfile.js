"use strict";
let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let babelify = require('babelify');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let notify = require("gulp-notify");

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
    .pipe(sass().on("error", function (err) { console.log(err.message); return notify().write('SASS error'); }))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(dest))
    .pipe(
      notify({
        title: 'Gulp',
        message: 'Compiled SASS',
        sound: 'Pop'
      })
    );
});

gulp.task('scripts', function() {
    browserify(sourceFiles.js, { debug: true })
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .on("error", function (err) { console.log(err); return notify().write('Bundle error'); })
        .pipe(source('app.min.js'))
        .pipe(gulp.dest(dest))
        .pipe(
          notify({
            title: 'Gulp',
            message: 'Compiled javascript',
            sound: 'Pop'
          })
        );
});

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', function() {
  gulp.watch(watchPaths.sass, ['sass']);
  gulp.watch(watchPaths.js, ['scripts']);
});
