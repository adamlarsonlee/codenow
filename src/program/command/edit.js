function getDecorator(path, settings, exec) {
  function decorate(program) {
    program
      .command('edit [respository]')
      .alias('e')
      .description('open the repository in the configured editor')
      .option('-d, --display', 'display editor setting')
      .option('-s, --set', 'set the default editor')
      .action((repository, options) => {
        if (options.display) {
          settings.editor.display();
        } else if (options.set) {
          settings.editor.set(repository.toLowerCase());
        } else {
          // TODO: add more editors
          const directory = path.join(settings.dir.get(), repository);
          exec(`code ${directory}`);
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
      container.container.settings,
      container.container.exec,
    ),
  );
};
