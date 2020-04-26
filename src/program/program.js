const program = require('commander');

function getProgram() {
  return program;
}

module.exports = (container) => {
  container.service('program', getProgram);
};
