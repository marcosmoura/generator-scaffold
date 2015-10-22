import 'babel/polyfill';
import chalk from 'chalk';
import { Base } from 'yeoman-generator';

export default class ScaffoldCore extends Base {

    constructor(...args) {
        super(...args);

        this.templateOptions = {
            delimiter: '#'
        };
    }

    logger(log, color) {
        this.log(chalk[color](log));
    }

    welcomeMessage(title, message) {
        this.logger('\t \t  ___           __  __     _    _ ', 'cyan');
        this.logger('\t \t / __| __ __ _ / _|/ _|___| |__| |', 'cyan');
        this.logger('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |', 'cyan');
        this.logger('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_| \n', 'cyan');
        this.logger('\t \t [ ' + title + ' ] \n \n', 'cyan');
        this.logger(message + ' \n \n', 'green');
    }

    validatePrompt(validate) {
        if (validate.input.trim() === '') {
            validate.done(validate.message);

            return;
        }

        validate.done();
    }

    hasComponent(component, components) {
        return components && components.indexOf(component) !== -1;
    }

}
