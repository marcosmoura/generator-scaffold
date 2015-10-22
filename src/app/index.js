import path from 'path';
import gift from 'gift';
import slug from 'slug';
import mkdirp from 'mkdirp';
import Core from '../core';

export default class ScaffoldGenerator extends Core {

    constructor(...args) {
        super(...args);

        this.option('skip-welcome');
    }

    initTask() {
        if (!this.options['skip-welcome']) {
            this.welcomeMessage('Welcome to Scaffold Generator', 'I will guide you to generate your best workflow. Come with me...');
        }
    }

    promptTask() {
        let self = this;
        let done = this.async();
        let questions = [
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
                name: 'projectMember',
                message: 'What are people going to work on this project? (Separated by commas)',
                validate: (input) => {
                    if (input.trim() === '') {

                        return 'You forgot the description. Write here!';
                    }

                    return true;
                }
            },
            {
                type: 'confirm',
                name: 'isSinglePage',
                message: 'Your project will be a single page app?',
                default: 0
            },
            {
                type: 'confirm',
                name: 'component',
                message: 'Do you want to include Angular.js as a framework of your single page app?',
                default: 0,
                when: (answers) => {
                    return answers.isSinglePage;
                }
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
                validate: (input) => {
                    if (input.trim() === '') {

                        return 'Hey. Paste that URL!';
                    }

                    return true;
                }
            }
        ];

        this.prompt(questions, (answers) => {
            /*let components = answers.components;

            for (let answer in answers) {
                self[answer] = answers[answer];
            }

            self.hasAssemble = true;
            self.isSinglePage = false;
            self.needFastclick = false;
            self.createJs = false;

            switch (self.projectType) {
                case choices[0]:
                    self.projectType = 'mobile';
                    self.needFastclick = true;
                    break;

                case choices[1]:
                    self.projectType = 'web';
                    break;

                case choices[2]:
                    self.projectType = 'responsive';
                    self.needFastclick = true;
                    break;

                case choices[3]:
                    self.projectType = 'singlepage';
                    self.isSinglePage = true;
                    self.hasAssemble = false;
                    break;

                case choices[4]:
                    self.projectType = 'singlepage-mobile';
                    self.needFastclick = true;
                    self.isSinglePage = true;
                    self.hasAssemble = false;
                    break;

                case choices[5]:
                    self.projectType = 'singlepage-responsive';
                    self.needFastclick = true;
                    self.isSinglePage = true;
                    self.hasAssemble = false;
                    break;

                default:
                    break;
            }

            self.addModernizr = self.hasComponent('addModernizr', components);
            self.addjQuery = self.hasComponent('addjQuery', components);
            self.addAngular = self.hasComponent('addAngular', components);

            self.globals = JSON.stringify({
                Modernizr: self.addModernizr,
                jQuery: self.addjQuery || self.addAngular,
                angular: self.addAngular
            }, null, 4);

            self.projectSlug = slug(self.projectName.toLowerCase());

            self.pageSlug = 'index';

            self.config.set({
                hasAssemble: self.hasAssemble
            });*/

            self.logger(' \nGood! Now I will create and install everything you need. Time to take a coffee! \n \n', 'yellow');

            done();
        });
    }

    corePath() {
        this.sourceRoot(path.join(__dirname, '../../templates/core/'));
    }

    core() {
        this.fs.copy(
            this.templatePath('grunt/**/*'),
            this.destinationPath('grunt')
        );
    }

    coreFiles() {
        this.fs.copy(
            this.templatePath('bowerrc'),
            this.destinationPath('.bowerrc')
        );
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.fs.copy(
            this.templatePath('gitattributes'),
            this.destinationPath('.gitattributes')
        );
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('htmlhintrc'),
            this.destinationPath('.htmlhintrc')
        );
        this.fs.copyTpl(
            this.templatePath('GruntFile.js'),
            this.destinationPath('GruntFile.js'),
            this,
            this.templateOptions
        );
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            this
        );
    }

    bower() {
        let bower = {
            projectName: this.projectName,
            version: '0.0.0',
            name: slug(this.projectName.toLowerCase()),
            dependencies: {
                jquery: '~2.1.3',
                fastclick: '~1.0.6',
                modernizr: '~2.8.3',
                'normalize-css': '~3.0.2'
            }
        };

        if (this.addAngular) {
            bower.dependencies.angular = '~1.3.14';

            for (let item in this.angularPackages) {
                bower.dependencies[this.angularPackages[item]] = 'latest';
            }
        } else {
            this.fs.delete(
                this.destinationPath('options/ngAnnotate.js')
            );
        }

        if (!this.needFastclick) {
            delete bower.dependencies.fastclick;
        }

        if (!this.addjQuery || !this.addAngular) {
            delete bower.dependencies.jquery;
        }

        this.fs.write(
            this.destinationPath('bower.json'),
            JSON.stringify(bower, null, 2)
        );
    }

    grunt() {
        this.fs.delete(
            this.destinationPath('tasks/build.js')
        );
        this.fs.delete(
            this.destinationPath('tasks/default.js')
        );
        this.fs.delete(
            this.destinationPath('options/watch.js')
        );

        this.fs.copyTpl(
            this.templatePath('grunt/tasks/build.js'),
            this.destinationPath('grunt/tasks/build.js'),
            this
        );

        this.fs.copyTpl(
            this.templatePath('grunt/tasks/default.js'),
            this.destinationPath('grunt/tasks/default.js'),
            this
        );

        this.fs.copyTpl(
            this.templatePath('grunt/options/watch.js'),
            this.destinationPath('grunt/options/watch.js'),
            this,
            this.templateOptions
        );
    }

    assemble() {
        if (this.isSinglePage) {
            this.fs.delete(
                this.destinationPath('grunt/options/assemble.js')
            );
        }
    }

    modernizr() {
        if (!this.addModernizr) {
            this.fs.delete(
                this.destinationPath('grunt/options/modernizr.js')
            );
        }
    }

    devPath() {
        this.sourceRoot(path.join(__dirname, '../../templates/', this.projectType));
    }

    dev() {
        mkdirp.sync('dev');

        if (this.hasAssemble) {
            mkdirp.sync('dev/partials');
        }
    }

    assets() {
        this.fs.copy(
            this.templatePath('../assets/**/*'),
            this.destinationPath('dev/assets')
        );
        mkdirp.sync('dev/assets/img');
    }

    less() {
        this.fs.copy(
            this.templatePath('assets/less/**/*'),
            this.destinationPath('dev/assets/less')
        );
        mkdirp.sync('dev/assets/less/components');
    }

    html() {
        if (this.hasAssemble) {
            this.fs.copyTpl(
                this.templatePath('templates/default.html'),
                this.destinationPath('dev/templates/default.html'),
                this
            );
        }

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('dev/index.html'),
            this
        );
    }

    get install() {
        return {
            setupGit() {
                if (this.hasGit) {
                    let repository;
                    let self = this;
                    let done = self.async();

                    self.logger('\n \nConfiguring git repository and commiting Scaffold', 'yellow');

                    gift.init('.', (error, repo) => {
                        self.logger('  Init GIT repository', 'green');

                        repository = repo;

                        repository.commit('Add Scaffold', { all: true }, () => {
                            self.logger('  Commiting', 'green');

                            self.spawnCommand('git', ['remote', 'add', 'origin', self.gitUrl]);

                            self.spawnCommand('git', ['config', 'credential.helper', 'store']);

                            repository.remote_push('origin', 'master', () => {
                                self.logger('  Push commits', 'green');

                                done();
                            });
                        });
                    });
                }
            },

            install() {
                this.installDependencies({ skipInstall: this.options.skipInstall });
            }
        };
    }

    end() {
        let self = this;
        let installGlob = self.spawnCommand('npm', ['install', 'glob']);

        installGlob.on('exit', () => {
            self.logger(' \n \n \n All done and no errors! Enjoy! \n \n \n', 'cyan');

            self.composeWith('scaffold:run', {
                options: {
                    'skip-welcome': true
                }
            });
        });
    }

}
