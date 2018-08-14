var argv = require('yargs').argv;

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    // See: https://github.com/karma-runner/karma/issues/736
    files: [
      './node_modules/jquery/dist/jquery.js',
      './tmp/**/*.js',
      { pattern: './test/**/*.html', served: true, included: false }
    ],
    exclude: [],
    reporters: argv.debug ? ['spec'] : ['spec', 'coverage'],
    autoWatch: true,
    browsers: [argv.chrome ? 'Chrome' : 'PhantomJS'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],
    preprocessors: {
      './tmp/**/*.js': ['coverage', 'sourcemap']
    },
    coverageReporter: {
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    logLevel: argv.debug ? config.LOG_DEBUG : config.LOG_INFO,
    client: {
      args: argv.logMessages ? ['logMessages'] : []
    }
  });
};