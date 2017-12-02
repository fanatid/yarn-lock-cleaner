#!/usr/bin/env node
const fs = require('fs')
const yargs = require('yargs')
const transform = require('../')

const { argv } = yargs
  .usage('Usage: $0 [options]')
  .option('filename', {
    alias: 'f',
    demandOption: true,
    describe: 'path to yarn.lock',
    type: 'string'
  })
  .option('rewrite', {
    alias: 'r',
    default: false,
    describe: 'rewrite yarn.lock',
    type: 'boolean'
  })
  .help('help').alias('help', 'h')

const content = transform(fs.readFileSync(argv.filename, 'utf8'))
if (argv.rewrite) fs.writeFileSync(argv.filename, content, 'utf8')
else process.stdout.write(content)
