module.exports = {
    staging: {
        files: {
            '<%= scaffold.staging.assets %>/css/main.css': '<%= scaffold.dev.assets %>/less/main.less'
        },
        options: {
            compress: false,
            yuicompress: false,
            sourceMap: true,
            sourceMapFilename: '<%= scaffold.staging.assets %>/css/main.css.map',
            sourceMapRootpath: '../',
            sourceMapBasepath: '<%= scaffold.dev.path %>/assets',
            sourceMapURL: 'main.css.map'
        }
    },
    build: {
        files: {
            '<%= scaffold.tmp.assets %>/css/main.css': '<%= scaffold.dev.assets %>/less/main.less'
        },
        options: {
            yuicompress: false
        }
    }
};
