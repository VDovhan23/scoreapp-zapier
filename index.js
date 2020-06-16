const authentication = require('./authentication');
const getAllScorecardsTrigger = require('./triggers/get_all_scorecards.js');
const newSignUpResultTrigger = require('./triggers/new_sign_up_result.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  triggers: {
    [getAllScorecardsTrigger.key]: getAllScorecardsTrigger,
    [newSignUpResultTrigger.key]: newSignUpResultTrigger,
  },
  creates: {},
  authentication: authentication,
  searches: {},
};
