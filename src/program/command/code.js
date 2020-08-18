function getDecorator(path, settings, exec) {
  function decorate(program) {
    program
      .command('code <respository>')
      .alias('c')
      .description('open the repository in the configured IDE')
      .action((repository) => {
        const directory = path.join(settings.dir.get(), repository);
        exec(`code ${directory}`);
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
      container.container.settings,
      container.container.exec,
    ),
  );
};
