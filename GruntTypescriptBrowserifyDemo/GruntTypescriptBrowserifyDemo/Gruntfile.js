module.exports = function (grunt) {
    'use strict';


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    //TODO
    //1. use the grunt-contrib-watch



    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Cleans directories
        clean: {
            dist: [
                'dist/**/*'
            ],
            tmp: [
                'tmp/**/*'
            ]
        },

        // Typescript transpiler (Typescript to JS)
        ts: {
            options: {
                fast: 'never',
                target: 'es5',
                module: 'commonjs',
                sourceMap: true
            },
            index: {
                src: ['./src/index.ts'],
                outDir: './tmp'
            }
        },

        // Package 
        browserify: {
            './dist/app.js': ['./tmp/*.js', './src/Jquery/jquery.js']
        },


        // Minify 
        uglify: {
            //options: {
            //    mangle: {
            //        except: ['$', 'require', 'exports'],
            //    }
            //},
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'path/to/sourcemap.map'
                },
                files: {
                    './dist/app.js': ['./dist/app.js']
                }
            }
        }


    });

    // setup default task to run dev task 
    grunt.registerTask('default', ['dev']);

    // +++++++++++++++++++++++++++++++++++++++++++
    // Prod task
    // +++++++++++++++++++++++++++++++++++++++++++
    // 1. Cleans directories
    // 2. Runs typescript transpiling task
    // 3. Package using Browserify
    // 4. Minify using Uglify
    grunt.registerTask('prod', [
		'clean',
		'ts:index',
        'browserify',
        'uglify'
    ]);


    // +++++++++++++++++++++++++++++++++++++++++++
    // Dev task
    // +++++++++++++++++++++++++++++++++++++++++++
    // 1. Cleans directories
    // 2. Runs typescript transpiling task
    // 3. Package using Browserify
    grunt.registerTask('dev', [
       'clean',
       'ts:index',
       'browserify'
    ]);

};