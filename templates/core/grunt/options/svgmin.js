module.exports = {
    build: {
        files: [{
            dot: true,
            expand: true,
            cwd: '<%= scaffold.dev.assets %>',
            dest: '<%= scaffold.build.assets %>',
            src: ['**/*.svg']
        }]
    }
};
