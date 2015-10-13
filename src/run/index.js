import Core from '../core';

export default class ScaffoldRunGenerator extends Core {

    constructor(...args) {
        super(...args);

        this.option('skip-welcome');

        this.argument('runType', {
            type: String,
            required: false
        });

        this.isBuild = typeof this.runType !== 'undefined' && this.runType.toLowerCase() === 'build';
    }

    initializing() {
        let message = 'Starting development mode. I will start a server with BrowserSync support. :)';

        if (this.isBuild) {
            message = 'Starting build view. I will start a server with BrowserSync support. :)';
        }

        if (!this.options['skip-welcome']) {
            this.welcomeMessage('       Running project       ', message);
        }
    }

    install() {
        this.logger('Installing Bower dependencies...\n', 'yellow');

        this.bowerInstall('', this.async);
    }

    end() {
        this.logger('Running...\n', 'yellow');

        if (this.isBuild) {
            this.spawnCommand('grunt', ['serve'], {
                stdio: 'inherit'
            });

            return false;
        }

        this.spawnCommand('grunt', ['default'], {
            stdio: 'inherit'
        });
    }

}
