module.exports = {
    staging: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= scaffold.dev.path %>',
            dest: '<%= scaffold.staging.path %>',
            src: [
                '*.{ico,png,gif}',
                '**/*.{txt,json,xml,hbs}',
                '.htaccess',
                'assets/**/*',
                '!assets/**/*.{gitignore,svn,DS_Store}'
            ]
        }]
    },
    stagingHtml: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= scaffold.dev.path %>',
            dest: '<%= scaffold.staging.path %>',
            src: ['**/*.html']
        }]
    },
    less: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= scaffold.dev.assets %>/less',
            dest: '<%= scaffold.staging.assets %>/less',
            src: ['**/*.less']
        }]
    },
    build: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= scaffold.dev.path %>',
            dest: '<%= scaffold.build.path %>',
            src: [
                '*.{ico,png,gif}',
                '**/*.{txt,json,xml}',
                '.htaccess',
                'assets/**/*',
                '!assets/**/*.{gitignore,svn,DS_Store}',
                '!assets/{less,js}/**',
                '**/*.hbs'
            ]
        }, {
            expand: true,
            dot: true,
            cwd: '<%= scaffold.tmp.path %>/concat',
            dest: '<%= scaffold.build.path %>',
            src: [
                '**/*.{png,jpg,jpeg,gif,webp,ico}'
            ]
        }]
    },
    buildHtml: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= scaffold.dev.path %>',
            dest: '<%= scaffold.build.path %>',
            src: ['**/*.html']
        }]
    }
};
