module.exports = {
    staging: {
        src: ['<%= scaffold.staging.assets %>/css/**/*.css']
    },
    options: {
        noIDs: true,
        noJSPrefix: true,
        noOverqualifying: false,
        noUnderscores: true,
        noUniversalSelectors: false,
        prefixWhitespace: true,
        strictPropertyOrder: false,
        zeroUnits: true
    }
};
