
const userSettings = require('user-settings');

function getSettings() {
  return userSettings.file('.codenow');
}

module.exports = (container) => {
  container.service('settings', getSettings);
};
