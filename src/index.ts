#!/usr/bin/env node

import yargs from 'yargs'
import intro from './messages/intro'
import { addZoneConfig, delZoneConfig, initConfig, runConfig, updateTokenConfig } from './commandConfig'
import { red } from 'chalk'

console.log(intro)

const isRoot = () => process.getuid && process.getuid() === 0

if (!isRoot()) {
  console.log(red('user does not have admin privileges'))
  process.exit(1)
}

// eslint-disable-next-line no-unused-expressions
yargs
  .command(addZoneConfig)
  .command(delZoneConfig)
  .command(updateTokenConfig)
  .command(initConfig)
  .command(runConfig)
  .help()
  .demandCommand()
  .showHelpOnFail(true).argv
