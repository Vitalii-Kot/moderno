const { task } = require('gulp');

let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    rename = require('gulp-rename'), // переименовует файл 
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'), 
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'); 

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss') // ищет файл который нам нужен
            .pipe(sass({outputStyle: 'compressed'})) // переводит в css ('compressed') минимизированый/ или ('expanded') обычный
            .pipe(rename({suffix : '.min'}))
            .pipe(gulp.dest('app/css')) // указывает куда сохранить
            .pipe(browserSync.reload({stream: true}))
            .pipe(autoprefixer({overrideBrowserslist: ['last 8 versions']}))
});
gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});
gulp.task('style', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
});

gulp.task('html', function(){ // настроили обновления браузера при внесении изменений в html
        return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){ // настроили обновления браузера при внесении изменений в js
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')) // следим за этим файлом, все что в нем происходит вносим изменения
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))