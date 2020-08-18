const getDecorator = () => {
  const setting = 'shell';

  const validate = (shell) => new Promise((resolve, reject) => {
    if (!shell) {
      reject(new Error('shell is empty'));
    } else {
      switch (shell) {
        case 'xfce4':
        case 'powershell':
          resolve();
          break;
        default:
          reject(new Error('shell type not supported'));
      }
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
