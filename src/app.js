const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const spotify = require('./spotify');

const contextPath = process.env.CONTEXT_PATH || '';

const setCookies = (req, res, { access_token, expires_in, refresh_token }) => {
  const options = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    sameSite: 'lax',
  };

  res.cookie('access_token', access_token, options);
  res.cookie('expiry_date', Date.parse(new Date(Date.now() + expires_in * 1000)), options);
  res.cookie('refresh_token', refresh_token || req.cookies.refresh_token, options);
};

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(compression());
app.use(cookieParser());

app.use(`${contextPath}`, express.static('public'));

app.get(`${contextPath}`, async (req, res) => {
  if (req.cookies.access_token) {
    res.sendFile(path.join(__dirname, './index.html'));
  } else if (req.cookies.state) {
    if (req.cookies.state !== req.query.state) {
      throw new Error('Missing or invalid state');
    }

    res.clearCookie('state');

    setCookies(req, res, await spotify.authorizationCode(req.query.code));

    res.redirect('/');
  } else {
    spotify.authorize(req, res);
  }
});

app.put(`${contextPath}`, async (req, res) => {
  setCookies(req, res, await spotify.refreshToken(req.cookies.refresh_token));

  res.status(200).json({});
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);

  res.sendStatus(500);
});

module.exports = app;
