/* eslint-disable global-require */
module.exports = (container) => {
  require('./settings')(container);
  require('./setting/dir')(container);
  require('./setting/shell')(container);
  require('./setting/editor')(container);
  require('./setting/repo')(container);
  require('./setting/token')(container);
};
