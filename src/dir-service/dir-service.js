function getDirService(settings, fs) {
  const setting = 'dir';

  function settingExists() {
    return typeof settings.get(setting) !== 'undefined';
  }

  function getSetting() {
    return settings.get(setting);
  }

  function setSetting(dir) {
    return settings.set(setting, dir);
  }

  function exists(dir) {
    if (dir) { return fs.existsSync(dir); }
    if (settingExists()) { return fs.existsSync(getSetting()); }
    return false;
  }

  function read(callback) {
    if (!settingExists()) { callback('dir not set'); }
    if (!exists()) { callback('dir does not exist'); }
    if (exists()) { return fs.readdir(getSetting(), callback); }
  }

  return {
    settingExists,
    getSetting,
    setSetting,
    exists,
    read,
  };
}

module.exports = (container) => {
  container.service('dirService', getDirService, 'settings', 'fs');
};
