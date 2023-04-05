const querystring = require('querystring');
const undici = require('undici');
const uuid = require('uuid');

const client_id = process.env.CLIENT_ID || '';
const client_secret = process.env.CLIENT_SECRET || '';
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000';
const scope = 'streaming user-library-read user-read-email user-read-private';

const spotify = async (obj) => {
  const { body, statusCode } = await undici.request('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: querystring.stringify(obj),
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (statusCode !== 200) {
    throw new Error(`Request failed with status code ${statusCode}.`);
  }

  return body.json();
};

const authorizationCode = async (code) => spotify({
  code,
  redirect_uri,
  grant_type: 'authorization_code',
});

const authorize = (req, res) => {
  const state = uuid.v4();

  const queryString = querystring.stringify({
    client_id,
    response_type: 'code',
    redirect_uri,
    state,
    scope,
    show_dialog: true,
  });

  res.cookie('state', state);
  res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
};

const refreshToken = async (refresh_token) => spotify({
  refresh_token,
  grant_type: 'refresh_token',
});

module.exports = {
  authorizationCode,
  authorize,
  refreshToken,
};
