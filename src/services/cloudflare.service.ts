import ZoneService, {DNSRecordType} from "./zone.service";
import cloudflare from "../axios/cloudflare";
import {AxiosInstance} from "axios";
import {GetZonesResponse} from "./cloudflare/GetZonesResponse";
import {DNSRecord, GetZoneDNSRecordsResponse} from "./cloudflare/GetZoneDNSRecordsResponse";
import {DNSRecordResponse} from "./cloudflare/DNSRecordResponse";

export default class CloudflareService implements ZoneService {
    private apiToken: string;
    private axios: AxiosInstance;

    constructor(apiToken: string) {
        this.apiToken = apiToken
        this.axios = cloudflare()
        this.axios.defaults.headers = {
            "Authorization": `Bearer ${this.apiToken}`
        }
    }

    async getCurrentValue(zone: string, domain: string): Promise<DNSRecord[]> {
        const {result} = await this.listZone(zone)
        return result.filter(dns => dns.name.toLowerCase() === domain)
    }

    async listZone(zone: string): Promise<GetZoneDNSRecordsResponse> {
        const zones = await this.listZones(zone)
        const zoneId = zones.result.map(zone => zone.id).pop()
        const response = (await this.axios.get(`/zones/${zoneId}/dns_records`)).data as GetZoneDNSRecordsResponse
        if (response.success) return response
        else throw response;
    }

    async updateRecord(zone: string, domain: string, value: string, type: DNSRecordType): Promise<DNSRecord> {
        const zoneDetail = (await this.listZones(zone)).result.pop()
        const currentValue = (await this.getCurrentValue(zone, domain)).filter(dnsRecord => dnsRecord.type === type).pop()

        const data = {
            type: DNSRecordType.A,
            name: domain,
            content: value,
            ttl: 1
        }

        let response;
        if (currentValue) {
            // it exist
            response = (await this.axios.put(`/zones/${zoneDetail.id}/dns_records/${currentValue.id}`, data)).data as DNSRecordResponse
        } else {
            // it doesn't exist, we need to create it
            response = (await this.axios.post(`/zones/${zoneDetail.id}/dns_records`, data)).data as DNSRecordResponse
        }

        if (response.success) {
            return response.result
        } else throw response
    }

    private async listZones(zoneDomain: string): Promise<GetZonesResponse> {
        const result = (await this.axios.get(`/zones?name=${zoneDomain}`)).data as GetZonesResponse
        if (result.success) return result;
        else throw result;
    }

}