module.exports = {
    options: {
        exclude: ['modernizr']
    },
    staging: {
        src: ['<%= scaffold.staging.path %>/**/*.html']
    },
    build: {
        src: ['<%= scaffold.build.path %>/**/*.html']
    }
};
