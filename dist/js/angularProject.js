var app = angular.module('app',[]);

var notas = function(myScope){
	myScope.notitas =
        [{id:1,title:"fuuuuck",description:"more fuuuck",done:false},
            {id:2,title:"loool",description:"lalala",done:true}];
        myScope.remove = function(algo) {
            myScope.notitas.splice(algo.id - 1, 1);
            for (var i = algo.id - 1; i < myScope.notitas.length; i++) {
                if(myScope.notitas[i].id != 1)
                myScope.notitas[i].id = myScope.notitas[i].id-1;
            }
        }
        myScope.add = function() {
            this.nota.id = myScope.notitas.length+1;
            this.nota.done = false;
            myScope.notitas.push(angular.copy(this.nota));}
};

notas.$inject = ['$scope'];

app.controller('notas',notas);

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

gulp.task('lint',function(){
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass',function(){
    return gulp.src(['app/**/*.scss','!app/sass/_*.scss'])
        .pipe(concat('angularProject.scss'))
        .pipe(sass({outputStyle : 'expanded'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('scripts',function(){
    return gulp.src('*.js')
        .pipe(concat('angularProject.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('html',function(){
    gulp.src('./*html')
        .pipe(connect.reload());
});

gulp.task('watch',function(){
    gulp.watch('*.js',['lint','scripts']);
    gulp.watch('app/**/*.scss',['sass']);
    gulp.watch('*html',['html']);
});

gulp.task('connect',function(){
  connect.server({
    port: 9500,
    livereload: true
  });
});

gulp.task('default',['lint','sass','scripts']);
gulp.task('serve',['default','connect','watch']);
