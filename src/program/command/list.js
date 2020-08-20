function getDecorator(dirService, chalk) {
  function decorate(program) {
    program
      .command('list') // TODO: add optional subdirectory parameter
      .alias('l')
      .description('list all local repositories')
      .action(() => {
        dirService.read((items) => {
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
