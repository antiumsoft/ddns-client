import {ZoneConfig, ZonesConfig} from "../config";
import AppConfig from "../config";
import * as fs from "fs";
import chalk from "chalk";
import * as process from "process";

export default class ConfigService {

    public addDnsZone(zone: string, params: ZoneConfig) {
        const config = ConfigService.getOrCreateConfig()
        zone = zone.toLowerCase();
        if (!!config[zone]) {
            console.log(chalk.red(`Error: Zone "${zone}" already exists`))
            return process.exit(1);
        }
        config[zone] = params;
        console.log(chalk.green('Configuration modified, trying to save...'))
        ConfigService.updateConfig(config);
    }

    public updateToken(zone: string, token: string) {
        zone = zone.toLowerCase()
        const config = ConfigService.checkZoneExist(zone);
        config[zone].token = token;
        ConfigService.updateConfig(config);
    }

    public deleteDnsZone(zone: string) {
        zone = zone.toLowerCase()
        const config = ConfigService.checkZoneExist(zone);
        delete config[zone];
        ConfigService.updateConfig(config);
    }

    public static getZones(): ZonesConfig {
        return this.getOrCreateConfig()
    }

    public static checkZoneExist(zone: string): ZonesConfig {
        const config = ConfigService.getOrCreateConfig()
        if (!config[zone]) {
            chalk.red(`Error: Zone "${zone}" doesn't exists`)
            return process.exit(1);
        }
        return config;
    }

    static updateConfig(config: ZonesConfig) {
        let configFilePath = AppConfig.getConfigFile();
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), {encoding: 'utf-8'})
        console.log(chalk.green('Configuration saved'))
    }

    private static getOrCreateConfig(): ZonesConfig {
        let configFilePath = AppConfig.getConfigFile();
        if (!fs.existsSync(configFilePath)) {
            fs.writeFileSync(configFilePath, "{}", {encoding: "utf-8"})
        }
        return JSON.parse(fs.readFileSync(configFilePath, {encoding: "utf-8"})) as ZonesConfig
    }
}