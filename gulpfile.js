const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

function customPlumber() {
    return plumber({
        errorHandler(err) {
            console.log(err.toString());
            this.emit('end');
        }
    });
}

gulp.task('styles', () => {
    gulp
        .src(['./**/*.scss', '!./node_modules/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./'));
});

gulp.task('scripts', () => {
    gulp
        .src(['./**/app.js', '!./node_modules/**/*.js'])
        .pipe(customPlumber())
        .pipe(
            babel({
                presets: ['@babel/env']
            })
        )
        .pipe(
            rename({
                suffix: '-transpiled'
            })
        )
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['scripts', 'styles'], () => {
    gulp.watch('./**/*.scss', ['styles']);
    gulp.watch('./**/app.js', ['scripts']);
});
