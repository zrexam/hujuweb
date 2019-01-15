//创建一个gulp对象
const gulp = require("gulp");
//生成首页
gulp.task("copy-index",function(){
	return gulp.src('index.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
})

//生成JSON
gulp.task("data",function(){
	return gulp.src('data/*.json')
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
})

//生成css
const sass = require("gulp-sass-china"); //sass
const rename = require("gulp-rename");  //重命名
const minifyCss = require("gulp-minify-css"); //压缩

gulp.task("scss", function(){
	return gulp.src("css/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCss())
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".css";
	}))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

//生成JS
const uglify = require("gulp-uglify");
gulp.task("js", function(){
	return gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".js";
	}))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

//生成图片
gulp.task("images", function(){
	return gulp.src("images/**/*.{jpg,png}")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

//希望能够一次性执行多个任务
gulp.task("build", ["copy-index", "images", "js", "scss","data"], function(){
	console.log("编译成功");
})

//gulp 监听
gulp.task("watch", function(){
	gulp.watch("index.html", ['copy-index']);
	gulp.watch("images/**/*.{jpg,png}",["images"]);
	gulp.watch("css/*.scss", ['scss']);
	gulp.watch("js/*.js", ['js']);
	gulp.watch("data/*.json", ["data"]);
})
//创建服务器
const connect = require("gulp-connect");

gulp.task("server", function(){
	connect.server({
		root: "dist",
		port: 8888,
		livereload: true
	})
})

//设置默认任务
gulp.task("default",  ["server","watch"]);