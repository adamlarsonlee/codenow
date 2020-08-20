function getDecorator(path, settings, exec) {
  function decorate(program) {
    program
      .command('edit [respository]', { isDefault: true })
      .alias('e')
      .description('open the repository in the configured editor')
      .option('-d, --display', 'display editor setting')
      .option('-s, --set', 'set the default editor')
      .action((repository, options) => {
        if (options.display || (!options.set && !repository)) {
          settings.editor.display();
        } else if (options.set) {
          settings.editor.set(repository.toLowerCase());
        } else {
          const directory = path.join(settings.dir.get(), repository);
          switch (settings.editor.get()) {
            case 'vscode':
              exec(`code ${directory}`);
              break;
            case 'atom':
              exec(`atom ${directory}`);
              break;
            default:
              break;
          }
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
