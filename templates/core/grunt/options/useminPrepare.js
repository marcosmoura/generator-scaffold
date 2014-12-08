module.exports = {
    options: {
        dest: '<%= scaffold.build.path %>',
        root: '<%= scaffold.dev.path %>',
        flow: {
            steps: {
                'js': ['concat', 'uglifyjs'],
                'css': ['concat', 'cssmin']
            },
            post: []
        }
    },
    html: '<%= scaffold.build.path %>/**/*.html'
};
