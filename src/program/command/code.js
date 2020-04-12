function getDecorator(path, dirService, chalk, exec) {
  function decorate(program) {
    program
      .command('code <respository>')
      .alias('c')
      .description('open the repository in the configured IDE')
      .action((repository) => {
        const directory = path.join(dirService.getSetting(), repository);
        if (dirService.exists(directory)) {
          console.log(chalk.green(`found ${repository} in ${directory}`));
          exec(`code ${directory}`);
        } else {
          console.log(chalk.red(`could not access ${directory}`));
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
      container.container.chalk,
      container.container.exec,
    ),
  );
};
