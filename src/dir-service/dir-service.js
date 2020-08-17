function getDirService(settings, fs) {
  function getSetting() {
    return settings.dir.get();
  }

  function exists(dir) {
    if (dir) { return fs.existsSync(dir); }
    if (settings.dir.exists()) { return fs.existsSync(getSetting()); }
    return false;
  }

  function read(callback) {
    if (!settings.dir.exists()) { callback('dir not set'); }
    if (!exists()) { callback('dir does not exist'); }
    if (exists()) { return fs.readdir(getSetting(), callback); }
    return null;
  }

  return {
    exists,
    read,
  };
}

module.exports = (container) => {
  container.service('dirService', getDirService, 'settings', 'fs');
};
