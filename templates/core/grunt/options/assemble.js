module.exports = {
    options: {
        layoutdir: '<%%= scaffold.dev.templates %>',
        layoutext: '.html',
        layout: 'default',
        partials: ['<%%= scaffold.dev.partials %>/**/*.html'],
        flatten: true
    },
    staging: {
        expand: true,
        cwd: '<%%= scaffold.dev.path %>',
        dest: '<%%= scaffold.staging.path %>',
        src: [
            '**/*.html',
            '!templates/**/*',
            '!partials/**/*'
        ]
    },
    build: {
        expand: true,
        cwd: '<%%= scaffold.dev.path %>',
        dest: '<%%= scaffold.build.path %>',
        src: [
            '**/*.html',
            '!templates/**/*',
            '!partials/**/*'
        ]
    }
};
