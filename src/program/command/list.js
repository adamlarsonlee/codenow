function getDecorator(dirService, chalk) {
  function decorate(program) {
    program
      .command('list') // TODO: add optional subdirectory parameter
      .alias('l')
      .description('list all local repositories')
      .action(() => {
        if (!dirService.settingExists()) {
          console.log(chalk.red('dir is not set'));
          return;
        }
        if (!dirService.exists()) {
          console.log(chalk.red(`${dirService.getSetting()} does not exist`));
          return;
        }
        dirService.read((err, items) => {
          items.forEach((item) => {
            console.log(chalk.green(item));
          });
        });
      });
    return program;
  }

  return decorate;
}

module.exports = (container) => {
  container.decorator(
    'program',
    getDecorator(
      container.container.dirService,
      container.container.chalk,
    ),
  );
};
