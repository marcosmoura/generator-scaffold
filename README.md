[![NPM version](http://img.shields.io/npm/v/generator-scaffold.svg?style=flat)](http://npmjs.org/generator-scaffold)
[![NPM downloads](http://img.shields.io/npm/dm/generator-scaffold.svg?style=flat)](http://npmjs.org/generator-scaffold)
[![License Tyoe](http://img.shields.io/npm/l/generator-scaffold.svg?style=flat)](http://npmjs.org/generator-scaffold)
[![Dependency Status](http://img.shields.io/david/marcosmoura/generator-scaffold.svg?style=flat)](https://david-dm.org/marcosmoura/generator-scaffold)
[![Build Status](http://img.shields.io/travis/marcosmoura/generator-scaffold/master.svg?style=flat)](https://travis-ci.org/marcosmoura/generator-scaffold)


# Scaffold

![Yeoman + Grunt + Bower](http://marcosmoura.com/yeoman-grunt-bower.png)


## Introduction

Scaffold is a generator to automate the most common tasks in day-to-day of a Front End project. He uses some tools like [Yeoman](http://yeoman.io/), [Grunt](http://gruntjs.com/) e [Bower](http://bower.io/).
This generator is all-in-one and have five versions: Mobile, Web, Responsive, Single Page and Single Page Mobile. So you don't need to download each version to scaffolding your project. Just select which version is perfect for you and let the generator do all the stuff.


## Features

* Built-in preview server with cross device Browser Sync
* HTML Templating
* CSS Autoprefixing
* Automatically compile LESS
* Automatically lint javascript
* Automatically wire up your Bower components
* Image Optimization
* Leaner Modernizr builds
* Minify HTML, XML, CSS and JS
* Configure a new git repository (optional)
* Increase the project version (optional)
* And more...


## Getting Started

*If you are new to Yeoman, you will find a lot of answers to your questions in their [getting started guide](http://yeoman.io/learning/).

* Install: `npm install -g generator-scaffold`
* To init your project: `yo scaffold` and follow all the steps on the screen.
* To start the server and develop your app: `yo scaffold:start`
* To generate a build: `yo scaffold:build`

![Scaffold](http://marcosmoura.com/scaffold.png)


## Install dependencies from a existent project

If a previous project was built using Scaffold you will need to install all dependencies locally to run. For this you just need to execute `yo scaffold:install` and the generator will install all NPM packages and all Bower dependencies.


## Automate the creation of pages

The Scaffold has a sub generator to help you to create files more quickly. 
Just execute `yo scaffold:create` and follow the steps to generate a new blank page, with a new .less and .js (optional). Only works with non single page projects.


## Grunt tasks

This generator make use of various tools to improve your web development workflow when using Grunt:
* [assemble](https://github.com/assemble/assemble) for HTML templating
* [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) for autoprefixing CSS
* [grunt-browser-sync](https://github.com/shakyShane/browser-sync) for awesome cross device browser synchronization
* [grunt-bump](https://github.com/vojtajina/grunt-bump) for increase version of your project (package.json and bower.json)
* [grunt-combine-media-queries](https://github.com/buildingblocks/grunt-combine-media-queries) for combine all possible duplicated media queries on build
* [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) for minify HTML
* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) for lint your scripts
* [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less) for compile your LESS into CSS
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) for minify your scripts
* [grunt-csso](https://github.com/t32k/grunt-csso) for a better minify of CSS
* [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint) for lint your HTML
* [grunt-image-embed](https://github.com/ehynds/grunt-image-embed) for convert your CSS background images into BASE64 (Only if this image is under 20kb)
* [grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) for image optimizing
* [grunt-modernizr](https://github.com/Modernizr/grunt-modernizr) for leaner Modernizr build
* [grunt-newer](https://github.com/tschaub/grunt-newer) for faster copy all the files
* [grunt-notify](https://github.com/dylang/grunt-notify) for notify on your desktop for errors on your code
* [grunt-prettify](https://github.com/jonschlinkert/grunt-prettify) for prettify the stage code
* [grunt-recess](https://github.com/sindresorhus/grunt-recess) for lint your css
* [grunt-rev](https://github.com/cbas/grunt-rev) for file rev (cache busting)
* [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin) for optimize your SVG files
* [grunt-usemin](https://github.com/yeoman/grunt-usemin) for concat, minify and replace CSS and JS referencies on HTML
* [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep) for inject Bower packages into your HTML
* and some others tasks to make scaffold a great generator.


## Folder structure

The Scaffold uses some default folders to work. These folders follow a pattern and cannot be renamed.

![Folder Structure](https://s3.amazonaws.com/f.cl.ly/items/1N3T2s1D0Q3h3C1E002m/Screen%20Shot%202014-12-08%20at%2020.19.37.png)

* **dev**: All development files without any compression, including HTML templates, images, LESS files and JS.

* **staging**: All stage files. Everytime that you start the server, the Scaffold generator will generate all needed files for view in browser. That is the version of your project without any optimization. The code you see on the browser is exactly the same inside this folder. Is important that you do not delete this because bower put all dependencies inside this folder.

* **build**: Every build that you do the generator put all files on this folder. These files were highly optimized using several Grunt tasks and are ready to be published on your web server.

* **grunt**: The core of Scaffold. All tasks and options used for Grunt. Is highly recommended that you do not modify this files. 

## License

MIT
