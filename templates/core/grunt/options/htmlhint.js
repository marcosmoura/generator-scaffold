module.exports = {
    staging: {
        options: {
            htmlhintrc: '.htmlhintrc',
            force: true
        },
        src: [
            '<%= scaffold.staging.path %>/**/*.html',
            '!<%= scaffold.staging.assets %>/bower/**/*.html'
        ]
    }
};
