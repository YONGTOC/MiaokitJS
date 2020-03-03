module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.util.linefeed = '\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner:
            '/*!\n'+
            ' * uEvent <%= pkg.version %> - to make any js object an event emitter\n'+
            ' * Copyright 2011 Jerome Etienne (http://jetienne.com)\n'+
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> Damien "Mistic" Sorel (http://www.strangeplanet.fr)\n'+
            ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n'+
            ' */',

        // compress js
        uglify: {
            options: {
                banner: '<%= banner %>\n'
            },
            dist: {
                files: {
                    'uevent.min.js': ['uevent.js']
                }
            }
        },

        // jshint tests
        jshint: {
            lib: {
                src: ['uevent.js']
            }
        },

        // Mocha tests
        mochaTest: {
            options: {
                log: true
            },
            lib: {
                src: ['tests/*.js']
            }
        }
    });

    grunt.registerTask('default', [
        'uglify'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'mochaTest'
    ]);
};
