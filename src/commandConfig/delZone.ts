import { delZone } from '../commands'
import { CommandModule } from 'yargs'

export default {
  command: 'delzone <zoneName>',
  aliases: ['d'],
  describe: 'Deletes a zone from the configuration',
  handler: delZone,
  builder: {
    zoneName: {
      describe: 'Name of the DNS Zone',
      demand: true
    }
  }
} as CommandModule
