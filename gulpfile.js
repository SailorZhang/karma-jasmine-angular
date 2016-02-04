var gulp = require('gulp'),
	del = require('del');

gulp.task('default', () => {

});

gulp.task('deletelib', () => {
	del(['lib/**/*.js']);
});

gulp.task('copy2lib', ['deletelib'], () => {
	gulp.src(['bower_components/angular/angular.js', 
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/underscore/underscore.js',
		'bower_components/angular-route/angular-route.js'])
		.pipe(gulp.dest('lib'))
});