
const userSettings = require('user-settings');

function getSettings(chalk) {
  const config = userSettings.file('.codenow');
  const settings = {};

  settings.register = ({
    setting,
    get,
    validate,
    set,
  }) => {
    settings[setting] = {};

    settings[setting].get = () => {
      const value = get ? get() : config.get(setting);
      if (typeof value !== 'undefined') {
        return value;
      }
      return null;
    };

    settings[setting].set = (newSetting) => {
      validate(newSetting)
        .then(() => (set ? set(newSetting) : config.set(setting, newSetting)))
        .then(() => {
          console.log(chalk.green(`${setting} set to ${newSetting}`));
        })
        .catch((error) => {
          console.log(chalk.red(`${error}`));
        });
    };

    settings[setting].display = () => {
      const value = settings[setting].get();
      if (value) {
        console.log(chalk.green(`${setting} is currently ${settings[setting].get()}`));
      } else {
        console.log(chalk.red(`${setting} is not set`));
      }
    };
  };

  return settings;
}

module.exports = (container) => {
  container.service('settings', getSettings, 'chalk');
};
