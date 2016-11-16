'use strict';

require("babel-core/register");

const
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
  }),
  babel = require('babel-core/register'),
  isparta = require('isparta'),
  del = require('del'),
  gulp = require('gulp'),
  runSequence = require('run-sequence');

const srcFiles = 'src/**/*.{es6,js}';
const testFiles = 'test/**/*.{es6,js}';

const handleErrors = function() {
  const args = Array.prototype.slice.call(arguments);
  $.notify.onError({
    message: '<%= error %>',
    title: 'Compile Error'
  })
  .apply(this, args);
  this.emit('end');
};

gulp.task('clean', () =>
  del(['lib/**'])
);

gulp.task('lint', () =>
  gulp.src([srcFiles, '!node_modules/**', '!coverage/**'])
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError())
);

gulp.task('babel', () =>
  gulp.src(srcFiles)
  .pipe($.babel({
    presets: ['es2015']
  }))
  .on('error', handleErrors)
  .pipe(gulp.dest('lib'))
);

gulp.task('test:pre-test', () =>
  gulp.src([srcFiles])
  .pipe($.istanbul({
    includeUntested: true,
    instrumenter: isparta.Instrumenter
  }))
  .pipe($.istanbul.hookRequire())
);

gulp.task('test:all', ['babel'], () =>
  gulp.src(['test/**/*.js'])
  .pipe($.mocha({
    reporter: 'spec',
    compilers: {
      js: babel
    }
  }))
  .on('error', handleErrors)
);

gulp.task('test:coverage', () =>
  gulp.src([testFiles])
  .on('error', handleErrors)
  .pipe($.istanbul.writeReports())
);

gulp.task('watch', [], () => {
  $.watch(['src/**', 'test/**'], () => {
    runSequence(['babel', 'test:all']);
  });
});

const buildTasks = [
  'babel'
];

const testTasks = [
  'test:pre-test',
  'test:all',
  'test:coverage'
];

gulp.task('build', () => runSequence('clean', buildTasks));
gulp.task('test', testTasks);

gulp.task('default', () => runSequence('clean', buildTasks.concat('watch'), 'test'));
