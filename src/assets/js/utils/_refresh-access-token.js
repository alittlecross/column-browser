import api from './fetch-api.js';

export default async () => api('/', {
  method: 'PUT',
});
