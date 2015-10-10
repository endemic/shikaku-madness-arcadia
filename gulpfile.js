var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    console.log('stuff');
});

gulp.task('concat', function () {
    var src = [
        'src/data/*.js',
        'src/lib/*.js',
        'src/objects/*.js',
        'src/scenes/*.js'
    ];
    return gulp.src(src).pipe(concat('shikaku-madness.js'))
                        .pipe(gulp.dest('dist'));
});


gulp.task('compress', function () {
    // TODO: source map
    return gulp.src('dist/shikaku-madness.js')
               .pipe(uglify())
               .pipe(rename('shikaku-madness.min.js'))
               .pipe(gulp.dest('dist'));
});

gulp.task('cordova', ['concat', 'compress'], function () {
    gulp.src(['dist/shikaku-madness.min.js'], { base: 'dist' })
        .pipe(gulp.dest('cordova/www/js'));

    gulp.src(['node_modules/arcadia/dist/arcadia.js'], { base: 'node_modules/arcadia/dist' })
        .pipe(gulp.dest('cordova/www/js'));

    gulp.src(['assets/**'])
        .pipe(gulp.dest('cordova/www/assets'));
});

gulp.task('web', ['concat', 'compress'], function () {
    gulp.src(['dist/shikaku-madness.min.js'], { base: 'dist' })
        .pipe(gulp.dest('../../websites/ganbarugames.com/shikaku/javascript'));

    gulp.src(['node_modules/arcadia/dist/arcadia.js'], { base: 'node_modules/arcadia/dist' })
        .pipe(gulp.dest('../../websites/ganbarugames.com/shikaku/javascript'));

    gulp.src(['node_modules/sona/dist/sona.js'], { base: 'node_modules/sona/dist' })
        .pipe(gulp.dest('../../websites/ganbarugames.com/shikaku/javascript'));

    gulp.src(['assets/**'])
        .pipe(gulp.dest('../../websites/ganbarugames.com/shikaku'));

    gulp.src(['dist/index'], { base: 'dist' })
        .pipe(gulp.dest('../../websites/ganbarugames.com/shikaku'));
});
