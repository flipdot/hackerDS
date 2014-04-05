var commonJsSrcFiles = [
  'apps/HackerDSCore/clientSrc/shared/js/jquery.min.js',
  'apps/HackerDSCore/clientSrc/shared/js/bootstrap.min.js',
  'apps/HackerDSCore/clientSrc/shared/js/angular.min.js'
];

var controllerJsSrcFiles = [
  'apps/HackerDSCore/clientSrc/controller/js/controllers.js',
];

var displayJsSrcFiles = [
  'apps/HackerDSCore/clientSrc/display/js/controllers.js',
];

var appsLibs = [
  'apps/HackerDSCore/clientSrc/shared/js/socket.io.js',
  'apps/HackerDSCore/clientSrc/hackerDS/js/hackerDS.js'
];

var jsTargetFiles = {
  'apps/HackerDSCore/client/shared/js/common.js': commonJsSrcFiles,
  'apps/HackerDSCore/client/controller/js/app.js': controllerJsSrcFiles,
  'apps/HackerDSCore/client/display/js/app.js': displayJsSrcFiles,
  'apps/HackerDSCore/client/hackerDS/js/hackerDS.js': appsLibs
}

var buildTasks = ['less', 'concat', 'copy'];

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
          default: {
            files: [
              { src: ["apps/HackerDSCore/clientSrc/controller/html/index.html"], dest: "apps/HackerDSCore/client/controller/index.html" },
              { src: ["apps/HackerDSCore/clientSrc/display/html/index.html"], dest: "apps/HackerDSCore/client/display/index.html" },
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
                'apps/HackerDSCore/client/controller/css/style.css': 'apps/HackerDSCore/clientSrc/controller/less/style.less',
                'apps/HackerDSCore/client/display/css/style.css': 'apps/HackerDSCore/clientSrc/display/less/style.less',
                'apps/HackerDSCore/client/shared/css/style.css': 'apps/HackerDSCore/clientSrc/shared/less/style.less'
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
                    'apps/HackerDSCore/clientSrc/**'
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