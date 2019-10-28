const chalk = require('chalk');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const program = require('commander');
const userSettings = require('user-settings');

program.version('0.0.1');
const settings = userSettings.file('.codenow');

program
  .option('-d, --dir [directory]', 'set repositories directory')
  .parse(process.argv);

if (program.dir) {
  if (program.dir === true) {
    console.log(chalk.green(`currently using ${settings.get('dir')}`));
  } else if (fs.existsSync(program.dir)) {
    settings.set('dir', program.dir);
    console.log(chalk.green(`dir set to ${program.dir}`));
  } else {
    console.log(chalk.red(`${program.dir} does not exist`));
  }
} else {
  const repository = path.join(settings.get('dir'), program.args[0]);
  if (fs.existsSync(repository)) {
    console.log(chalk.green(`found ${program.args[0]} in ${repository}`));
    exec(`powershell ${path.join(__dirname, 'start-powershell.ps1')} "${repository}"`);
    exec(`code ${repository}`);
  } else {
    console.log(chalk.red(`could not access ${repository}`));
  }
}
