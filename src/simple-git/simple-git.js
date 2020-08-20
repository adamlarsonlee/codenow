const simpleGit = require('simple-git/promise')();

module.exports = (container) => {
  container.constant('git', simpleGit);
};
