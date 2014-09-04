module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        jshint: {
            files: [
                'Gruntfile.js',
                'generators/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: [
                    'generators/**/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['watch']);

};
