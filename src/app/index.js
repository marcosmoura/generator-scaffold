import path from 'path';
import gift from 'gift';
import slug from 'slug';
import mkdirp from 'mkdirp';
import Core from '../core';
import questions from './questions';

export default class ScaffoldGenerator extends Core {

    constructor(...args) {
        super(...args);

        this.option('skip-welcome');
        this.option('sw');
    }

    initTask() {
        this.userOptions = {};

        if (!this.options['skip-welcome'] && !this.options['sw']) {
            this.welcomeMessage('Welcome to Scaffold Generator', 'I will guide you to generate your best workflow. Come with me...');
        }
    }

    promptTask() {
        let done = this.async();

        this.prompt(questions, (answers) => {
            Object.assign(this.userOptions, answers);

            this.logger(' \nGood! Now I will create and install everything you need. Time to take a coffee! \n \n', 'yellow');

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
                    let done = this.async();

                    this.logger('\n \nConfiguring git repository and commiting Scaffold', 'yellow');

                    gift.init('.', (error, repo) => {
                        this.logger('  Init GIT repository', 'green');

                        repository = repo;

                        repository.commit('Add Scaffold', { all: true }, () => {
                            this.logger('  Commiting', 'green');

                            this.spawnCommand('git', ['remote', 'add', 'origin', this.gitUrl]);

                            this.spawnCommand('git', ['config', 'credential.helper', 'store']);

                            repository.remote_push('origin', 'master', () => {
                                this.logger('  Push commits', 'green');

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
        let installGlob = this.spawnCommand('npm', ['install', 'glob']);

        installGlob.on('exit', () => {
            this.logger(' \n \n \n All done and no errors! Enjoy! \n \n \n', 'cyan');

            this.composeWith('scaffold:run', {
                options: {
                    'skip-welcome': true
                }
            });
        });
    }

}
