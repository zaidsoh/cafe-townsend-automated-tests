var Jasmine2HtmlReporter = require('./node_modules/protractor-jasmine2-html-reporter');

exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
  },
  framework: 'jasmine2',
  specs: ['../test/spec.js'],
  jasmineNodeOpts: {
   defaultTimeoutInterval: 1000000
  },

  onPrepare: function() {
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: '../report/'
        })
      );
	  browser.driver.manage().window().maximize();
  },
  allScriptsTimeout: 65000
}