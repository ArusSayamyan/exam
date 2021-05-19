const gulp = require('gulp'),
imagemin = require("gulp-imagemin"),
flatten = require("gulp-flatten"),
cssMinify = require("gulp-css-minify"),
concat = require("gulp-concat-css"),
minifyJs = require("gulp-js-minify"),
browserSync = require("browser-sync").create();
// watch = require('gulp-watch');
htmlmin = require("gulp-htmlmin");



//image compress
gulp.task("imagemin", function() {
    return gulp
        .src(["public/**/*{png,gif,jpg,jpeg,svg,ico}"])
        .pipe(imagemin())
        .pipe(flatten({ includeParents: 0 }))
        .pipe(gulp.dest("./build/img"));
});

//html compress

gulp.task("minify", () => {
    return gulp
        .src("public/page1/index.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./build"));
});

//css concat

gulp.task("concat", function() {
    return gulp.src('public/**/*.css')
        .pipe(concat("page1.css"))
        .pipe(gulp.dest("./app/concatcss"));
});

//css compress

gulp.task("compress", function() {
    return gulp
        .src("./app/concatcss/*")
        .pipe(cssMinify())
        .pipe(gulp.dest("./build/css"));
});

//jsCompress

gulp.task("minifyJs", async() => {
    gulp
        .src("public/page5/js/*.js")
        .pipe(minifyJs())
        .pipe(gulp.dest("./build/js"));
});

//browser sync

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
    })
});
// gulp.task('default', gulp.parallel('browserSync', 'watch'));

gulp.task(
    "browser",
    gulp.series(
        "minify",
        "concat",
        "compress",
        "minifyJs",
        "imagemin"
    )
);



