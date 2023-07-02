// module.exports = {
//   sets: {
//     desktop: {
//       files: "test/hermione",
//     },
//   },

//   browsers: {
//     chrome: {
//       automationProtocol: "devtools",
//       desiredCapabilities: {
//         browserName: "chrome",
//       },
//     },
//   },
//   plugins: {
//     "html-reporter/hermione": {
//       enabled: true,
//     },
//   },
// };

module.exports = {
  sets: {
    //изменил конфиг чтоб проверяло только мой файл на 1 разрешении
    chrome1920x1080: {
      files: "test/hermione",
      browsers: ['chrome1920x1080']
    },
    /*
    chrome1024x10000: {
      files: "test/hermione/example.hermione.js",
      browsers: ['chrome1024x10000']
    },
    chrome560x15000: {
      files: ["test/hermione/example.hermione.js", "test/hermione/burger.hermione.js"],
      browsers: ['chrome560x15000']
    },*/
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
    chrome1024x10000: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1024,
        height: 10000,
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
    chrome560x15000: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 560,
        height: 15000,
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

