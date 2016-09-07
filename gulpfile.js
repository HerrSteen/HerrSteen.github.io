"use strict";

var gulp = require("gulp");
var stylus = require("gulp-stylus");
var pug = require("gulp-pug");
var pugLinter = require("gulp-pug-linter");
var gutil = require("gulp-util");
var browserSync = require('browser-sync').create();

var src = {
    stylus: 'html/stylus/main.styl',
    css:  'build/css/',
    pug: 'html/*.pug',
    html: 'build/',
    scripts: 'html/js/*.js',
    destScripts: 'build/js/'
};

gulp.task("scripts", function () {
  return gulp.src(src.scripts)
    .pipe(gulp.dest(src.destScripts))

});

gulp.task("stylus", function () {
  return gulp.src(src.stylus)
    .pipe(stylus())
    .on("error", onError)
    .pipe(gulp.dest(src.css));
});

gulp.task("pug", function () {
  return gulp.src(src.pug)
  .pipe(pugLinter())
  .pipe(pug({ }))
  .on("error", onError)
  .pipe(gulp.dest(src.html));
});

function onError(err) {
  gutil.log("Error: ", "\n\n\n" + gutil.colors.red(err.message) + "\n\n\n");
  this.emit("end");
}

gulp.task("browser-sync", function () {

  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });

  gulp.watch(src.html + "*.html").on("change", browserSync.reload);
  gulp.watch(src.css + "*.css").on("change", browserSync.reload);
  gulp.watch(src.destScripts + "*.js").on("change", browserSync.reload);

});

gulp.task("watch", function () {

  gulp.watch(src.pug, ["pug"]);
  gulp.watch(src.stylus, ["stylus"]);
  gulp.watch(src.scripts, ["scripts"]);
});

gulp.task("default", ["browser-sync", "pug", "stylus", "scripts", "watch"]);
