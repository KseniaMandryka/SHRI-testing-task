module.exports = {
  sets: {
    chrome1920x1080: {
      files: "test/hermione",
      browsers: ['chrome1920x1080']
    },
  },

  browsers: {
    chrome1920x1080: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      },
      screenshotMode: "fullpage",
      resetCursor: true,
      calibrate: true,
      compositeImage: false,
      screenshotDelay: 100,
      assertViewOpts: {
        allowViewportOverflow: true,
      },
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};

