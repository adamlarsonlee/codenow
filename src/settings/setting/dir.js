const getDecorator = (fs) => {
  const setting = 'dir';

  const validate = (dir) => {
    return new Promise((resolve, reject) => {
      if (!dir) { reject(new Error('dir is empty')); }
      else if (!fs.existsSync(dir)) { reject(new Error('dir does not exist')); }
      else { resolve(); }
    });
  };

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
    getDecorator(
      container.container.fs,
    ),
  );
};
