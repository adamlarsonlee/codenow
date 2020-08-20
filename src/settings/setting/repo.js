const getDecorator = () => {
  const setting = 'repo';

  const validate = (repo) => new Promise((resolve, reject) => {
    if (!repo) {
      reject(new Error('repo is empty'));
    } else {
      resolve();
    }
  });

  const decorate = (settings) => {
    settings.register({
      setting,
      validate,
    });

    return settings;
  };

  return decorate;
};

module.exports = (container) => {
  container.decorator(
    'settings',
    getDecorator(),
  );
};
