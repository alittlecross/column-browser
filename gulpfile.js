/* eslint-disable import/no-extraneous-dependencies */

const autoprefixer = require('gulp-autoprefixer');

const {
  dest, parallel, series, src, task,
} = require('gulp');

const fs = require('fs');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass')(require('sass'));
const stream = require('stream');
const uglify = require('gulp-uglify');

const passThrough = false;

task('public', async () => {
  try {
    await fs.rmSync('public', {
      recursive: true,
    });
  } catch (err) {
    console.error(err);
  } finally {
    await fs.mkdirSync('public');
  }
});

task('img', () => src('src/assets/img/*').pipe(dest('public/img')));

task('js', () => src('src/assets/js/**/*.js')
  .pipe(passThrough ? new stream.PassThrough({ objectMode: true }) : uglify())
  .pipe(dest('public/js')));

task('scss', () => src('src/assets/scss/style.scss').pipe(sass.sync({
  outputStyle: 'compressed',
})).pipe(autoprefixer()).pipe(dest('public/css')));

task('assets', parallel(['img', 'js', 'scss']));

task('build', series(['public', 'assets']));

task('nodemon', async () => {
  await nodemon({
    script: 'server.js',
    ext: 'js njk scss',
    tasks: (changedFiles) => (changedFiles.some((e) => /.*(\/src\/assets\/).*/.test(e)) ? ['assets'] : []),
    ignore: ['public'],
  });
});
