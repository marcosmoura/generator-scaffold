module.exports = {
    build: {
        options: {
            log: 'true'
        },
        files: {
            '<%= scaffold.tmp.assets %>/css/': ['<%= scaffold.tmp.assets %>/css/**/*.css']
        }
    }
};
