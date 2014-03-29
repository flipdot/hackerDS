var commonJsSrcFiles = [
  'server/contentSrc/js/thirdParty/jquery.min.js',
  'server/contentSrc/js/thirdParty/bootstrap.min.js',
  'server/contentSrc/js/thirdParty/angular.min.js',
];

var controllerJsSrcFiles = [
  'server/contentSrc/js/controller/main.js',
];

var displayJsSrcFiles = [
  'server/contentSrc/js/display/main.js',
];

var jsTargetFiles = {
  'server/content/js/common.js': commonJsSrcFiles,
  'server/content/js/controller.js': controllerJsSrcFiles,
  'server/content/js/display.js': displayJsSrcFiles,
}

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            default: {
                options: {
                    compess: true,
                    cleancss: true
                },
                files: {
                    'server/content/css/style.css': 'server/contentSrc/less/style.less'
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
                    'server/contentSrc/**'
                ],
                tasks: ['less', 'concat'],
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['watch'])
    grunt.registerTask('release', ['less', 'uglify'])
};