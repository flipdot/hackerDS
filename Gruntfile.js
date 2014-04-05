var commonJsSrcFiles = [
  'client/src/shared/js/jquery.min.js',
  'client/src/shared/js/bootstrap.min.js',
  'client/src/shared/js/angular.min.js'
];

var controllerJsSrcFiles = [
  'client/src/controller/js/controllers.js',
];

var displayJsSrcFiles = [
  'client/src/display/js/controllers.js',
];

var appsLibs = [
  'client/src/shared/js/engine.io.js',
  'client/src/hackerDS/js/messagePipeline.js'
];

var jsTargetFiles = {
  'client/dest/shared/js/common.js': commonJsSrcFiles,
  'client/dest/controller/js/app.js': controllerJsSrcFiles,
  'client/dest/display/js/app.js': displayJsSrcFiles,
  'client/dest/hackerDS/js/hackerDS.js': appsLibs
}

var buildTasks = ['less', 'concat', 'copy'];

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
          default: {
            files: [
              { src: ["client/src/controller/html/index.html"], dest: "client/dest/controller/index.html" },
              { src: ["client/src/display/html/index.html"], dest: "client/dest/display/index.html" },
            ]
          }
        },
        less: {
          default: {
              options: {
                compess: true,
                cleancss: true
              },
              files: {
                'client/dest/controller/css/style.css': 'client/src/controller/less/style.less',
                'client/dest/display/css/style.css': 'client/src/display/less/style.less',
                'client/dest/shared/css/style.css': 'client/src/shared/less/style.less'
              }
          }
        },
        uglify: {
            default: {
                compress: true,
                files: jsTargetFiles
            }
        },
        concat: {
            default: {
              files: jsTargetFiles
            }
        },
        watch: {
            default: {
                files: [
                    'client/src/**'
                ],
                tasks: buildTasks,
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', buildTasks);
    grunt.registerTask('release', ['less', 'uglify']);
};