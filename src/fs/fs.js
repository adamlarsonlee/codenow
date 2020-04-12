const fs = require('fs');

module.exports = (container) => {
  container.constant('fs', fs);
}