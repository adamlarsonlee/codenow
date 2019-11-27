function repoService(settingsService) {
  const setting = 'repo';

  function settingExists() {
    return typeof settingsService.get(setting) !== 'undefined';
  }

  function getSetting() {
    return settingsService.get(setting);
  }

  function setSetting(dir) {
    return settingsService.set(setting, dir);
  }

  return {
    settingExists,
    getSetting,
    setSetting,
  };
}

module.exports = repoService;
