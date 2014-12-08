module.exports = {
    options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        map: true
    },
    staging: {
        files: [{
            expand: true,
            cwd: '<%= scaffold.staging.assets %>/css',
            src: '**/*.css',
            dest: '<%= scaffold.staging.assets %>/css'
        }]
    },
    build: {
        files: [{
            expand: true,
            cwd: '<%= scaffold.tmp.assets %>/css',
            src: '**/*.css',
            dest: '<%= scaffold.tmp.assets %>/css'
        }]
    }
};
