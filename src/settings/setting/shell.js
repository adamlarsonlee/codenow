function decorate(settings) {
  settings.register({
    setting: 'shell',
  });
  return settings;
}

module.exports = (container) => {
  container.decorator('settings', decorate);
};
