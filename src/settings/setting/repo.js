function decorate(settings) {
  settings.register({
    setting: 'repo',
  });
  return settings;
}

module.exports = (container) => {
  container.decorator('settings', decorate);
};
