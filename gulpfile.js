// Get the required packages
var gulp = 	require('gulp');
var stylus = require('gulp-stylus');

// Set paths to watch
var paths = {
	styl: './public/stylus/**/*'
}

// Set task to compress file stylus and convert to css
gulp.task('compress',function () {
	gulp.src('./public/stylus/style.styl')
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest('./public/css'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.styl, ['compress']);
});

gulp.task('default',['watch','compress']);