function decorate(settings) {
  settings.register({
    setting: 'dir',
  });
  return settings;
}

module.exports = (container) => {
  container.decorator('settings', decorate);
};
