require('ts-node').register({ files: true });
require('dotenv').config();
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const { TestRailHelper } = require('./helpers/testRail');
const { addEnvironment, addAttachment } = require('@wdio/allure-reporter').default;
const { bugs } = require("./existingBugs/bugs");
const { JiraAPI } = require("./helpers/jira");
const jiraAPI = new JiraAPI();
const { TestRailStatus } = require('./testData/testRailStatus.data');
const os = require('os');
const dateFormat = require('dateformat');
const now = new Date();
const { IncomingWebhook } = require('@slack/webhook');
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

// by default Google Chrome browser is used
process.env.BROWSER_NAME = (process.env.BROWSER_NAME || 'chrome');
process.env.DEFAULT_DOWNLOAD_DIR = path.join(__dirname, 'downloads');
process.env.BASE_URL = (process.env.BASE_URL || 'https://messenger-redesign-v1-lxn0jbs6.herokuapp.com/demo');
const isLambdaTest = JSON.parse(process.env.LAMBDA_TEST_RUN || 0);
const isSlackEnabled = JSON.parse(process.env.ENABLE_SLACK || 0);
const isTestRailRun = JSON.parse(process.env.TESTRAIL_RUN || 0);
const headlessMode = JSON.parse(process.env.HEADLESS || 0);
const maxInstances = process.env.INSTANCES ? +process.env.INSTANCES : 1;
const testRunName = `MessengerEndToEnd - ${process.env.BROWSER_NAME} - ${dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")}`;
let testRailRunUrl = null, capabilities = [], services = [];

// =========
// TestRail configuration
// =========

const testRailClient = module.exports.testRailClient = new TestRailHelper({
    domain: 'https://rentgrata.testrail.io/index.php?/api/v2/',
    testRailApi: 'index.php?/api/v2/',
    projectId: 1,
    suiteId: 1,
    runName: testRunName
});

// =========
// Arguments
// =========

let chromeArgs = [
    '--no-sandbox',
    'disable-infobars',
    'disable-extensions',
    'window-size=1920,1080',
    'disable-notifications',
    'disable-popup-blocking',
    '--disable-dev-shm-usage',
    '--disable-impl-side-painting'
];

// ============
// Capabilities
// ============

let chromeCaps = {
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: chromeArgs,
        prefs: {
            download: {
                default_directory: process.env.DEFAULT_DOWNLOAD_DIR
            }
        }
    },
};

let safari = {
    browserName: 'safari',
    /*
    //      * safaridriver can only handle 1 instance unfortunately
    //      * https://developer.apple.com/documentation/webkit/about_webdriver_for_safari
    //      */
    // maxInstances: 1,

    // // port to find safaridriver
    // port: 4447, // if you want to specify the port. Default is 4444
    // path: '/',
    // // ...
    // capabilities: [{
    //     /*
    //      * safaridriver can only handle 1 instance unfortunately
    //      * https://developer.apple.com/documentation/webkit/about_webdriver_for_safari
    //      */

    /**
     * One Session at a Time, to Mimic User Interaction
     Only one Safari browser instance can be active at any given time,
     and only one WebDriver session at a time can be attached to the browser instance.
     These constraints ensure that the simulated behavior (mouse, keyboard, touch, and so forth)
     accurately reflects what a user can do in a macOS windowing environment and prevents tests
     from competing with each other for window and keyboard focus.
     * **/

    //     maxInstances: 1,
    // }],
    // services: ['safaridriver'],
    //
    // // options
    // safaridriverArgs: ['-p 4444'], // use the specified port. Default is 4444
    // safaridriverLogs: './',
}

let internetExplorerCaps = {
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 IE instances available you can make sure that not more than
    // 5 instances get started at a time.
    // maxInstances: instances,
    browserName: 'internet explorer',
    'se:ieOptions': {
        acceptUntrustedCertificates: true,
        ignoreProtectedModeSettings: true,    //only applicable to IE browser
        ignoreZoomSetting: true,              //only applicable to IE browser
        'ie.ensureCleanSession': true,
        initialBrowserUrl: process.env.BASE_URL,
        introduceInstabilityByIgnoringProtectedModeSettings: true,
        enablePersistentHover: true,
        // requireWindowFocus: true
    },
};

// ======= LAMBDA TEST CAPS =======

const commonCapsLambda = {
    resolution : "1024x768",
    build: testRunName,
    console: true,
}

let chromeCapsLambda =  {
    ...commonCapsLambda,
    platform: "Windows 10",
    browserName: "Chrome",
    version: "85.0",
};

let safariCapsLambda = {
    ...commonCapsLambda,
    platformName: "MacOS Catalina",
    browserName: "Safari",
    browserVersion: "13.0",
    "safari.popups" : true,
    "safari.cookies" : true
};

let ieCapsLambda = {
    ...commonCapsLambda,
    platformName: "Windows 10",
    browserName: "Internet Explorer",
    browserVersion: "11.0",
    // "ie.flash" : true,
    "ie.popups": true,
    "ie.compatibility": 11001
};


// ======= LAMBDA TEST CAPS END =======

switch (process.env.BROWSER_NAME.toLowerCase()) {
    case 'chrome':
        capabilities.push(isLambdaTest ? chromeCapsLambda : chromeCaps);
        services.push('selenium-standalone');
        break;
    case 'safari':
        capabilities.push(isLambdaTest ? safariCapsLambda : safari);
        services.push('safaridriver', 'selenium-standalone');
        break;
    case 'ie':
        capabilities.push(isLambdaTest ? ieCapsLambda : internetExplorerCaps);
        services.push(['selenium-standalone', {
            installArgs: {
                drivers: {
                    ie: {
                        version: '3.9.0',
                        arch: 'ia32',
                    }
                }
            },
            args: {
                drivers: {
                    ie: {
                        // check for more recent versions of internet explorer driver here:
                        // https://selenium-release.storage.googleapis.com/index.html
                        version: '3.9.0',
                        arch: 'ia32',
                    }
                }
            },
        }])
        break;
    default:
        throw new Error(`Incorrect -> ${process.env.BROWSER_NAME} <-  browser name - please check BROWSER_NAME=??? environment variable. Please use one of [Chrome, IE, Safari]`);
}

if (headlessMode) {
    chromeArgs.push('--headless');
    if (process.env.BROWSER_NAME.toLowerCase() === 'safari') {
        console.warn('HEADLESS mode is used for Google Chrome. https://github.com/SeleniumHQ/selenium/issues/5985');
    }
}

// ======= LAMBDA SERVICE =======
if (isLambdaTest) {
    if (!process.env.LT_USERNAME) throw new Error(`LT_USERNAME is not provided. Please disable lambda test run or provide LT_USERNAME`);
    if (!process.env.LT_ACCESS_KEY) throw new Error(`LT_ACCESS_KEY is not provided. Please disable lambda test run or provide LT_ACCESS_KEY`);
    services = [
        ['lambdatest', {
            tunnel: true,
            lambdatestOpts: {
                logFile: "tunnel.log"
            },
        }]
    ];
}

if (isSlackEnabled) {
    if (!process.env.SLACK_WEBHOOK) throw new Error(`SLACK_WEBHOOK is not provided. Please disable Slack integration or provide SLACK_WEBHOOK`);
}

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './specs/**/*.ts'
    ],
    suites: {
        rentgrataMessenger: ['./specs/rentgrataMessenger.spec.ts'],
        sendMessage: ['./specs/RentgrataMessenger/sendMessage.spec.ts'],
        sendMessageViaSingIn: ['./specs/RentgrataMessenger/sendMessageViaSingIn.spec.ts'],
    },
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities,
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    sync: true,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: process.env.BASE_URL,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 25000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services,
    // services: ['safaridriver', 'selenium-standalone'],
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ['spec', ['allure', {
        outputDir: 'artifacts/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        disableMochaHooks: true,
    }]],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 9999999,
        retries: 1,
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: async function (config, capabilities) {
        const isWin = await os.platform().toLowerCase().startsWith('win');
        if (isWin) {
            try {
                await exec('rmdir artifacts /s /q');
            } catch (e) {}
            // if need to download
            // try {
            //     await exec('rmdir downloads');
            // } catch (e) {}
            // await exec('mkdir downloads');
        } else {
            await exec('rm -rf artifacts/*');
            // if need to download
            // await exec('rm -rf artifacts/* && mkdir -p downloads && rm -rf downloads/*');
        }
        if (isTestRailRun) {
            /*=== Generate IDs for a new test run in the TestRail ===*/
            let path = [];
            let ids = [];
            let getFiles = function (dir, files_) {

                files_ = files_ || [];

                let files = fs.readdirSync(dir);

                for (let i in files) {
                    let name = dir + '/' + files[i];
                    if (fs.statSync(name).isDirectory()) {
                        getFiles(name, files_);
                    } else {
                        path.push(name);
                    }
                }
            };

            switch (process.env.SUITE_TYPE) {
                case 'file':
                    path = config.suites[config.suite[0]];
                    break;
                case 'folder':
                    getFiles(config.suites[config.suite[0]][0].split('/*')[0]);
                    break;
                case 'all':
                    getFiles(config.specs[0].split('/**')[0]);
                    break;
            }

            path.forEach(path => {
                let data = fs.readFileSync(path, 'utf-8');
                data.match(/C\d+/g).map(el => ids.push(+el.slice(1)));
            });
            const response = await testRailClient.createRun(ids);
            process.env.TEST_RAIL_RUN_ID = response.id;
            testRailRunUrl = response.url;
        }
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    //     capabilities.name=specs[0].split(/(\\|\/)/g).pop() || undefined;
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test, context) {
        if (!isLambdaTest) {
            const size = { width: 1024, height: 768 };
            let { height, width } = browser.getWindowSize();
            if (height !== size.height || width !== size.width) {
                browser.setWindowSize(size.width, size.height);
            }
        }
        addEnvironment('Browser', browser.capabilities.browserName);
        addEnvironment('ENV', browser.config.baseUrl);
        browser.url('');
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        let image = null;
        let caseId = test.title.match(/C\d+/);
        if (caseId) caseId = +caseId[0].slice(1);

        if (!passed) {
            let screenShot = browser.takeScreenshot();
            if (typeof screenShot === 'object') {
                // ie specific behaviour
                // The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received an instance of Object
                screenShot = browser.takeScreenshot();
            }
            image = new Buffer.from(screenShot, 'base64');
            addAttachment('afterTest screenshot', image, 'image/png')
            console.log('\x1b[31m%s\x1b[0m', `    ${error.stack} \n`);
        }
        try {
            const windows = browser.getWindowHandles();
            windows.forEach((w, i) => {
                if (i !== 0) {
                    browser.switchToWindow(windows[i]);
                    browser.closeWindow();
                }
            });
            browser.switchToWindow(windows[0]);
            browser.execute('window.sessionStorage.clear(); window.localStorage.clear();');
            browser.deleteAllCookies();
        } catch (e) {}

        if (process.env.TEST_RAIL_RUN_ID && caseId) {
            let config = {
                passed,
                caseId,
                runId: process.env.TEST_RAIL_RUN_ID
            };


            for (const object in bugs) {
                for (const bugInfo in bugs[object]) {
                    const currentBug = bugs[object][bugInfo];
                    let index = currentBug.scenarios.indexOf(test.title);

                    if (index !== -1) {
                        let scenariosMarkup = currentBug.scenarios && currentBug.scenarios.length ? 'Scenarios related to bug: \n' + currentBug.scenarios.map(scenario => `${scenario}`).join(' \n') : '';
                        let bug = browser.call(async () => await jiraAPI.getIssueInfo(bugs[object][bugInfo].bugId));

                        let markup = `Bug Info: \nStatus: ${bug.fields.status.name} \nIssue type: ${bug.fields.issuetype.name} \nPriority: ${bug.fields.priority.name} \nSummary: ${bug.fields.summary} \nProject name: ${bug.fields.project.name} \n${bug.fields.resolution ? `Resolution ${bug.fields.resolution.description} \n` : ''}${bug.fields.assignee ? `Assignee: ${bug.fields.assignee.displayName} \n` : ''}Creator: ${bug.fields.creator.displayName} \nLink: ${currentBug.originalLink} \n \n \n${scenariosMarkup}`
                        if (bug.fields.status.name.toLowerCase().trim() === 'done' && config.passed) {
                            config.changeStatusTo = TestRailStatus.retest;
                        }

                        if (bug.fields.status.name.toLowerCase().trim() === 'done' && !config.passed) {
                            config.changeStatusTo = TestRailStatus.retest;
                        }

                        if (bug.fields.status.name.toLowerCase().trim() !== 'done' && config.passed) {
                            config.changeStatusTo = TestRailStatus.retest;
                        }

                        if (bug.fields.status.name.toLowerCase().trim() !== 'done' && !config.passed) {
                            config.changeStatusTo = TestRailStatus.dueToABug;
                        }

                        browser.call(async () => await testRailClient.addCommentToTestCase({ runId: config.runId, caseId: config.caseId }, markup));
                    }
                }
            }


            if (error) config.errorMessage = error.message;

            browser.call(async () => {
                await testRailClient.updateRun(config);
                if (image) {
                    config.resultId = await testRailClient.getResultsForCase(config);
                    await testRailClient.addAttachment(config, image);
                }
            });
        }
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
        if (isLambdaTest) {
            // example from documentation
            driver.execute("lambda-status=".concat(result==0?"passed":"failed"),undefined);
        }
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: async function(exitCode, config, capabilities, results) {
        if (isSlackEnabled && isTestRailRun && isLambdaTest) {
            await webhook.send({
                attachments: [
                    {
                        pretext: `*Test results for ${testRunName} *`,
                        title: `TestRail: ${testRailRunUrl} \n LambdaTest: https://automation.lambdatest.com/timeline`,
                    }
                ]
            })
        }

        if (isLambdaTest) {
            // wait for "Tunnel successfully stopped"
            return new Promise(resolve => setTimeout(resolve, 10000));
        }
    },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}

if (process.env.BROWSER_NAME.toLowerCase() === 'safari') {
    this.config.path = '/';
    this.config.port = 9515;
}

// ======= LAMBDA SERVICE =======
if (isLambdaTest) {
    delete this.config.bail;
    delete this.config.runner;

    this.config.user = process.env.LT_USERNAME;
    this.config.key = process.env.LT_ACCESS_KEY;
    this.config.logFile = './logDir/api.log';
    this.config.exclude = [];
    this.config.path = "/wd/hub";
    this.config.hostname = "hub.lambdatest.com";
    this.config.port = 80;
    this.config.updateJob = false;
    // could be updated after getting stable cycle
    this.config.maxInstances = 10;
}

// ======= LAMBDA END =======