module.exports = function(config) {
	config.set({
		basePath: '.',
		frameworks: ['jasmine', 'sinon'],
		plugins: [
			'karma-jasmine',
			'karma-sinon',
			'karma-phantomjs-launcher',
			'karma-junit-reporter',
			'karma-coverage'
		],
		browsers: ['PhantomJS'],
		reporters: ['dots', 'coverage', 'junit'],
		junitReporter: {
			outputDir: 'target/test/unit',
			suite: ''
		},
		coverageReporter: {
			dir: 'target/test/coverage',
			reporters: [
				{type: 'html', subdir: 'html'},
				{type: 'cobertura', subdir: '.', file: 'cobertura.xml'}
			]
		},
		preprocessors: {
			'src/main/webapp/scripts/**/*.js': ['coverage']
		},
		files: [
			'target/**/js/vendor.min.js',
			'node_modules/jquery/dist/jquery.js',
			'src/test/webapp/**/*.spec.js',
			'src/main/webapp/scripts/**/*.js',
		],
		singleRun: true
	});
};
