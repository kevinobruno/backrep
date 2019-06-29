const _ = require('lodash');
const hash = require('./hash');
const proxy = require('./proxy');
const { checkIfFileExists, loadData, storeData } = require('./file')('records');

const headersWhiteList = [
  'Authorization',
];

module.exports = (proxyUrl) => {
  const acceptedHeaders = (headers) => {
    return _.pick(headers, headersWhiteList.map(header => header.toLowerCase()));
  };

  return async (req, res) => {
    const { path, method, query, body, headers } = req;
    const filename = hash(path, method, query, body, acceptedHeaders(headers));

    let response;

    if (checkIfFileExists(filename)) {
      response = loadData(filename);
    } else {
      try {
        response = await proxy(proxyUrl, req);
        storeData({ path, method, query, body, headers, ...response }, filename);
      } catch (err) {
        return res.status(500).send();
      }
    }

    return res.status(response.status).send(response.data);
  };
};
