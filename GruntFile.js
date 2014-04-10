'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: [
                'Gruntfile.js',
                'app/index.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            scripts: {
                files: [
                    'app/*.js'
                ],
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jshint', 'watch']);

};
