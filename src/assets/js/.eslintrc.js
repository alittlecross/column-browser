module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  globals: {
    Spotify: false,
    SpotifyPlayer: true,
    deviceId: true,
    previousTouch: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    camelcase: 0,
    'import/extensions': ['error', 'always'],
    'max-len': ['error', {
      code: 200,
    }],
    'no-alert': 0,
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-void': 0,
  },
};
