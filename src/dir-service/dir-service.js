function getDirService(settings, fs) {
  function exists(dir) {
    if (dir) { return fs.existsSync(dir); }
    if (settings.dir.exists()) { return fs.existsSync(settings.dir.get()); }
    return false;
  }

  function read(callback) {
    return fs.readdir(settings.dir.get(), callback);
  }

  return {
    exists,
    read,
  };
}

module.exports = (container) => {
  container.service('dirService', getDirService, 'settings', 'fs');
};
