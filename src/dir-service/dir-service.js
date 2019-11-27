function dirService(settingsService, fileService) {
  const setting = 'dir';

  function settingExists() {
    return typeof settingsService.get(setting) !== 'undefined';
  }

  function getSetting() {
    return settingsService.get(setting);
  }

  function setSetting(dir) {
    return settingsService.set(setting, dir);
  }

  function exists(dir) {
    if (dir) { return fileService.existsSync(dir); }
    if (settingExists()) { return fileService.existsSync(getSetting()); }
    return false;
  }

  function read(callback) {
    if (!settingExists()) { callback('dir not set'); }
    if (!exists()) { callback('dir does not exist');; }
    if (exists()) { return fileService.readdir(getSetting(), callback); }
  }

  return {
    settingExists,
    getSetting,
    setSetting,
    exists,
    read,
  };
}

module.exports = dirService;
