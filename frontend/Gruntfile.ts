module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      // Task configuration goes here.
    });

    // Load plugins here.

    // Register tasks here.
    grunt.registerTask('taskname', 'A sample task that logs some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });

    grunt.registerTask('default', ['taskname']);  // Add this line
};

