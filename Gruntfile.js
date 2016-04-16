module.exports = function (grunt) {  
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);  
	
	// Project configuration.
	grunt.initConfig({  
		pkg: grunt.file.readJSON('package.json'),
		globals: {
			packageFolder: 'target/wordpress-plugin',
			buildFolder: 'target/build',
            vendorFiles: []
		},
		sass: {
			options: {
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'<%= globals.packageFolder %>/css/app.min.css': ['src/main/webapp/stylesheets/app.scss']
				}
			}
		},
		watch: {
			scripts: {
				files: ['src/main/webapp/scripts/**/*.js'],
				tasks: ['jshint:app', 'concat:app', 'copy:app', 'copy:deploy'],
				options: {
					spawn: false,
					interrupt: true
				},
			},
			index: {
				files: ['src/main/webapp/*.php'],
				tasks: ['copy:app', 'copy:deploy'],
				options: {
					spawn: false,
					interrupt: true
				},
			},
			styles: {
				files: ['src/main/webapp/**/*.scss'],
				tasks: ['sass', 'copy:app'],
				options: {
					spawn: false,
					interrupt: true
				},
			}
		},
		uglify: {
			app: {
				files: {
					'<%=globals.packageFolder%>/js/app.min.js': [
						'src/main/webapp/scripts/**/*.js'
					]
				}
			},
			vendor: {
				files: {
					'<%=globals.packageFolder%>/js/vendor.min.js': [
						'node_modules/lodash/lodash.js',
						'node_modules/xlsx/dist/jszip.js',
						'node_modules/xlsx/dist/cpexcel.js',
						'node_modules/xlsx/dist/xlsx.full.min.js',
						'node_modules/jspdf/dist/jspdf.min.js'
					]
				}
			}
		},
		concat: {
			app: {
				options: {
					sourceMap: true
				},
				files: {
					'<%=globals.packageFolder%>/js/app.min.js': [
						'src/main/webapp/scripts/**/*.js'
					]
				}
			},
			vendor: {
				files: {
					'<%=globals.packageFolder%>/js/vendor.min.js': [
						'node_modules/lodash/lodash.js',
						'node_modules/xlsx/dist/jszip.js',
						'node_modules/xlsx/dist/cpexcel.js',
						'node_modules/xlsx/dist/xlsx.full.min.js',
						'node_modules/jspdf/dist/jspdf.min.js'
					]
				}
			}
		},
		copy: {
			app: {
				files: [
					{expand: true, flatten: true, cwd: 'src/main/webapp', src: ['*.php'], dest: "<%= globals.packageFolder %>"},
					{expand: true, flatten: false, cwd: 'src/main/webapp/images/', src: ['*'], dest: "<%= globals.packageFolder %>/images/"}
				]
			}
		},
		jshint: {
			options: {
				"predef": [ "$", "document"]
			},
			app: {
				src: [
					'src/main/webapp/scripts/**/*.js'
				]
		  	}
		},
		karma: {
			app: {
				configFile: 'karma.conf.js'
			}
		}
	});  

	// Default task.  
	grunt.registerTask('build', ['sass', 'jshint', 'uglify', 'copy:app']);
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('default', ['build', 'test']);
};
