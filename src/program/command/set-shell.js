function getDecorator(settings, chalk) {
  function parseShell(shell) {
    const lowerShell = shell.toLowerCase();
    switch (lowerShell.toLowerCase()) {
      case 'powershell':
      case 'xfce4':
        return lowerShell;
      default:
        return false;
    }
  }

  function decorate(program) {
    program
      .command('set-shell <shell>')
      .description('set local repositories directory')
      .action((shell) => {
        const parsedShell = parseShell(shell);
        if (!parsedShell) {
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
      container.container.settings,
      container.container.chalk,
    ),
  );
};
