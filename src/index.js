#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const program = require('commander');
const simpleGit = require('simple-git')();
const userSettings = require('user-settings');
const settings = userSettings.file('.codenow');
const dirService = require('./dir-service/dir-service')(settings, fs);
const repoService = require('./repo-service/repo-service')(settings);

program.version('0.0.2');

program
  .option('-d, --dir [directory]', 'set local repositories directory')
  .option('-r, --repo [repository]', 'set remote repository')
  .option('--clone <repository>', 'clone repo from remote to local')
  .option('-l, --list', 'list repository names')
  .option('-c, --code', 'open dev environment only')
  .option('-p, --powershell [instances]', 'open powershell only')
  .parse(process.argv);

function handleDir(dir) {
  if (dir === true) {
    if (dirService.exists()) {
      console.log(chalk.green(`currently using ${settings.get('dir')}`));
    } else {
      console.log(chalk.red('dir is not set'));
    }
  } else if (dirService.exists(dir)) {
    dirService.setSetting(dir);
    console.log(chalk.green(`dir set to ${dir}`));
  } else {
    console.log(chalk.red(`${dir} does not exist`));
  }
}

function handleRepo(repo) {
  if (repo === true) {
    if (repoService.getSetting()) {
      console.log(chalk.green(`currently using ${settings.get('repo')}`));
    } else {
      console.log(chalk.red('repo is not set'));
    }
  } else {
    repoService.setSetting(repo);
    console.log(chalk.green(`repo set to ${repo}`));
  }
}

function handleList() {
  if (!dirService.settingExists()) {
    console.log(chalk.red('dir is not set'));
    return;
  }
  if (!dirService.exists()) {
    console.log(chalk.red(`${dirService.getSetting()} does not exist`));
    return;
  }
  dirService.read((err, items) => {
    items.forEach((item) => {
      console.log(chalk.green(item));
    });
  });
}

function handleClone(repository) {
  if (!dirService.settingExists()) {
    console.log(chalk.red('dir is not set'));
    return;
  }
  if (!dirService.exists()) {
    console.log(chalk.red(`${dirService.getDirSetting()} does not exist`));
    return;
  }
  if (!repoService.settingExists()) {
    console.log(chalk.red('repo is not set'));
    return;
  }
  simpleGit.clone(
    path.join(repoService.getSetting(), repository),
    path.join(dirService.getSetting(), repository),
  );
}

if (program.dir) {
  handleDir(program.dir);
} else if (program.repo) {
  handleRepo(program.repo);
} else if (program.list) {
  handleList();
} else if (program.clone) {
  handleClone(program.clone);
} else {
  const repository = path.join(dirService.getSetting(), program.args[0]);
  if (dirService.exists(repository)) {
    console.log(chalk.green(`found ${program.args[0]} in ${repository}`));
    if (program.powershell || (!program.powershell && !program.code)) {
      let instances = parseInt(program.powershell, 10);
      if (Number.isNaN(instances)) { instances = 1; }
      for (let i = 0; i < instances; i += 1) {
        exec(`powershell ${path.join(__dirname, 'start-powershell.ps1')} "${repository}"`);
      }
    }
    if (program.code || (!program.powershell && !program.code)) {
      exec(`code ${repository}`);
    }
  } else {
    console.log(chalk.red(`could not access ${repository}`));
  }
}
