const { assert } = require('chai');
const getName = require('../'); // eslint-disable-line unicorn/import-index
const path = require('path');

const tests = require('../sitesArray')

describe('Sites', function () {
  this.slow(5000);
  this.timeout(30000);
  this.retries(1);

  tests.forEach(test => {
    describe(test.name, function () {
      test.testCases.forEach(testCase => {
        describe(testCase.name, function () {
          let result;
          before(async function () {
            result = await getName(testCase.url, process.env.PROXY);
          });
          
          describe('regexes', function () {
            for (const regex of test.URLs) {
              describe(regex.toString(), function () {
                it('should be /i', function () {
                  assert.isTrue(regex.flags.includes('i'))
                })
              })
            }
          })
          it('should pass regex', function () {
            assert.exists(test.URLs.find(regex => regex.test(testCase.url)))
          })
          it('should have correct name', function () {
            assert.strictEqual(result.name, testCase.name);
          });
        });
      });
    });
  });
});
