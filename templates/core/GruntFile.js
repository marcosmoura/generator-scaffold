(function () {

    'use strict';

    var path = require('path'),
        loadConfig = require(path.join(__dirname, 'grunt/load')),
        config = {};

    module.exports = function (grunt) {
        config = {
            pkg: grunt.file.readJSON('package.json'),
            scaffold:  {
                dev: {
                    path: 'dev',
                    assets: 'dev/assets',
                    partials: 'dev/partials',
                    templates: 'dev/templates'
                },
                staging: {
                    path: 'staging',
                    assets: 'staging/assets'
                },
                build: {
                    path: 'build',
                    assets: 'build/assets'
                },
                grunt: 'grunt',
                tmp: {
                    path: '.tmp',
                    assets: '.tmp/assets'
                }
            },
            timestamp: '<%= new Date().getTime() %>',
            banner: '/*! <%= pkg.projectName %> - v<%= pkg.version %> - by <%= pkg.developers %> - <%= grunt.template.today("dd/mm/yyyy") %> */\n',
        };

        grunt.util._.extend(config, loadConfig(path.join(__dirname, 'grunt/options/')));

        grunt.initConfig(config);

        require('load-grunt-tasks')(grunt);
        require('time-grunt')(grunt);

        grunt.loadNpmTasks('assemble');

        grunt.loadTasks('grunt/tasks/');
    };

})();
