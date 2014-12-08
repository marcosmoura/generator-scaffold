module.exports = {
    files: [
        'Gruntfile.js',
        '<%%= scaffold.dev.assets %>/js/**/*.js',
        '<%%= scaffold.grunt %>/**/*.js',
        '!<%%= scaffold.dev.assets %>/js/vendor/**/*'
    ],
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    }
};
