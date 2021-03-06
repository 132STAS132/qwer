# MessengerEndToEnd
End to end tests for Rentgrata Messenger application. (RentgrataWidget)

### Recommended prerequisites: 

- Node.js v10.xx.x

- Java Version 8

### To execute tests you should do the following steps:

1.In the terminal window execute ``npm install`` command.

2.Install cross-env package globally, command: ``npm i cross-env -g``

3.Install allure commandline globally, command: ``npm install -g allure-commandline``

4.Copy .env to the root of project directory with correct credentials.

5.You can export the following variables or define it in the .env file:

- HEADLESS (boolean), e.g. ``HEADLESS=false`` - for running Google Chrome browser in the headless mode. ``false`` by default.
- BROWSER_NAME (string), e.g. ``BROWSER_NAME=Safari`` - for running particular browser. `Chrome` by default. Options: ``Chrome``,``Safari``,``IE`` 
- TESTRAIL_RUN (boolean), e.g. ``TESTRAIL_RUN=true`` -  for creating test run in the testRail. ``false`` by default.
- LAMBDA_TEST_RUN (boolean), e.g. ``LAMBDA_TEST_RUN=true`` -  for running tests using lambdaTest service. ``false`` by default.
- ENABLE_SLACK (boolean), e.g. ``ENABLE_SLACK=true`` -  for sending information to proper Slack channel. Required TESTRAIL_RUN=true and LAMBDA_TEST_RUN=true. ``false`` by default.

6.Execute the following command ``npm run tests`` for run all test scenarios for web.

7.Execute the following command ``npm run tests:mobile`` for run all test scenarios for mobile.

8.For run specific test suite execute ``npm run {suite name}`` command, e.g:

``npm run mainPage``

9.Test results will be displayed in html format in ``artifacts/allure-report`` folder.

Execute ``npm run openReport`` command to generate and open a report.

If you have problems running tests on android devices, try to update chromedriver in accordance with the version of the chrome browser version on your device, command : ``npm install appium --chromedriver_version="version"``
``https://raw.githubusercontent.com/appium/appium-chromedriver/master/config/mapping.json`` - list of the versions chromedriver in accordance of the chrome browser version
   
### Existing suites

- ``chatWithAResident``

- ``chatWithAResident:mobile``

- ``contactPropertyPart1``

- ``contactPropertyPart2``

- ``successScreen``

- ``mainPage``

- ``mainPage:mobile``

- ``sendMessage``

- ``sendMessage:mobile``

- ``sendMessageViaSingIn``

- ``sendMessageViaSingIn:mobile``

- ``successForm``

- ``termsConditionsForm``

- ``selectPasswordForm``

- ``afterSendingFormMessageSent``

- ``verifyEmailForm``

### Installing allure commandline:

Allure requires Java 8 or higher

npm install -g allure-commandline

Linux:

- ``sudo apt-add-repository ppa:qameta/allure``
- ``sudo apt-get update`` 
- ``sudo apt-get install allure``

Mac OS X:

- ``brew install allure``

For getting more information please visit https://docs.qameta.io/allure/

### CIRCLE CI:

For triggering CIRCLE CI you can use the following link:

``curl -u "<CIRCLE_CI_TOKEN>": -X POST --header "Content-Type: application/json" -d '{"parameters": {"browser":"chrome"}}' https://circleci.com/api/v2/project/github/Rentgrata/MessengerEndToEnd/pipeline``

- ``<CIRCLE_CI_TOKEN>`` need to replace with valid data

- ``parameters.browser`` === one of ['all', 'chrome', 'safari', 'ie']


By default, CircleCI automatically builds a project whenever you push changes to a version control system (VCS). 

You can override this behavior by adding a [ci skip] or [skip ci] tag in the first line of the body of the commit or the commit’s title.

-------
Structure:
```
MessengerEndToEnd
|
|---- artifacts
|     |-- allure-report
|     |-- allure-results
|
|---- core
|     |-- wdio.ts
|
|---- existingBugs
|     |-- bugs.ts
|
|---- helpers
|     |-- allure.ts
|     |-- jira.ts
|     |-- testRail.ts
|
|---- interfaces
|
|---- pages
|     |-- **.page.ts
|
|---- specs
|     |-- **.spec.ts
|
|---- testData
|
|---- .env
|
|---- .gitIgnore
|
|---- keep.env
|
|---- package.json
|
|---- package-lock.json
|
|---- README.md
|
|---- tsconfig.json
|
|---- wdio.config.js
```

-------
Fundamentals are:
- [TypeScript](https://www.typescriptlang.org/docs/tutorial.html) - as project language
- [Webdriver i/o](https://webdriver.io/) - as browser control framework
- [MochaJS](https://mochajs.org/) - as test runner
- [Chai](https://www.chaijs.com/) - as assertion library
- [Circle CI](https://circleci.com/) - Continuous Integration and Delivery