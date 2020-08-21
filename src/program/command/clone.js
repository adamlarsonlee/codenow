const fetch = require('node-fetch');

function getDecorator(path, settings, git, url, chalk, dirService) {
  function decorate(program) {
    const clone = (repo) => {
      git
        .silent(true)
        .clone(
          url.resolve(settings.repo.get(), `${repo}.git`),
          path.join(settings.dir.get(), repo),
        )
        .then(() => console.log(chalk.green(`cloned ${repo}`)))
        .catch((error) => console.log(chalk.red(error)));
    };

    program
      .command('clone [respository]')
      .alias('c')
      .description('clones the remote repository to the local repositories directory')
      .action((repository) => {
        if (repository) {
          const repositories = [];

          if (repository === '*') {
            const query = `{
              viewer {
                organization(login: "activated-research-company") {
                  repositories(first: 100) {
                    edges {
                      node {
                        name
                        url
                      }
                    }
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
              .then((res) => res.data.viewer.organization.repositories.edges)
              .then((repos) => repos.map((repo) => ({ name: repo.node.name, url: repo.node.url })))
              .then((repos) => repos.filter((repo) => repo.url.includes(settings.repo.get())))
              .then((repos) => repos.map((repo) => repo.name))
              .then((repos) => {
                let dirs;

                dirService.read((locals) => {
                  dirs = locals;
                });

                const notLocal = (repo) => {
                  return !dirs.find((dir) => dir === repo);
                };

                return repos.filter(notLocal);
              })
              .then((repos) => repos.forEach(clone))
              // .then(console.log)
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
