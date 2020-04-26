function decorate(program) {
  program.option('-d, --dir [directory]', 'set local repositories directory');
  return program;
}

module.exports = (container) => {
  container.decorate('program', decorate);
}