const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')
const imageminOptipng = require('imagemin-optipng')
const imageminJpegtran = require('imagemin-jpegtran')
const cache = require('gulp-cache')
const del = require('del')

const globs = {
  src: './src/**',
  dist: './dist'
}
gulp.task('images', () => {
  return gulp.src(globs.src)
    .pipe(cache(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true,
      multipass: true,
      use: [
        pngquant(),
        imageminSvgo(),
        imageminOptipng({optimizationLevel: 7}),
        imageminJpegtran({progressive: true})
      ],
      svgoPlugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: false },
        { removeEmptyAttrs: false }
      ]
    })))
    .pipe(gulp.dest(globs.dist))
})

gulp.task('clean', (cb) => {
  return del(globs.dist, cb)
})

gulp.task('watch', () => {
  gulp.watch(globs.src, ['images'])
})

gulp.task('default', ['clean'], () => {
  gulp.start('images', 'watch')
})
