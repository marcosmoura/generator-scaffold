module.exports = {
    files: [
        'Gruntfile.js',
        '<%= scaffold.dev.assets %>/js/**/*.js',
        '<%= scaffold.grunt %>/**/*.js'
    ],
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    }
};
