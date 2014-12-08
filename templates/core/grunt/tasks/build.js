module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:build',<% if (isSinglePage) { %>
        'buildHtml:build',<% } %>
        'less:build',
        'cmq',
        'autoprefixer:build',
        'svgmin',
        'json-minify',<% if (!isSinglePage) { %>
        'assemble:build',<% } %>
        'modernizr',
        'wiredep:build',
        'useminPrepare',
        'concat',
        'uglify',
        'csso',
        'copy:build',
        'cssmin',
        'imageoptim',
        'imageEmbed',
        'rev',
        'usemin',
        'htmlmin',
        'compress',
        'clean:tmp'
    ]);
};
