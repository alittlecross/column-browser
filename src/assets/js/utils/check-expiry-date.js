import getCookie from './get-cookie.js';
import refreshAccessToken from './_refresh-access-token.js';

export default async () => {
  if (new Date(+(getCookie('expiry_date') || 0)) < new Date()) {
    await refreshAccessToken();
  }
};
