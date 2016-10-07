

var gulp = require('gulp');
var uglifyjs = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');

gulp.task('uglifyjs',function (){
	gulp.src('waimai/js/*.js')
	.pipe(uglifyjs())
	.pipe(gulp.dest('demo/js'))
})

gulp.task('minifycss',function (){
	gulp.src('waimai/css/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest('demo/css'))
})

gulp.task('minifyhtml',function (){
	gulp.src('waimai/index.html')
	.pipe(minifyhtml())
	.pipe(gulp.dest('demo'))
})

gulp.task('data',function(){
	gulp.src('waimai/data/*.json')
	.pipe(gulp.dest('demo/data'))
})

gulp.task('img',function(){
	gulp.src('waimai/img/**/*.*')
	.pipe(gulp.dest('demo/img'))
})

gulp.task('app',function(){
	gulp.src('waimai/app.js')
	.pipe(gulp.dest('demo'))
})

gulp.task('default',['uglifyjs','minifycss','minifyhtml','data','img','app']);
