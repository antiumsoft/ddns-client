import * as path from "path";
import * as os from "os";

export interface AppConfig {
    path: string,
    winPath: string,
    filename: string,
    cloudflareUrl: string,

    getConfigFile(): string

    getConfigPath(): string
}

export type ZonesConfig = { [zone: string]: ZoneConfig }

export enum ZoneType {
    CLOUDFLARE = "CLOUDFLARE"
}

export interface ZoneConfig {
    token: string,
    type: ZoneType,
    domains: string[],
    ttl: number,
    lastUpdate?: number,
    lastStatus?: string
}

export default {
    path: "/etc/ddns-client",
    winPath: path.join(__dirname, '..', 'config'),
    filename: "ddns-client.json",
    cloudflareUrl: "https://api.cloudflare.com/client/v4/",
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