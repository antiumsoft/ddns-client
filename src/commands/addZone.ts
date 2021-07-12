import { Arguments } from 'yargs'
import { green } from 'chalk'
import { ZoneConfig, ZoneType } from '../config'
import ValidationService from '../services/validation.service'
import ConfigService from '../services/config.service'

const validation = new ValidationService()
const configService = new ConfigService()

export default function addZone(params: Arguments) {
  const { zoneName, domains, ttl, apiToken, type } = params
  console.log(green('Adding zone'), green.bold(zoneName), green('with a TTL of'), green.bold(ttl))
  console.log(green('With domains:'), (domains as string[]).map((d) => green.bold(d)).join(green(' - ')))
  const zoneConfig: ZoneConfig = {
    token: apiToken as string,
    ttl: ttl as number,
    type: type as ZoneType,
    domains: (domains as string[]).map((d) => d.toLowerCase())
  }
  validation.validateDomains(zoneName as string, domains as string[])
  configService.addDnsZone(zoneName as string, zoneConfig)
}
