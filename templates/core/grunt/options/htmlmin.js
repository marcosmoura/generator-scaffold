module.exports = {
    build: {
        options: {
            caseSensitive: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: false,
            useShortDoctype: true
        },
        expand: true,
        cwd: '<%= scaffold.build.path %>',
        src: ['**/*.{html,hbs}'],
        dest: '<%= scaffold.build.path %>'
    }
};
