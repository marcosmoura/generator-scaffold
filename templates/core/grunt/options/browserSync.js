module.exports = {
    options: {
            notify: false,
            logLevel: 'silent',
            port: 9000,
            ghostMode: {
                clicks: true,
                scroll: true,
                links: true,
                forms: true
            },
            ui: {
                port: 9001,
                weinre: {
                    port: 9002
                }
            },
            watchTask: true,
            watchOptions: {
                debounceDelay: 500
            }
    },
    staging: {
        bsFiles: {
            src: [
                '<%= scaffold.staging.assets %>/**/*.{css,js,jpg,jpeg,png,gif,json}',
                '<%= scaffold.staging.path %>/**/*.{html,hbs,json,xml,json,png,gif}'
            ]
        },
        options: {
            server: {
                baseDir: '<%= scaffold.staging.path %>'
            }
        }
    },
    build: {
        bsFiles: {
            src: [
                '<%= scaffold.build.assets %>/**/*.{css,js,jpg,jpeg,png,gif,json}',
                '<%= scaffold.build.path %>/**/*.{html,hbs,json,xml,json,png,gif}'
            ]
        },
        options: {
            server: {
                baseDir: '<%= scaffold.build.path %>'
            }
        }
    }
};
