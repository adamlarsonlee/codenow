function getDecorator(path, settings) {
  function parseDirectory(directory) {
    if (directory && directory[0] === '~') {
      return path.join(process.env.HOME, directory.slice(1));
    }
    return directory;
  }

  function decorate(program) {
    program
      .command('dir [directory]')
      .alias('d')
      .description('set local repositories directory')
      .option('-d, --display', 'display directory setting')
      .option('-s, --set', 'set the default directory')
      .action((directory, options) => {
        if (options.display || !options.set) {
          settings.dir.display();
        } else if (options.set) {
          const parsedDirectory = parseDirectory(directory);
          settings.dir.set(parsedDirectory);
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
    ),
  );
};
