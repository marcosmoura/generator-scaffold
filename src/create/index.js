import slug from 'slug';
import path from 'path';
import fs from 'fs';
import Core from '../core';

export default class thisGenerator extends Core {

    constructor(...args) {
        super(...args);

        this.mainPath = '',
        this.main = '';
        this.option('skip-welcome');

        if (!this.config.get('hasAssemble')) {
            this.logger('This sub generator won\'t work with a single file project. Aborting...', 'red');

            process.exit();
        }
    }

    initializing() {
        if (!this.options['skip-welcome']) {
            this.welcomeMessage('        Creating Page        ', 'This is a guide to create a new page for assemble template. It also include a less file.');
        }
    }

    promptTask() {
        let self = this;
        let done = this.async();
        let prompts = [{
            name: 'projectName',
            message: 'Page name:',
            validate: (input) => {
                self.validatePrompt({
                    done: this.async(),
                    input: input,
                    message: 'Hey dude! You forgot to enter the page name!'
                });
            }
        }, {
            name: 'projectDescription',
            message: 'Page description:',
            validate: (input) => {
                self.validatePrompt({
                    done: this.async(),
                    input: input,
                    message: 'Hey dude! You forgot to enter the project Description!'
                });
            }
        }, {
            type: 'confirm',
            name: 'createJs',
            message: 'Do you like to create a JS file for this page?',
            default: 1
        }];

        this.prompt(prompts, (answers) => {
            for (let answer in answers) {
                self[answer] = answers[answer];
            }

            self.pageSlug = slug(self.projectName);

            self.logger(' \nGood! Now I will create all files. Wait a sec. \n \n', 'yellow');

            done();
        });
    }

    html() {
        this.sourceRoot(path.join(__dirname, '../../templates/web'));

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('dev/' + this.pageSlug + '.html'),
            this
        );
    }

    css() {
        this.sourceRoot(path.join(__dirname, '../../templates/assets/less/pages'));

        this.fs.copy(
            this.templatePath('index.less'),
            this.destinationPath('dev/assets/less/pages/' + this.pageSlug + '.less')
        );

        this.mainPath = this.destinationPath('dev/assets/less/main.less');

        this.main = this.fs.read(this.mainPath);
    }

    main() {
        fs.unlinkSync(this.mainPath);

        this.main += '@import \'pages/' + this.pageSlug + '\';\n';

        this.fs.write(this.mainPath, this.main);
    }

    js() {
        if (this.createJs) {
            this.sourceRoot(path.join(__dirname, '../../templates/assets/js'));

            this.fs.copy(
                this.templatePath('main.js'),
                this.destinationPath('dev/assets/js/pages/' + this.pageSlug + '.js')
            );
        }
    }

    end() {
        this.logger('\n \n All done! \n \n', 'yellow');

        this.composeWith('scaffold:run', {
            options: {
                'skip-welcome': true
            }
        });
    }

}
