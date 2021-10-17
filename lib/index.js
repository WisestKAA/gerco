const yargs = require('yargs');

const test = () => {  
  console.log('in lib')
  yargs.command('hello [name]', 'test yargs', yargs => {
    return yargs.positional('name', { describe: 'Your name' })
  }, argv => { console.log(argv) })
};

module.exports = test;