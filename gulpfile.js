const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], () => {
  browserSync.init({
      server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);