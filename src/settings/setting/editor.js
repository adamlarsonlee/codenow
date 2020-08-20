const getDecorator = () => {
  const setting = 'editor';

  const validate = (editor) => new Promise((resolve, reject) => {
    if (!editor) {
      reject(new Error('editor is empty'));
    } else {
      switch (editor) {
        case 'vscode':
          resolve();
          break;
        default:
          reject(new Error('editor not supported'));
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
