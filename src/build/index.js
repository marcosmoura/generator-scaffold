import Core from '../core';

export default class thisGenerator extends Core {

    constructor(...args) {
        super(...args);

        this.option('skip-welcome');
    }

    initializing() {
        if (!this.options['skip-welcome']) {
            this.welcomeMessage('       Generating Build      ', 'Wait until build finish. I will create a zip file with all contents of your project. \nChoose below if this build means a new version and what type.');
        }
    }

    prompting() {
        let self = this;
        let done = this.async();
        let prompts = [{
            type: 'confirm',
            name: 'bumpVersion',
            message: 'This build will increase a version of your project?',
            default: 0
        }, {
            type: 'list',
            name: 'bumpType',
            message: 'What kind of version?',
            choices: ['Just a fix (Ex: 0.0.1)', 'Minor Version (Ex: 0.1.0)', 'Major Version (Ex: 1.0.0)', 'Pre-release (Ex: 1.0.0-1)'],
            default: 0,
            when: (answers) => {
                return answers.bumpVersion;
            }
        }];

        this.prompt(prompts, (props) => {
            for (let item in props) {
                self[item] = props[item];
            }

            self.log(' \n Perfect! \n \n', 'yellow');

            done();
        });
    }

    writing() {
        if (this.bumpVersion) {
            let done = this.async();
            let version = 'patch';

            if (this.bumpType === 'Minor Version (Ex: 0.1.0)') {
                version = 'minor';
            } else if (this.bumpType === 'Major Version (Ex: 1.0.0)') {
                version = 'major';
            } else if (this.bumpType === 'Pre-release (Ex: 1.0.0-1)') {
                version = 'prerelease';
            }

            this.spawnCommand('grunt', ['bump:' + version]).on('exit', done);
        }
    }

    install() {
        let done = this.async();

        this.spawnCommand('grunt', ['build']).on('exit', done);
    }

    end() {
        this.log('\n \n All done! Everything looks fine. Good job! \n \n', 'yellow');
    }

}
