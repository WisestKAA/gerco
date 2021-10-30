#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');

const getConfig = require('./lib/get-config');
const gen = require('./lib/gen');

const config = getConfig(path.join(__dirname, '..'));

yargs.command(
  'gen',
  'Generate',
 {
  type: {
    alias: 't',
    default: 'component',
  },
  name: {
    alias: 'n',
  },
  'style-import-name': {
    alias: 'sin'
  }
 },
 argv => { 
   try {
     gen(config, argv.type, argv.name, argv['style-import-name'])
   } catch (err) {
     console.log(err);
   }
 }
).help()
.argv;
