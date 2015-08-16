module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerrc: grunt.file.readJSON('.bowerrc'),

        // Path configuration from Gruntfile.js
        dirs: {
            'vendor': '<%= bowerrc.directory %>',
            'bootstrap': {
                'js': '<%= dirs.vendor %>/bootstrap/js',
                'fonts': '<%= dirs.vendor %>/bootstrap/fonts',
                'less': '<%= dirs.vendor %>/bootstrap/less'
            },
            'webapp': 'webapp/',
            'web': {
                'root': '<%= dirs.webapp %>resources/web',
                'css': '<%= dirs.webapp %>resources/web/css',
                'less': '<%= dirs.webapp %>resources/web/less',
                'js': '<%= dirs.webapp %>resources/web/js',
                'fonts': '<%= dirs.webapp %>resources/web/fonts',
                'images': '<%= dirs.webapp %>resources/web/images',
                'html': '<%= dirs.webapp %>resources/web/html',
                'views': '<%= dirs.webapp %>resources/views'
            },
            'static': {
                'root': '<%= dirs.webapp %>static',
                'css': '<%= dirs.webapp %>static/css',
                'images': '<%= dirs.webapp %>static/images',
                'fonts': '<%= dirs.webapp %>static/fonts',
                'html': '<%= dirs.webapp %>static/html',
                'js': '<%= dirs.webapp %>static/js'
            }
        },

        src: {
            output: {
                'project': {
                    css: {
                        'core': '<%= dirs.web.css %>/projectCore.css'
                    },
                    js: '<%= dirs.static.js %>/projectCore.js'
                }
            },

            input: {
                less: '<%= dirs.web.less %>/projectCore.less',
                js: [
                    '<%= dirs.bootstrap.js %>/dropdown.js',
                    '<%= dirs.bootstrap.js %>/tooltip.js',
                    '<%= dirs.bootstrap.js %>/collapse.js',
                    '<%= dirs.bootstrap.js %>/popover.js',
                    '<%= dirs.bootstrap.js %>/transition.js',
                    '<%= dirs.bootstrap.js %>/carousel.js',
                    '<%= dirs.bootstrap.js %>/button.js'
                ]
            }
        },

        // Banner ajouté dans le fichier minifié
        banner: '/*!\n' +
            ' * Project v<%= pkg.version %>\n' +
            ' * Grunt uglified, copied and minified\n' +
            ' */\n',



        /********************************** Task **********************************/
        // Bower
        bower: {
            install: {
                options: {
                    targetDir: '<%= dirs.vendor %>',
                    cleanTargetDir: true,
                    layout: 'byComponent',
                    install: true,
                    copy: false,
                    verbose: true
                }
            }
        },


        // LESS
        less: {
            project: {
                options: {
                    compress: false,
                    cleancss: false,
                    report: 'gzip',
                    strictImports: true
                },
                files: {
                    '<%= src.output.project.css.core %>': '<%= src.input.less %>'
                }
            },
            project_debug: {
                options: {
                    compress: false,
                    cleancss: false,
                    report: 'none',
                    strictImports: true
                },
                files: {
                    '<%= src.output.project.css.core %>': '<%= src.input.less %>'
                }
            }
        },

        // CSSmin
        cssmin: {
            project: {
                options: {
                    report: 'gzip',
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.web.css %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= dirs.static.css %>',
                    ext: '.min.css'
                }]
            }
        },


        // Uglify
        uglify: {
            project: {
                options: {
                    report: 'gzip',
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= src.output.project.js %>': '<%= src.input.js %>'
                }
            }
        },

        includes : {
            build: {
                cwd: '<%= dirs.web.html %>/',
                src: ['**/*.html'],
                dest: '<%= dirs.static.html %>',
                options: {
                    flatten: true,
                    includePath: '<%= dirs.web.html %>/include',
                    banner: '<!-- Site built using grunt includes! -->\n'
                }
            }
        },

        copy: {
            scripts: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.web.js %>/',
                    src: ['**/*.js'],
                    dest: '<%= dirs.static.js %>'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.web.css %>/',
                    src: ['**/*.css'],
                    dest: '<%= dirs.static.css %>'
                }]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.web.images %>',
                        src: ['**'],
                        dest: '<%= dirs.static.images %>'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.web.fonts %>',
                        src: ['**'],
                        dest: '<%= dirs.static.fonts %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.bootstrap.fonts %>',
                        src: ['**'],
                        dest: '<%= dirs.static.fonts %>'
                    }
                ]
            }
        },
        watch: {
            // When a .js or an html file is modified, copy to static dir
            scripts: {
                files: ['<%= dirs.web.js %>/**'],
                tasks: ['newer:copy:scripts'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['<%= dirs.web.html %>/**'],
                tasks: ['includes:build'],
                options: {
                    livereload: true
                }
            },
            ftl: {
                files: ['<%= dirs.web.views %>/**'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            // When a .less file is modified, compile to css, then minify the project then copy css to static dir
            less: {
                files: ['<%= dirs.web.less %>/**', '<%= dirs.web.css %>/**'],
                tasks: ['less:project', 'cssmin:project', 'newer:copy:css'
                ],
                options: {
                    livereload: true
                }
            },
            // When an image or a font is modified, copy to static dir
            fontsImages: {
                files: ['<%= dirs.web.images %>/**', '<%= dirs.web.fonts %>/**'
                ],
                tasks: ['newer:copy:images', 'newer:copy:fonts'],
                options: {
                    livereload: true
                }
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-includes');
    // Register tasks
    
    grunt.registerTask('copy:project', ['includes:build', 'copy:scripts', 'copy:css', 'copy:fonts', 'copy:images' ]);

    grunt.registerTask('project', ['less:project', 'cssmin:project', 'uglify:project', 'copy:project' ]);
    // Called when grunt runner is called without args
    // Install Bower dependencies then project task previously defined
    grunt.registerTask('default', ['bower', 'project']);

};