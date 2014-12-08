module.exports = {
    build: {
        expand: true,
        cwd: '<%= scaffold.build.assets %>/css',
        src: '**/*.css',
        dest: '<%= scaffold.build.assets %>/css',
        options: {
            deleteAfterEncoding: true,
            maxImageSize: 20480
        }
    }
};
