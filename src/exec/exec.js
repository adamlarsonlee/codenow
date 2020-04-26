const { exec } = require('child_process');

module.exports = (container) => {
  container.constant('exec', exec);
};
