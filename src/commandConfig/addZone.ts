import { addZone } from '../commands'
import { CommandModule } from 'yargs'
import { ZoneType } from '../config'

export default {
  command: 'addzone <zoneName> [type] [apiToken] [ttl] <domains...>',
  aliases: ['a'],
  describe: 'Adds a zone to the configuration',
  handler: addZone,
  builder: {
    zoneName: {
      describe: 'Name of the DNS Zone',
      demand: true
    },
    type: {
      describe: 'Type of DDNS Server',
      type: 'string',
      choices: Object.keys(ZoneType),
      alias: 't',
      demand: true
    },
    apiToken: {
      describe: 'API Token to edit the zone',
      alias: 'a',
      demand: true
    },
    ttl: {
      describe: 'Time to Live, in seconds; default 300 seconds (5minutes)',
      demand: true,
      default: 300,
      type: 'number'
    },
    domains: {
      describe: 'List of domains to update',
      demand: true,
      array: true
    }
  }
} as CommandModule
