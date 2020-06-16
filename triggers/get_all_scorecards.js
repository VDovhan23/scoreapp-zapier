const perform = (z, bundle) => {
  const options = {
    url: '{{process.env.HOST}}/api/admin/scorecards',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    let results = response.json;

    // You can do any parsing you need for results here before returning them

    return results.data;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: {
      id: 288,
      name: 'dfg',
      domain: null,
      description_short: null,
      status: 'complete',
    },
    outputFields: [],
  },
  key: 'get_all_scorecards',
  noun: 'orecards',
  display: {
    label: 'get_scorecards',
    description: 'Triggers when sign up.',
    hidden: true,
    important: false,
  },
};
