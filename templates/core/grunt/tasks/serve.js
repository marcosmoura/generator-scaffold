module.exports = function (grunt) {
    grunt.registerTask('serve', [
        'build',
        'browserSync:build',
        'watch'
    ]);
};
