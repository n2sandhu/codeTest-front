'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  var modRewrite = require('connect-modrewrite');

  // Define the configuration for all the tasks
  grunt.initConfig({

    bower: {
      install: {
        targetDir: 'libs',
        verbose: true,
        cleanup: true
      }
    },

    clean: ['js/build/', 'libs', 'lib'],

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      styles: {
        files: ['styles/less/*.less', 'styles/less/**/*.less'],
        tasks: ['less'],
        options: {
          livereload: {
            port: 9000
          }
        }
      },
      controllers: {
        files: ['js/src/controllers/*.js'],
        tasks: ['concat:controllers'],
        options: {
          livereload: {
            port: 9000
          }
        }
      },
      html: {
        files: ['*.html', 'views/**/*.html' ],
        options: {
          livereload: {
            port: 9000
          }
        }
      }
    },

    // The actual grunt server settings
    connect: {
      server: {
        options: {
          port: 1337,
          hostname: '',
          livereload: 9000,
          open: true,
          middleware: function(connect, options) {
            var middlewares = [];

            middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));
            options.base.forEach(function(base) {
              middlewares.push(connect.static(base));
            });
            return middlewares;
          }
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          paths: ['styles/less/*/']
        },
        files: {
          'styles/css/styles.css': 'styles/less/styles.less'
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      libs: {
        src: [
          'libs/angular/angular.js',
          'libs/angular-route/angular-route.js'
        ],
        dest: 'js/build/libs.js'
      },
      controllers: {
        src: ['js/src/controllers/*.js', 'js/src/controllers/*/*.js'],
        dest: 'js/build/controllers.js'
      },
      build: {
        src: [
          'js/src/app.js',
          'js/src/lb-services.js',
          'js/build/controllers.js'
        ],
        dest: 'js/build/app.min.js'
      }
    },

    uglify: {
      build: {
        files: {
          'js/build/app.min.js': 'js/build/app.min.js',
          'js/build/libs.min.js': 'js/build/libs.js'
        }
      }
    },

    coveralls: {
      options: {
        debug: true,
        coverage_dir: 'test-coverage',
        dryRun: false,
        force: true,
        recursive: true
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mkdir: {
      js: {
        options: {
          create: ['js/build']
        }
      }
    }

  });

  grunt.registerTask('build', function() {
    grunt.task.run([
      'mkdir:js',
      'clean',
      'bower:install',
      'less',
      'concat:libs',
      'concat:controllers',
      'concat:build',
      'uglify:build'
    ]);
  });

  grunt.registerTask('serve', function() {
    grunt.task.run([
      'clean',
      'mkdir:js',
      'bower:install',
      'concat:libs',
      'concat:controllers',
      'less',
      'connect:server',
      'watch'
    ]);
  });
};
