import * as path from "path";
import * as os from "os";

export interface AppConfig {
    path: string,
    winPath: string,
    filename: string,
    apiUrl: string,

    getConfigFile(): string

    getConfigPath(): string
}

export type ZonesConfig = { [zone: string]: ZoneConfig }

export const zoneTypes = ['cloudflare']
export type ZoneType = typeof zoneTypes[number]

export interface ZoneConfig {
    token: string,
    type: ZoneType,
    domains: string[],
    ttl: number,
    lastUpdate?: number,
    lastStatus?: string
}

export default {
    path: "/etc/cloudflare-ddns",
    winPath: path.join(__dirname, '..', 'config'),
    filename: "cloudflare-ddns.json",
    apiUrl: "https://api.cloudflare.com/client/v4/",
    getConfigPath(): string {
        if (os.platform() === "win32") {
            return path.join(this.winPath)
        } else {
            return path.join(this.path)
        }
    },
    getConfigFile(): string {
        return path.join(this.getConfigPath(), this.filename)
    }
} as AppConfig