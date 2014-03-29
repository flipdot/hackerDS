var jsSrcFiles = [
  'server/contentSrc/js/thirdParty/bootstrap.min.js'
]

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
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
            production: {
                compress: true,
                files: {
                  'server/content/js/app.js': jsSrcFiles
                }
            }
        },
        concat: {
            dist: {
                src: jsSrcFiles,
                dest: 'server/content/js/app.js'
            }
        },
        watch: {
            styles: {
                files: [
                    'server/contentSrc/less/*.less',
                    'server/contentSrc/js/*.js'
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