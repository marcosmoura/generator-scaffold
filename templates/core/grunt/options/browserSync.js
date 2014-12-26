module.exports = {
    bsFiles: {
        src: [
            '<%= scaffold.staging.assets %>/**/*.{css,js,jpg,jpeg,png,gif,json}',
            '<%= scaffold.staging.path %>/**/*.{html,hbs,json,xml,json,png,gif}'
        ]
    },
    options: {
        scrollProportionally: true,
        notify: false,
        logLevel: 'silent',
        server: {
            baseDir: '<%= scaffold.staging.path %>'
        },
        ghostMode: {
            clicks: true,
            scroll: true,
            links: true,
            forms: true
        },
        reloadDelay: 1000,
        port: 9000,
        watchTask: true,
        watchOptions: {
            debounceDelay: 500
        }
    }
};
