function getDecorator(settings) {
  function decorate(program) {
    program
      .command('repo [respository]')
      .alias('r')
      .description('set remote repository root')
      .option('-d, --display', 'display repository setting')
      .option('-s, --set', 'set the default repository')
      .action((repository, options) => {
        if (options.display || !options.set) {
          settings.repo.display();
        } else if (options.set) {
          settings.repo.set(repository.toLowerCase());
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
