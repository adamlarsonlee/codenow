function getDecorator(path, dirService, chalk, exec) {
  function decorate(program) {
    program
      .command('shell <respository> [instances]')
      .alias('s')
      .description('open the respository in the configured shell')
      .action((repository, instances) => {
        const directory = path.join(dirService.getSetting(), repository);
        if (dirService.exists(directory)) {
          console.log(chalk.green(`found ${repository} in ${directory}`));
          let parsedInstances = parseInt(instances, 10);
          if (Number.isNaN(parsedInstances)) { parsedInstances = 1; }
          for (let i = 0; i < parsedInstances; i += 1) {
            if (process.platform === 'linux') {
              exec(`xfce4-terminal --working-directory=${directory}`);
            } else {
              exec(`powershell ${path.join(__dirname, '../../start-powershell.ps1')} "${directory}"`);
            }
          }
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
