/*
* Config Gulpfile
*/

'use strict';

const gulp = require('gulp'),
  pkg = require('./package.json'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  selector = require('postcss-custom-selectors'),
  nesting = require('postcss-nesting'),
  customMedia = require('postcss-custom-media'),
  colorMod = require('postcss-color-mod-function'),
  copyright = `/**
* vishnucss collapse - v${pkg.version}
* https://vishnucss.github.io/vishnu#collapse
*/\r\n`,
  $ = require('gulp-load-plugins')();

/*
* Collapse build task
*/
gulp.task('build', () => {
  let plugins = [
    selector(),
    nesting(),
    customMedia(),
    colorMod()
  ];
  return gulp
    .src([
      './src/variables.css',
      './src/customs.css',
      './src/collapse.css'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('vishnu.collapse.css'))
    .pipe(postcss(plugins))
    .pipe($.header(copyright + '\n'))
    .pipe($.size())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

/*
* Minify in build collapse
*/
gulp.task('minify', ['build'], () => {
  let plugins = [
    selector(),
    cssnano(),
    nesting(),
    customMedia(),
    colorMod()
  ];
  return gulp
    .src(['./dist/vishnu.collapse.css'])
    .pipe($.sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe($.header(copyright))
    .pipe($.size())
    .pipe(
      $.size({
        gzip: true
      })
    )
    .pipe($.concat('vishnu.collapse.min.css'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
});

/*
* Watch tasks
*/
gulp.task('watch', () => {
  gulp.watch(['src/*.css'], ['default']);
});

/*
* Running commands to development and build
*/
gulp.task('default', ['build', 'minify']);
