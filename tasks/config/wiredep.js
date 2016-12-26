module.exports = function(grunt) {
	grunt.config.set('wiredep', {
		task: {
			src: [
				'views/**/*.jade'
			],

			ignorePath: '../assets',

			options: {
			}
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
};