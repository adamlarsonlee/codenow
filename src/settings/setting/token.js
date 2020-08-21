const getDecorator = () => {
  const setting = 'token';

  const validate = (token) => new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('token is empty'));
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
