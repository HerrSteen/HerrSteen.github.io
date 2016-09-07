"use strict";

var gulp = require("gulp");
var stylus = require("gulp-stylus");
var pug = require("gulp-pug");
var pugLinter = require("gulp-pug-linter");
var gutil = require("gulp-util");
var browserSync = require('browser-sync').create();


var baseDir = "html/";

gulp.task("css", function () {
  return gulp.src(baseDir + "*.styl")
    .pipe(stylus())
    .on("error", onError)
    .pipe(gulp.dest("build"));
});

gulp.task("pug", function () {
  return gulp.src(baseDir + "*.pug")
  .pipe(pugLinter())
  .pipe(pug({ }))
  .on("error", onError)
  .pipe(gulp.dest("build"));
});

function onError(err) {
  gutil.log("Error: ", "\n\n\n" + gutil.colors.red(err.message) + "\n\n\n");
  this.emit("end");
}

gulp.task("watch", function () {

  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });

  gulp.watch(baseDir + "*.pug", ["pug"]).on("change", browserSync.reload);
  gulp.watch(baseDir + "*.styl", ["css"]).on("change", browserSync.reload);
});

gulp.task("default", ["watch", "pug", "css"]);
