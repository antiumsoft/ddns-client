import fs from 'fs'
import config from '../config'
import { green } from 'chalk'

export default function init() {
  if (!fs.existsSync(config.getConfigPath())) {
    fs.mkdirSync(config.getConfigPath())
    console.log(green('creating directory'), green.bold(config.getConfigPath()))
  } else {
    console.log(green('directory'), green.bold(config.getConfigPath()), green('already exists'))
  }
  if (!fs.existsSync(config.getConfigFile())) {
    fs.writeFileSync(config.getConfigFile(), '{}', { encoding: 'utf-8' })
    console.log(green('creating config file'), green.bold(config.getConfigFile()))
  } else {
    console.log(green('config file'), green.bold(config.getConfigFile()), green('already exists'))
  }
}
