#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const program = require('commander');
const userSettings = require('user-settings');

program.version('0.0.2');
const settings = userSettings.file('.codenow');

program
  .option('-d, --dir [directory]', 'set repositories directory')
  .option('-l, --list', 'list repository names')
  .parse(process.argv);

function handleDir(dir) {
  if (program.dir === true) {
    if (settings.get('dir')) {
      console.log(chalk.green(`currently using ${settings.get('dir')}`));
    } else {
      console.log(chalk.red('dir is not set'));
    }
  } else if (fs.existsSync(program.dir)) {
    settings.set('dir', program.dir);
    console.log(chalk.green(`dir set to ${program.dir}`));
  } else {
    console.log(chalk.red(`${program.dir} does not exist`));
  }
}

function handleList() {
  const dir = settings.get('dir')
  if (!dir) {
    console.log(chalk.red('dir is not set'));
    return;
  }
  if (!fs.existsSync(dir)) {
    console.log(chalk.red(`${program.dir} does not exist`));
    return;
  }
  fs.readdir(dir, (err, items) => {
    items.forEach((item) => {
      console.log(chalk.green(item));
    })
  });
}

if (program.dir) {
  handleDir(program.dir);
} else if (program.list) {
  handleList();
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
