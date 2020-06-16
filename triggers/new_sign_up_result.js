const perform = (z, bundle) => {
  return [bundle.cleanedRequest];
};

const performList = (z, bundle) => {
  const options = {
    url: `${process.env.HOST}/api/admin/scorecards/${bundle.inputData.scorecard_id}/zapier`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results.data;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'scorecard_id',
        type: 'integer',
        label: 'Scorecard ID',
        dynamic: 'get_all_scorecards.id.id',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    type: 'hook',
    performSubscribe: {
      url:
        '{{process.env.HOST}}/api/admin/scorecards/{{bundle.inputData.scorecard_id}}/subscribe-sign-in',
      method: 'POST',
      params: {},
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.access_token}}',
      },
      body: {
        hookUrl: '{{bundle.targetUrl}}',
        scorecard_id: '{{bundle.inputData.scorecard_id}}',
      },
      removeMissingValuesFrom: {},
    },
    sample: {
      id: 79,
      status: 2,
      first_name: 'Vasyl',
      last_name: 'Dovhan',
      email: 'waselews1@gmail.com',
      created_at: '2020-06-15T09:43:27.000000Z',
      utm_source: null,
      utm_medium: null,
      utm_term: null,
      utm_content: null,
      question_274: 'Press',
      answer_274: '1',
      question_275: 'Press NO',
      answer_275: 'no',
    },
    performUnsubscribe: {
      url:
        '{{process.env.HOST}}/api/admin/scorecards/{{bundle.inputData.scorecard_id}}/unsubscribe-sign-in',
      method: 'DELETE',
      params: {},
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.access_token}}',
      },
      body: { hookUrl: '{{bundle.subscribeData.id}}' },
      removeMissingValuesFrom: {},
    },
    performList: performList,
    outputFields: [
      { key: 'first_name', label: 'First Name' },
      { key: 'last_name', label: 'Last Name' },
      { key: 'email', label: 'Email' },
    ],
  },
  key: 'new_sign_up_result',
  noun: 'Result',
  display: {
    label: 'Sign Up Result',
    description: 'Triggers when a user passed the sign up step.',
    hidden: false,
    important: true,
  },
};
