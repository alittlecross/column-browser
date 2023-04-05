export default async (url, options) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Request failed with status code ${res.status}.`);
  }

  return res.json();
};
