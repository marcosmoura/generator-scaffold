module.exports = {
    options: {
        config: '.jsbeautifyrc'
    },
    staging: {
        expand: true,
        cwd: '<%= scaffold.staging.path %>',
        dest: '<%= scaffold.staging.path %>',
        src: [
            '**/*.html',
            '!assets/**/*.html'
        ],
        ext: '.html'
    }
};
