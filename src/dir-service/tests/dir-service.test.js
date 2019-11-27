const o = require('ospec');
const getNewDirService = require('../dir-service');

o.spec('dir service', () => {
  let dirService;

  o.beforeEach(() => {
    dirService = getNewDirService();
  });
});