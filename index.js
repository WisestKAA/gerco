const test = require('./lib/index');
const yargs = require('yargs');

yargs.command(
  'hello',
  'test yargs',
 {
  name: {
    alias: 'n',
    default: 'Unnamed',
  }
 },
 argv => { console.log(argv) }
).help()
.argv;
