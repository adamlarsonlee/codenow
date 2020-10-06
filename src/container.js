const Bottle = require('bottlejs');

const bottle = new Bottle();

require('./chalk/chalk')(bottle);
require('./exec/exec')(bottle);
require('./fs/fs')(bottle);
require('./path/path')(bottle);
require('./simple-git/simple-git')(bottle);
require('./url/url')(bottle);
require('./settings/container')(bottle);
require('./dir-service/dir-service')(bottle);
require('./program/container')(bottle);

module.exports = bottle.container;
