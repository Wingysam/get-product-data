const { assert } = require('chai');
const getName = require('../'); // eslint-disable-line unicorn/import-index
const tests = require('./testCases');

describe('Sites', function () {
  this.slow(5000);
  this.timeout(30000);
  this.retries(1);

  tests.forEach(test => {
    describe(test.name, function () {
      test.cases.forEach(testCase => {
        describe(testCase.name, function () {
          let result;
          before(async function () {
            result = await getName(testCase.url);
          });
          it('should have correct name', function () {
            assert.strictEqual(result.name, testCase.name);
          });
        });
      });
    });
  });
});
