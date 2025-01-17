const coverage = process.env.COVERAGE;

// configures browsers to run test against
// any of [ 'ChromeHeadlessNoSandbox', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
const browsers = (process.env.TEST_BROWSERS || "ChromeHeadlessNoSandbox").split(",");

const singleStart = process.env.SINGLE_START;

// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require("puppeteer").executablePath();

const suite = coverage ? "test/coverageBundle.js" : "test/testBundle.js";

module.exports = function (karma) {
  const config = {
    basePath: "../../",

    frameworks: ["webpack", "mocha", "sinon-chai"],

    files: [suite],

    preprocessors: {
      [suite]: ["webpack", "env"],
    },

    reporters: ["spec"].concat(coverage ? "coverage" : []),

    specReporter: {
      maxLogLines: 10,
      suppressSummary: true,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showBrowser: false,
      showSpecTiming: false,
      failFast: false,
    },

    coverageReporter: {
      reporters: [{ type: "lcov", subdir: "." }],
    },

    browsers,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    autoWatch: false,

    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
          },
          {
            test: /\.css$/,
            use: "raw-loader",
          },
        ].concat(
          coverage
            ? {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    plugins: [
                      [
                        "istanbul",
                        {
                          include: ["src/**"],
                        },
                      ],
                    ],
                  },
                },
              }
            : [],
        ),
      },
      resolve: {
        mainFields: ["browser", "module", "main"],
      },
      devtool: "eval-source-map",
    },
  };

  if (singleStart) {
    config.browsers = [].concat(config.browsers, "Debug");
    config.envPreprocessor = [].concat(config.envPreprocessor || [], "SINGLE_START");
  }

  karma.set(config);
};
