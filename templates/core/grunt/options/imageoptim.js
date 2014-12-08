module.exports = {
    options: {
        jpegMini: false,
        imageAlpha: true,
        quitAfter: true
    },
    build: {
        expand: true,
        cwd: '<%= scaffold.build.path %>',
        src: '**/*.{png,jpg,jpeg}',
        dest: '<%= scaffold.build.path %>'
    }
};
