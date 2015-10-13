import gulp from 'gulp';
import gulpif from 'gulp-if';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import debug from 'gulp-debug';
import minimist from 'minimist';

const sourceFiles = [
    'gulpfile.babel.js',
    '{core,src,test}/**/*.js'
];

const parameters = {
    boolean: 'd',
    default: {
        d: false
    }
};

let options = minimist(process.argv.slice(2), parameters);

gulp.task('lint', () => {
    return gulp.src(sourceFiles)
        .pipe(gulpif(options.d, debug({title: 'Test:'})))
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('prepublish', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('generators/'));
});

gulp.task('test', ['lint', 'prepublish']);

gulp.task('watch', () => {
    gulp.watch(sourceFiles.concat(['.eslintrc']), ['lint', 'prepublish']);
});

gulp.task('default', ['prepublish', 'watch']);
