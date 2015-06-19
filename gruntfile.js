/**
 * Created with IntelliJ IDEA.
 * User: jose.hillers
 * Date: 18/09/2014
 * Time: 20:31
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask("default", ['browserify', 'uglify', 'copy']);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        karma: {
            init: {
                configFile: "karma.conf.js"
            }
        },
        browserify: {
            js: {
                src: './src/index.js',
                dest: './src/bundle.js'
            },
            test: {
                src: './tests/BasicSpec.js',
                dest: './tests/bundle.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js', 'src/**/*.js'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['src/bundle.min.js'], dest: 'out/', flatten: true},
                    {expand: true, src: ['src/index.html'], dest: 'out/', flatten: true},
                    {expand: true, src: ['img*//**'], dest: 'out/'},
                    {expand: true, src: ['css*//**'], dest: 'out/'},
                    {expand: true, src: ['data*//**'], dest: 'out/'}
                    /*{expand: true, src: ['out*//*'], dest: '/localhost/three-essentials/',flatten:true}*/

                    /* // includes files within path and its sub-directories
                     {expand: true, src: ['path*//**'], dest: 'dest/'},

                 // makes all src relative to cwd
                 {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                 // flattens results to a single level
                 {expand: true, flatten: true, src: ['path*//**'], dest: 'dest/', filter: 'isFile'},*/
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    './out/bundle.min.js': ['./src/bundle.js']
                },
                options: {
                    beautify: true,
                    mangle: false,
                    compress:false
                }
            }

        }
    });
};

