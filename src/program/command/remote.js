const fetch = require('node-fetch');

function getDecorator(settings, chalk) {
  function decorate(program) {
    program
      .command('remote [URL]')
      .alias('r')
      .description('set remote URL')
      .option('-d, --display', 'display remote setting')
      .option('-s, --set', 'set the default remote')
      .option('-l, --list', 'list remote repositories')
      .action((remote, options) => {
        if (options.display || !(options.set || options.list)) {
          settings.remote.display();
        } else if (options.set) {
          settings.remote.set(remote.toLowerCase());
        } else if (settings.remote.get()) {
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
            .then((repos) => repos.forEach((repo) => {
              console.log(`${chalk.green(repo.name)} ${chalk.blue(repo.url)}`);
            }))
            .catch((error) => console.error(error));
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
