function getDecorator(path, dirService, settings, chalk) {
  function parseDirectory(directory) {
    if (directory[0] === '~') {
      return path.join(process.env.HOME, directory.slice(1));
    }
    return directory;
  }

  function decorate(program) {
    program
      .command('dir [directory]') // TODO: add optional subdirectory parameter
      .alias('d')
      .description('set local repositories directory')
      .action((directory) => {
        const parsedDirectory = parseDirectory(directory);
        if (!directory) {
          if (dirService.exists()) {
            console.log(chalk.green(`currently using ${settings.get('dir')}`));
          } else {
            console.log(chalk.red('dir is not set'));
          }
        } else if (dirService.exists(parsedDirectory)) {
          dirService.setSetting(parsedDirectory);
          console.log(chalk.green(`dir set to ${parsedDirectory}`));
        } else {
          console.log(chalk.red(`${parsedDirectory} does not exist`));
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
      container.container.path,
      container.container.dirService,
      container.container.settings,
      container.container.chalk,
    ),
  );
};
