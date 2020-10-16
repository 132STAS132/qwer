require('dotenv').config();
const fs = require('fs');
const glob = require('glob');
let testrailApi = require('testrail-api');

module.exports.findMissingIds = async function () {

    let testrail = new testrailApi({
        host: process.env.TESTRAIL_BASE_URL.match(/http.*(?=\/index)/)[0],
        user: process.env.TESTRAIL_USER,
        password: process.env.TESTRAIL_PASSWORD
    });

    function getCases(projectId, suiteId) {
        return new Promise(resolve => {
            testrail.getCases(projectId, { suite_id: suiteId },function (err, response, cases) {
                resolve(cases);
            });
        })
    }

    let parsedCases = await getCases(1, 1);
    let currentCases = [];

    const testFiles = await glob.sync('specs/**/*.ts');

    for (let file of testFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let ids = content.match(/(?<=\[C)(\d+?)(?=\])/g);
        currentCases = currentCases.concat(ids);
    }

    for (let test of parsedCases) {
        if (test.custom_automated === 2 && currentCases.indexOf(test.id.toString()) === -1) {
                console.log('\x1b[31m%s\x1b[0m', `> Missing auto test with C${test.id} id!`);
        }
    }
    console.log('------------------------------------');
    for (let test of parsedCases) {
        if (test.custom_automated !== 2 && currentCases.indexOf(test.id.toString()) !== -1) {
            console.log('\x1b[31m%s\x1b[0m', `Test with C${test.id} id should be marked as automated in the testrail`);
        }
    }
    console.log('------------------------------------');
    let testrailTCIds = [];
    for (let testCase of parsedCases) {
        testrailTCIds.push(testCase.id)
    }

    for (let test of currentCases) {
        if (testrailTCIds.indexOf(parseInt(test)) === -1) {
            console.log('\x1b[31m%s\x1b[0m', `> Missing test case for auto test with C${test} id!`);
        }
    }
};

module.exports.getCountOfScenarios = async function () {
    let testFiles = await glob.sync('specs/**/*.ts');

    let scenarios = [];
    for (let file of testFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let fileScenarios = content.match(/it\(/g);
        scenarios = scenarios.concat(fileScenarios);
    }
    console.log('\x1b[32m%s\x1b[0m', `> Count of Scenarios: ${scenarios.length} \n> Specs: ${testFiles.length}`);
};

require('make-runnable');