const CryptoJS = require('crypto-js');

module.exports = (path, method, query, body, headers) => {
  const encode = { path, method, query, body, headers };
  const encoded = CryptoJS.MD5(JSON.stringify(encode)).toString();
  const moduleName = path.split('/')[1];

  return `${method.toLowerCase()}_${moduleName}_${encoded}`;
};
