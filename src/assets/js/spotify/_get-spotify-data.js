import utils from '../utils/index.js';

export default async (url) => utils.fetchApi(url, {
  headers: {
    Authorization: `Bearer ${utils.getCookie('access_token')}`,
  },
});
