const axios = require('axios');
const timeout = 10000;

module.exports = async (baseURL, { path: url, method, query: params, body: data, headers }) => {
  let response;

  try {
    response = await axios.request({ baseURL, timeout, url, method, headers, params, data });
  } catch (err) {
    if (err.response.status && err.response.data) response = err.response;
    else throw err;
  }

  return { status: response.status, data: response.data };
};
