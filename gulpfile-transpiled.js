"use strict";

var gulp = require('gulp');

var sass = require('gulp-sass');

var babel = require('gulp-babel');

var rename = require('gulp-rename');

gulp.task('styles', function () {
  gulp.src('./**/*.scss').pipe(sass()).pipe(gulp.dest('./'));
});
gulp.task('scripts', function () {
  gulp.src('./**/*.js').pipe(babel({
    presets: ['@babel/env']
  })).pipe(rename({
    suffix: '-transpiled'
  })).pipe(gulp.dest('./'));
});
gulp.task('watch', ['scripts', 'styles'], function () {
  gulp.watch('/**/*.scss', ['styles']);
  gulp.watch('/**/*.js', ['scripts']);
});