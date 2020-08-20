const getDecorator = () => {
  const setting = 'ide';

  const validate = (ide) => new Promise((resolve, reject) => {
    if (!ide) {
      reject(new Error('ide is empty'));
    } else {
      switch (ide) {
        case 'vscode':
          resolve();
          break;
        default:
          reject(new Error('IDE not supported'));
      }
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
