module.exports = {
    options: {
        singleQuotes: true,
    },
    build: {
        files: [{
            dot: true,
            expand: true,
            cwd: '<%= scaffold.tmp.path %>',
            dest: '<%= scaffold.tmp.path %>',
            src: ['**/*.js']
        }]
    }
};
