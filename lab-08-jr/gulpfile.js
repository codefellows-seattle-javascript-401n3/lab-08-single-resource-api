'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('test', function(){
  gulp.src('./test/*.js')
  .pipe(mocha());
});

gulp.task('lint', function(){
  gulp.src('[**/*.js, !node_modules/**]')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('default', ['test', 'lint']);
