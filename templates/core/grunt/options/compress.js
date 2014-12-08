module.exports = {
    build: {
        options: {
            archive: '<%= pkg.name %>.zip',
            mode: 'zip',
            pretty: true,
            level: 7
        },
        src: ['<%= scaffold.build.path %>/**'],
        dest: '/'
    }
};
