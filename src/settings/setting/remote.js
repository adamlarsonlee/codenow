const getDecorator = () => {
  const setting = 'remote';

  const validate = (remote) => new Promise((resolve, reject) => {
    if (!remote) {
      reject(new Error('remote is empty'));
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
