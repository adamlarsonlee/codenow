function getDecorator(path, settings, git, url, chalk) {
  function decorate(program) {
    program
      .command('clone [respository]')
      .alias('c')
      .description('clones the remote repository to the local repositories directory')
      .action((repository) => {
        if (repository) {
          git
            .silent(true)
            .clone(
              url.resolve(settings.repo.get(), `${repository}.git`),
              path.join(settings.dir.get(), repository),
            )
            .then(() => console.log(chalk.green(`cloned ${repository}`)))
            .catch((error) => console.log(chalk.red(error)));
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
      container.container.git,
      container.container.url,
      container.container.chalk,
    ),
  );
};
