const del = require('del');
const { src, dest, watch, series, parallel } = require("gulp");
const minifyCSS = require('gulp-csso');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const inject = require('gulp-inject-string');

const env = process.env.NODE_ENV;
const isProd = env == 'production';
const isDev = env == 'development';

function css () {
  return src('src/styles.css')
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(dest('dist'));
}

function js () {
  return src(['src/index.js'], { sourcemaps: isDev })
    .pipe(inject.replace('DEBUG', isDev ? 'true' : 'false'))
    .pipe(concat('game.min.js'))
    .pipe(dest('dist', { sourcemaps: isDev && '.'}));
}

function html () {
  return src('src/index.html')
    .pipe(dest('dist'));
}

function dev () {
  watch('src/*.css', css);
  watch('src/*.js', js);
  watch('src/*.html', html);
}

function clean () {
  return del('./dist/*');
}

module.exports = {
  dev: series(clean, parallel(html, css, js), dev)
}