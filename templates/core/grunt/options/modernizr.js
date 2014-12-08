module.exports = {
    build: {
        devFile: '<%= scaffold.staging.assets %>/bower/modernizr/modernizr.js',
        outputFile: '<%= scaffold.tmp.assets %>/bower/modernizr/modernizr.js',
        matchCommunityTests: true,
        files: {
            src: [
                '<%= scaffold.staging.assets %>/css/**/*.css',
                '<%= scaffold.staging.assets %>/js/**/*.js'
            ]
        }
    }
};
