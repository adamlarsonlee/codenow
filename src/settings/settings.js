
const userSettings = require('user-settings');

function getSettings() {
  const config = userSettings.file('.codenow');
  const settings = {};

  settings.register = ({
    setting,
    get,
    exists,
    validate,
    set,
  }) => {
    const getSetting = () => config.get(setting);

    settings[setting] = {
      get: () => (get ? get() : config.get(setting)),
      exists: () => (exists ? exists() : typeof getSetting() !== 'undefined'),
      validate: (newSetting) => (validate ? validate(newSetting) : true),
      set: (newSetting) => (set ? set(newSetting) : config.set(setting, newSetting)),
    };
  };

  return settings;
}

module.exports = (container) => {
  container.service('settings', getSettings);
};
