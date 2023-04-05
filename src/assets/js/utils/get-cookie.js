export default (cookie) => document.cookie.split('; ').find((e) => e.startsWith(cookie))?.slice(cookie.length + 1);
