module.exports = function (grunt) {
    grunt.registerTask('default', [
        'clean:staging',
        'copy:staging',
        'less:staging',
        'autoprefixer:staging',<% if (!isSinglePage) { %>
        'assemble:staging',<% } %><% if (isSinglePage) { %>
        'newer:copy:stagingHtml',<% } %>
        'prettify',
        'wiredep:staging',
        'browserSync:staging',
        'watch'
    ]);
};
