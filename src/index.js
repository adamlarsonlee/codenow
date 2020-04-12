#!/usr/bin/env node

const {
  chalk,
  path,
  program,
  settings,
  dirService,
} = require('./container');

const simpleGit = require('simple-git')();
const repoService = require('./repo-service/repo-service')(settings);

program
  .option('-d, --dir [directory]', 'set local repositories directory')
  .option('-r, --repo [repository]', 'set remote repository')
  .option('--clone <repository>', 'clone repo from remote to local')
  .option('-p, --powershell [instances]', 'open powershell only');

program.parse(process.argv);

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
} else if (program.clone) {
  handleClone(program.clone);
}