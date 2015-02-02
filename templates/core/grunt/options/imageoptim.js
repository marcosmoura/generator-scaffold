module.exports = {
    options: {
        jpegMini: false,
        imageAlpha: true,
        quitAfter: true
    },
    build: {
        expand: true,
        cwd: '<%= scaffold.build.path %>',
        src: '**/*.{png,jpg,jpeg,gif}',
        dest: '<%= scaffold.build.path %>'
    }
};
