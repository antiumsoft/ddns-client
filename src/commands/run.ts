import {ZoneConfig, ZoneType} from "../config";
import {green, red} from "chalk";
import {Arguments} from "yargs";
import ConfigService from "../services/config.service";
import * as process from "process";
import ZoneService, {DNSRecordType} from "../services/zone.service";
import CloudflareService from "../services/cloudflare.service";
import {getIp} from "../utils/ip";

export default async function run(params: Arguments) {
    const zones: string[] = (params.zones as string[]).map(z => z.toLowerCase())
    const ip = await getIp()
    const config = ConfigService.getZones();

    if (zones.length > 0) {
        zones.forEach(ConfigService.checkZoneExist)
        zones.forEach(z => updateZone(z, ip))
    } else {
        Object.keys(config).forEach(z => updateZone(z, ip))
    }
}

async function updateZone(zone: string, ip: string) {
    const config = ConfigService.getZones();

    if (config[zone].lastUpdate && (config[zone].lastUpdate + (config[zone].ttl * 1000)) < new Date().getDate()) {
        if (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') {
            console.log(green('Zone'), green.bold(zone), green('before TTL, not updating'))
            return;
        }
    }

    let status = []
    const service: ZoneService = getService(config[zone].type, config[zone])
    for (let domain of config[zone].domains) {
        const result = await service.updateRecord(zone, domain, ip, DNSRecordType.A)
        status.push(`${domain}=${result}`)
    }

    config[zone].lastUpdate = new Date().getDate()
    config[zone].lastStatus = status.join('|')
    ConfigService.updateConfig(config)

}

function getService(type: ZoneType, zoneConfig: ZoneConfig): ZoneService {
    switch (type) {
        case ZoneType.CLOUDFLARE:
            return new CloudflareService(zoneConfig.token);
        default:
            console.log(red('Cannot find instance for Service:'), red.bold(type))
            process.exit(1)
    }
}