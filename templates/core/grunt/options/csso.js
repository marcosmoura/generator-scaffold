module.exports = {
    build: {
        options: {
            report: 'min'
        },
        files: {
            '<%= scaffold.tmp.path %>/concat/assets/css/main.css': ['<%= scaffold.tmp.path %>/concat/assets/css/main.css']
        }
    }
};
