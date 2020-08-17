function repoService(settingsService) {
  const SETTING = 'repo';

  function getSetting() {
    return settingsService.get(SETTING);
  }

  function settingExists() {
    return typeof getSetting() !== 'undefined';
  }

  function setSetting(dir) {
    return settingsService.set(SETTING, dir);
  }

  return {
    getSetting,
    settingExists,
    setSetting,
  };
}

module.exports = repoService;
