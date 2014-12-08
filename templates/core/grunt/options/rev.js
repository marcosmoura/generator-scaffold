module.exports = {
    build: {
        files: {
            src: [
                '<%= scaffold.build.assets %>/**/*.js',
                '<%= scaffold.build.assets %>/**/*.css',
                '<%= scaffold.build.path %>/*.{ico,png,gif}'
            ]
        }
    }
};
