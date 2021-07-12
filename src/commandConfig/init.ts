import { CommandModule } from 'yargs'
import { init } from '../commands'

export default {
  command: 'init',
  aliases: ['i'],
  describe: 'Initializes the application',
  handler: init
} as CommandModule
