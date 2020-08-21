function getDecorator(settings) {
  function decorate(program) {
    program
      .command('token [token]')
      .alias('t')
      .description('set remote access token')
      .option('-d, --display', 'display remote access token')
      .option('-s, --set', 'set remote access token')
      .action((token, options) => {
        if (options.display || !options.set) {
          settings.token.display();
        } else if (options.set) {
          settings.token.set(token);
        }
      });
    return program;
  }

  return decorate;
}

module.exports = (container) => {
  container.decorator(
    'program',
    getDecorator(
      container.container.settings,
    ),
  );
};
