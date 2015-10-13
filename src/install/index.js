import Core from '../core';

export default class thisGenerator extends Core {

    constructor(...args) {
        super(...args);

        this.option('skip-welcome');
    }

    initializing() {
        if (!this.options['skip-welcome']) {
            this.welcomeMessage('     Install Dependencies    ', 'I will install all NPM and Bower dependencies. This may take a while. Go grab a coffee!');
        }
    }

    install() {
        this.installDependencies({ skipInstall: this.options.skipInstall });
    }

    end() {
        let self = this;
        let installGlob = this.spawnCommand('npm', ['install', 'glob']);

        installGlob.on('exit', () => {
            self.log(' \n \n All done and no errors! Enjoy! \n \n', 'cyan');

            self.composeWith('scaffold:run', {
                options: {
                    'skip-welcome': true
                }
            });
        });
    }

}
