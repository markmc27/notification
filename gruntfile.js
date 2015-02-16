module.exports = function (grunt) {
    grunt.registerTask('watch', ['watch']);
	grunt.registerTask('connect', ['connect']);

    grunt.registerTask('serve', ['less','connect:server','watch']);

    grunt.initConfig({
        less: {
            dev: {
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapRootpath: '/'
                },
                files: {
                    "build/css/styles.css": "assets/less/styles.less"
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'source/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        },
		connect: {
			server: {
                options: {
                    hostname: "127.0.0.1",
    				port: 3000,
    				base: './',
                    open: true
                }
			}
		},
        watch: {
            options: {
                    livereload: true,
            },
            js: {
                files: ['assets/js/**/*.js']
            },
            css: {
                files: ['assets/less/**/*.less'],
                tasks: ['less:dev'],
            },
            images: {
                files: ['source/images/**/**.{png,jpg,gif}'],
                tasks: ['imagemin:dynamic'],
                options: {
                    spawn: false,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

};