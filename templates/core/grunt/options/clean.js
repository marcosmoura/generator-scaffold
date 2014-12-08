module.exports = {
    staging: [
        '<%= scaffold.staging.path %>/*',
        '!<%= scaffold.staging.assets %>/**',
        '<%= scaffold.staging.assets %>/*',
        '!<%= scaffold.staging.assets %>/bower',
        '!<%= scaffold.staging.path %>/**/.git',
        '!<%= scaffold.staging.path %>/**/.svn'
    ],
    build: [
        '<%= scaffold.build.path %>',
        '!<%= scaffold.build.path %>/**/.git',
        '!<%= scaffold.build.path %>/**/.svn'
    ],
    tmp: ['<%= scaffold.tmp.path %>']
};
