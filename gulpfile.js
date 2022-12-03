const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const webp = require('gulp-webp');
const newer = require('gulp-newer');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
    });
}

function cleanDist() {
    return del('dist');
}

function images() {
    return src('app/img/**/*')
        .pipe(webp())
        .pipe(newer('app/img'))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest('app/img'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(['app/js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(concat('style.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 versions'],
                grid: true,
            })
        )
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function build() {
    return src(
        [
            'app/css/*.css',
            'app/fonts/**/*',
            'app/js/*.js',
            'app/*.html',
            'app/img/**/*',
        ],
        { base: 'app' }
    ).pipe(dest('dist'));
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/img/**/*'], images);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, build);
exports.default = parallel(images, styles, scripts, browsersync, watching);
