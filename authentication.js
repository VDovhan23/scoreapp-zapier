module.exports = {
  type: 'oauth2',
  test: {
    url: '{{process.env.HOST}}/api/admin/config/fonts',
    method: 'GET',
    params: {},
    headers: {
      Authorization: 'Bearer {{bundle.authData.access_token}}',
      Accept: 'application/json',
    },
    body: {},
    removeMissingValuesFrom: {},
  },
  oauth2Config: {
    authorizeUrl: {
      method: 'GET',
      url: 'http://localhost:3000/oauth/authorize',
      params: {},
    },
    getAccessToken: {
      url: '{{process.env.HOST}}/oauth/token',
      method: 'POST',
      params: {},
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: {
        code: '{{bundle.inputData.code}}',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
        grant_type: 'authorization_code',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
      },
      removeMissingValuesFrom: {},
    },
    refreshAccessToken: {
      url: '{{process.env.HOST}}/oauth/token',
      method: 'POST',
      params: {},
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: {
        refresh_token: '{{bundle.authData.refresh_token}}',
        grant_type: 'refresh_token',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
      },
      removeMissingValuesFrom: {},
    },
    autoRefresh: true,
    scope: '',
  },
  connectionLabel: '{{bundle.inputData.username}}',
};
