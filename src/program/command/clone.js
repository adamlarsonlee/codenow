const fetch = require('node-fetch');

function getDecorator(path, settings, git, url, chalk, dirService) {
  function decorate(program) {
    const clone = (repo) => {
      git
        .silent(true)
        .clone(
          repo.url,
          path.join(settings.dir.get(), repo.name),
        )
        .then(() => console.log(chalk.green(`cloned ${repo.name}`)))
        .catch((error) => console.log(chalk.red(error)));
    };

    program
      .command('clone [respository]')
      .alias('c')
      .description('clones the remote repository to the local repositories directory')
      .action((repository) => {
        if (repository) {
          const repositories = [];

          if (settings.token.get()) {
            const query = `{
              viewer {
                repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY], includeUserRepositories:true) {
                  totalCount
                  nodes {
                    name
                    url
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                }
              }
            }`;

            fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                Authorization: `bearer ${settings.token.get()}`,
              },
              body: JSON.stringify({ query }),
            })
              .then((res) => res.json())
              .then((res) => res.data.viewer.repositoriesContributedTo.nodes)
              .then((repos) => repos.map((repo) => (({ name: repo.name, url: repo.url }))))
              .then((repos) => repos.filter((repo) => repo.name === repository))
              .then((repos) => {
                let dirs;

                dirService.read((locals) => {
                  dirs = locals;
                });

                const notLocal = (repo) => !dirs.find((dir) => dir === repo.name);

                return repos.filter(notLocal);
              })
              .then((repos) => repos.forEach(clone))
              .catch((error) => console.error(error));
          } else {
            repositories.push(repository);
          }

          if (repositories.length) { repositories.forEach(clone); }
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
      container.container.dirService,
    ),
  );
};
