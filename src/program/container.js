/* eslint-disable global-require */
module.exports = (container) => {
  require('./program')(container);
  require('./version')(container);
  require('./command/edit')(container);
  require('./command/dir')(container);
  require('./command/list')(container);
  require('./command/shell')(container);
  require('./command/remote')(container);
  require('./command/clone')(container);
  require('./command/token')(container);
};
