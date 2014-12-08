module.exports = function (grunt) {

    'use strict';

    var jsFiles = [
        'Gruntfile.js',
        'generators/**/*.js'
    ];

    grunt.initConfig({
        jshint: {
            files: jsFiles,
            options: {
                jshintrc: '.jshintrc'
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                commit: false,
                createTag: false,
                push: false
            }
        },
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: jsFiles,
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['watch']);

};
