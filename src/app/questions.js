export default [
    {
        name: 'projectName',
        message: 'What is the name of your project?',
        validate: (input) => {
            if (input.trim() === '') {
                return 'Hey dude! You forgot to enter the project name!';
            }

            return true;
        }
    },
    {
        name: 'projectDescription',
        message: 'What is the description?',
        validate: (input) => {
            if (input.trim() === '') {
                return 'You forgot the description. Write here!';
            }

            return true;
        }
    },
    {
        name: 'projectMembers',
        message: 'What people are working on this project? (Separated by commas)',
        validate: (input) => {
            if (input.trim() === '') {
                return 'It\'s only you? Type your name then...';
            }

            return true;
        }
    },
    {
        name: 'isSinglePage',
        type: 'confirm',
        message: 'Your project will be a single page app?',
        default: 1
    },
    {
        name: 'hasAngular',
        type: 'confirm',
        message: 'Do you want to include Angular.js as a framework of your single page app?',
        default: 0,
        when: (answers) => {
            return answers.isSinglePage;
        }
    },
    {
        name: 'angularModules',
        type: 'checkbox',
        message: 'What additional modules of Angular you want to include?',
        choices: () => {
            let angularPackages = [
                'angular-animate',
                'angular-aria',
                'angular-cookies',
                'angular-loader',
                'angular-material',
                'angular-messages',
                'angular-mocks',
                'angular-resource',
                'angular-route',
                'angular-sanitize',
                'angular-translate',
                'angular-touch',
                'ui-router'
            ];
            let choices = [];

            angularPackages.forEach(function(item) {
                choices.push({
                    value: item,
                    name: item,
                    checked: false
                });
            });

            return choices;
        },
        when: (answers) => {
            answers.hasjQuery = false;

            return answers.hasAngular;
        }
    },
    {
        name: 'hasjQuery',
        type: 'confirm',
        message: 'Do you like to add jQuery?',
        default: 1,
        when: (answers) => {
            return !answers.hasAngular && answers.isSinglePage;
        }
    },
    {
        name: 'hasES6',
        type: 'confirm',
        message: 'Do you want to write your Javascript in a beautiful ES6 syntax?',
        default: 0
    },
    {
        type: 'confirm',
        name: 'hasGit',
        message: 'Do you like to configure and init a git repository?',
        default: 0
    },
    {
        name: 'gitUrl',
        message: 'What is the git repository of the project? (Paste repository URL)',
        when: (answers) => {
            return answers.hasGit;
        },
        filter: (input) => {
            if (input.trim() === '') {
                return false;
            }

            return input;
        }
    }
];
