var gulp = require('gulp');
var jslint = require('gulp-jslint');

gulp.task('lintjs', function () {
    return gulp.src(['./assets/js/**/*.js'])
        .pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            predef: [],
            reporter: 'default',
            errorsOnly: false
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});