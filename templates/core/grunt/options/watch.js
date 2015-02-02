module.exports = {
    options: {
        spawn: false
    },
    bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
    },
    grunt: {
        files: ['<%= scaffold.grunt %>/**/*.js'],
        tasks: ['newer:jshint']
    },
    gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['newer:jshint']
    },
    js: {
        files: ['<%= scaffold.dev.assets %>/js/**/*.js'],
        tasks: ['newer:jshint']
    },
    json: {
        files: ['<%= scaffold.dev.assets %>/**/*.json'],
        tasks: ['newer:jsonlint']
    },
    less: {
        files: ['<%= scaffold.dev.assets %>/less/**/*'],
        tasks: [
            'less:staging',
            'newer:copy:less',
            'autoprefixer:staging',
            'recess'
        ],
        options: {
            nospaces: true
        }
    },
    css: {
        files: ['<%= scaffold.dev.assets %>/css/**/*'],
        tasks: [
            'autoprefixer:staging',
            'recess'
        ]
    },
    html: {
        files: [
            '<%= scaffold.dev.path %>/**/*.{html,hbs}',
            '!<%= scaffold.dev.path %>/{templates,partials}/**/*.html'
        ],
        tasks: [<# if (!isSinglePage) { #>
            'newer:assemble:staging',<# } #> <# if (isSinglePage) { #>
            'newer:copy:stagingHtml',<# } #>
            'newer:htmlhint',
            'wiredep:staging',
            'newer:prettify'
        ]
    },
    htmlTemplate: {
        files: ['<%= scaffold.dev.path %>/{templates,partials}/**/*.html'],
        tasks: [<# if (!isSinglePage) { #>
            'assemble:staging',<# } #> <# if (isSinglePage) { #>
            'copy:stagingHtml',<# } #>
            'wiredep:staging',
            'htmlhint',
            'prettify'
        ]
    },
    files: {
        files: [
            '<%= scaffold.dev.path %>/**/*',
            '!<%= scaffold.dev.assets %>/less/**/*',
            '!<%= scaffold.dev.path %>/**/*.{html,hbs}'
        ],
        tasks: ['newer:copy:staging']
    }
};
