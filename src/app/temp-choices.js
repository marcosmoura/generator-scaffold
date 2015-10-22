[
    {
        type: 'checkbox',
        name: 'components',
        message: 'What components do you like to include?',
        choices: [
            {
                name: 'Modernizr',
                value: 'addModernizr',
                checked: true
            }, {
                name: 'jQuery',
                value: 'addjQuery',
                checked: false
            }, {
                name: 'Angular',
                value: 'addAngular',
                checked: false
            }
        ]
    }, {
        type: 'checkbox',
        name: 'angularPackages',
        message: 'What additional modules of Angular you want to include?',
        when: (answers) => {
            return self.hasComponent('addAngular', answers.components);
        },
        choices: [{
            name: 'angular-animate',
            value: 'angular-animate',
            checked: true
        }, {
            name: 'angular-cookies',
            value: 'angular-cookies',
            checked: true
        }, {
            name: 'angular-loader',
            value: 'angular-loader',
            checked: false
        }, {
            name: 'angular-resource',
            value: 'angular-resource',
            checked: false
        }, {
            name: 'angular-sanitize',
            value: 'angular-sanitize',
            checked: false
        }, {
            name: 'angular-touch',
            value: 'angular-touch',
            checked: false
        }, {
            name: 'ui-router',
            value: 'ui-router',
            checked: true
        }]
    }
];
