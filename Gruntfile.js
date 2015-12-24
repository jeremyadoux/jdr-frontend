module.exports = function (grunt) {
    'use strict';

    var target = grunt.option('target') || 'dev';

    console.log(target);

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerrc: grunt.file.readJSON('.bowerrc'),

        // Path configuration from Gruntfile.js
        dev: {
            'urlApiBackend': 'http://backend.dev',
            'pathToAllFileStatic': '/resources/',
            'vendor': '<%= bowerrc.directory %>',
            'bootstrap': {
                'js': '<%= '+target+'.vendor %>/bootstrap/js',
                'fonts': '<%= '+target+'.vendor %>/bootstrap/fonts',
                'less': '<%= '+target+'.vendor %>/bootstrap/less'
            },
            'webapp': 'webapp/',
            'web': {
                'root': '<%= '+target+'.webapp %>resources/web',
                'css': '<%= '+target+'.webapp %>resources/web/css',
                'less': '<%= '+target+'.webapp %>resources/web/less',
                'js': '<%= '+target+'.webapp %>resources/web/js',
                'fonts': '<%= '+target+'.webapp %>resources/web/fonts',
                'images': '<%= '+target+'.webapp %>resources/web/images',
                'html': '<%= '+target+'.webapp %>resources/web/html',
                'views': '<%= '+target+'.webapp %>resources/views'
            },
            'static': {
                'root': '<%= '+target+'.webapp %>static',
                'css': '<%= '+target+'.webapp %>static/css',
                'images': '<%= '+target+'.webapp %>static/images',
                'fonts': '<%= '+target+'.webapp %>static/fonts',
                'html': '<%= '+target+'.webapp %>static/html',
                'js': '<%= '+target+'.webapp %>static/js'
            }
        },
        production: {
            'urlApiBackend': 'http://backend.petits-papiers.com',
            'pathToAllFileStatic': '/resources/',
            'vendor': '<%= bowerrc.directory %>',
            'bootstrap': {
                'js': '<%= '+target+'.vendor %>/bootstrap/js',
                'fonts': '<%= '+target+'.vendor %>/bootstrap/fonts',
                'less': '<%= '+target+'.vendor %>/bootstrap/less'
            },
            'webapp': 'webapp/',
            'web': {
                'root': '<%= '+target+'.webapp %>resources/web',
                'css': '<%= '+target+'.webapp %>resources/web/css',
                'less': '<%= '+target+'.webapp %>resources/web/less',
                'js': '<%= '+target+'.webapp %>resources/web/js',
                'fonts': '<%= '+target+'.webapp %>resources/web/fonts',
                'images': '<%= '+target+'.webapp %>resources/web/images',
                'html': '<%= '+target+'.webapp %>resources/web/html',
                'views': '<%= '+target+'.webapp %>resources/views'
            },
            'static': {
                'root': '<%= '+target+'.webapp %>static',
                'css': '<%= '+target+'.webapp %>static/css',
                'images': '<%= '+target+'.webapp %>static/images',
                'fonts': '<%= '+target+'.webapp %>static/fonts',
                'html': '<%= '+target+'.webapp %>static/html',
                'js': '<%= '+target+'.webapp %>static/js'
            }
        },

        src: {
            output: {
                'project': {
                    css: {
                        'core': '<%= '+target+'.web.css %>/projectCore.css'
                    },
                    js: '<%= '+target+'.static.js %>/projectCore.js'
                }
            },

            input: {
                less: '<%= '+target+'.web.less %>/projectCore.less',
                js: [
                    '<%= '+target+'.bootstrap.js %>/dropdown.js',
                    '<%= '+target+'.bootstrap.js %>/tooltip.js',
                    '<%= '+target+'.bootstrap.js %>/collapse.js',
                    '<%= '+target+'.bootstrap.js %>/popover.js',
                    '<%= '+target+'.bootstrap.js %>/transition.js',
                    '<%= '+target+'.bootstrap.js %>/carousel.js',
                    '<%= '+target+'.bootstrap.js %>/button.js'
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
                    targetDir: '<%= '+target+'.vendor %>',
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
                    cwd: '<%= '+target+'.web.css %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= '+target+'.static.css %>',
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
                cwd: '<%= '+target+'.web.html %>/',
                src: ['**/*.html'],
                dest: '<%= '+target+'.static.html %>',
                options: {
                    flatten: true,
                    includePath: '<%= '+target+'.web.html %>/include',
                    banner: '<!-- Site built using grunt includes! -->\n'
                }
            }
        },

        copy: {
            scripts: {
                files: [{
                    expand: true,
                    cwd: '<%= '+target+'.web.js %>/',
                    src: ['**/*.js'],
                    dest: '<%= '+target+'.static.js %>'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= '+target+'.web.css %>/',
                    src: ['**/*.css'],
                    dest: '<%= '+target+'.static.css %>'
                }]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= '+target+'.web.images %>',
                        src: ['**'],
                        dest: '<%= '+target+'.static.images %>'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= '+target+'.web.fonts %>',
                        src: ['**'],
                        dest: '<%= '+target+'.static.fonts %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= '+target+'.bootstrap.fonts %>',
                        src: ['**'],
                        dest: '<%= '+target+'.static.fonts %>'
                    }
                ]
            }
        },
        watch: {
            // When a .js or an html file is modified, copy to static dir
            scripts: {
                files: ['<%= '+target+'.web.js %>/**'],
                tasks: ['newer:copy:scripts', 'replace:allJs'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['<%= '+target+'.web.html %>/**'],
                tasks: ['includes:build', 'replace:allHtml'],
                options: {
                    livereload: true
                }
            },
            ftl: {
                files: ['<%= '+target+'.web.views %>/**'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            // When a .less file is modified, compile to css, then minify the project then copy css to static dir
            less: {
                files: ['<%= '+target+'.web.less %>/**', '<%= '+target+'.web.css %>/**'],
                tasks: ['less:project', 'cssmin:project', 'newer:copy:css'
                ],
                options: {
                    livereload: true
                }
            },
            // When an image or a font is modified, copy to static dir
            fontsImages: {
                files: ['<%= '+target+'.web.images %>/**', '<%= '+target+'.web.fonts %>/**'
                ],
                tasks: ['newer:copy:images', 'newer:copy:fonts'],
                options: {
                    livereload: true
                }
            }
        },
        replace: {
            html: {
                src: ['<%= '+target+'.static.html %>/*.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: '@@pathCSS',
                    to: '<%= '+target+'.pathToAllFileStatic %>css'
                }]
            },
            js: {
                src: ['<%= '+target+'.static.html %>/*.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: '@@pathJS',
                    to: '<%= '+target+'.pathToAllFileStatic %>js'
                }]
            },
            vendor: {
                src: ['<%= '+target+'.static.html %>/*.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: '@@pathVendor',
                    to: '<%= '+target+'.pathToAllFileStatic %>vendor'
                }]
            },
            urlApi: {
                src: ['<%= '+target+'.static.js %>/**/*.js'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: '@@urlApiBackend',
                    to: '<%= '+target+'.urlApiBackend %>'
                }]
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
    grunt.loadNpmTasks('grunt-text-replace');
    // Register tasks
    
    grunt.registerTask('copy:project', ['includes:build', 'copy:scripts', 'copy:css', 'copy:fonts', 'copy:images' ]);
    grunt.registerTask('replace:allHtml', ['replace:html', 'replace:js',  'replace:vendor']);
    grunt.registerTask('replace:allJs', ['replace:urlApi']);
    grunt.registerTask('project', ['less:project', 'cssmin:project', 'uglify:project', 'copy:project', 'replace:allHtml', 'replace:allJs' ]);
    // Called when grunt runner is called without args
    // Install Bower dependencies then project task previously defined
    grunt.registerTask('default', ['bower', 'project']);

};