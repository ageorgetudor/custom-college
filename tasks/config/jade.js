module.exports = function(grunt) {

	grunt.config.set('jade', {
		dev: {
			options: {
				client: false,
				pretty: true,
				doctype: 'html'
			},
			files: [{
				expand: true,
				cwd: "assets/templates/",
				src: ["**/*.jade"],
				dest: ".tmp/public/",
				ext: ".html"
			}]
		}
	});
	grunt.loadNpmTasks("grunt-contrib-jade");
};
