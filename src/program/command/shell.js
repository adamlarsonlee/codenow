function getDecorator(path, dirService, settings, chalk, exec) {
  function decorate(program) {
    program
      .command('shell [respository] [instances]')
      .alias('s')
      .option('-d, --display', 'display shell setting')
      .option('-s, --set', 'set the default shell')
      .description('open the respository in the configured shell')
      .action((repository, instances, options) => {
        if (options.display) {
          settings.shell.display();
        } else if (options.set) {
          settings.shell.set(repository.toLowerCase());
        } else {
          const callback = (error, stdout, stderr) => {
            console.log(chalk.red(stderr));
          };
          const directory = path.join(settings.dir.get(), repository);
          if (dirService.exists(directory)) {
            let parsedInstances = parseInt(instances, 10);
            if (Number.isNaN(parsedInstances)) { parsedInstances = 1; }
            for (let i = 0; i < parsedInstances; i += 1) {
              switch (settings.shell.get()) {
                case 'xfce4':
                  exec(`xfce4-terminal --working-directory=${directory}`, callback);
                  break;
                case 'powershell':
                  exec(`powershell ${path.join(__dirname, '../../start-powershell.ps1')} "${directory}"`, callback);
                  break;
                default:
              }
            }
          } else {
            console.log(chalk.red(`could not access ${directory}`));
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
      container.container.dirService,
      container.container.settings,
      container.container.chalk,
      container.container.exec,
    ),
  );
};
