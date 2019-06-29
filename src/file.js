const fs = require('fs');

module.exports = (baseDir) => {
  const fullPath = (filename) => {
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
    return `${baseDir}/${filename}.json`;
  };
  
  const checkIfFileExists = (filename) => {
    try {
      return (fs.existsSync(fullPath(filename)));
    } catch (err) {
      return false;
    }
  };
  
  const storeData = (data, filename) => {
    try {
      fs.writeFileSync(fullPath(filename), JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
    }
  };

  const loadData = (filename) => {
    try {
      const data = fs.readFileSync(fullPath(filename), 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
      return {};
    }
  };

  return { checkIfFileExists, loadData, storeData };
};
