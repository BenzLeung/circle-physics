/**
 * @file Gulp File
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/2/4
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

var gulp = require('gulp');
var clean = require('gulp-clean');
var imageMin = require('gulp-imagemin');
var imageMinPngCrush = require('imagemin-pngcrush');
var requireJsOptimize = require('gulp-requirejs-optimize');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var rename = require('gulp-rename');
var processHtml = require('gulp-processhtml');

var DIST_PATH = 'dist';

gulp.task('clean', function () {
    return gulp.src('dist/*')
        .pipe(clean());
});

gulp.task('images', ['clean'], function () {
    gulp.src('res/*.png')
        .pipe(imageMin({
            plugins: [imageMinPngCrush()]
        }))
        .pipe(gulp.dest(DIST_PATH + '/images'));
});

gulp.task('js', ['clean'], function () {
    gulp.src('js/config.js')
        .pipe(requireJsOptimize({
            mainConfigFile: 'js/config.js',
            out: 'script.js'
        }))
        .pipe(replace(/res\/(.+?).png/g, 'dist/images/$1.png'))
        .pipe(replace(/baseUrl\s*:\s*['"]js["']/g, 'baseUrl:"dist/js"'))
        .pipe(gulp.dest(DIST_PATH + '/js'));
    gulp.src('lib/require.js')
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH + '/js'));
    gulp.src('locale/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH + '/locale'));
});

gulp.task('css', ['clean'], function () {
    gulp.src('css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest(DIST_PATH + '/css'));
});

gulp.task('html', ['clean'], function () {
    gulp.src('index-src.html')
        .pipe(processHtml())
        .pipe(minifyHtml())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['images', 'js', 'css', 'html']);
