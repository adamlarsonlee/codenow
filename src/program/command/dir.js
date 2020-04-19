function getDecorator(dirService, settings, chalk) {
  function decorate(program) {
    program
      .command('dir [directory]') // TODO: add optional subdirectory parameter
      .alias('d')
      .description('set local repositories directory')
      .action((directory) => {
        if (!directory) {
          if (dirService.exists()) {
            console.log(chalk.green(`currently using ${settings.get('dir')}`));
          } else {
            console.log(chalk.red('dir is not set'));
          }
        } else if (dirService.exists(directory)) {
          dirService.setSetting(directory);
          console.log(chalk.green(`dir set to ${directory}`));
        } else {
          console.log(chalk.red(`${directory} does not exist`));
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
      container.container.dirService,
      container.container.settings,
      container.container.chalk,
    ),
  );
};
