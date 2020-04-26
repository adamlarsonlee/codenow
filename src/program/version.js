function decorate(program) {
  program.version('0.0.3');
  return program;
}

module.exports = (container) => {
  container.decorator('program', decorate);
};
