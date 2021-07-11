import ZoneService from "./zone.service";

export default class CloudflareService implements ZoneService {
    getCurrentValue(zone: string, domain: string): boolean {
        return false;
    }

    listZone(zone: string): boolean {
        return false;
    }

    updateRecord(zone: string, domain: string, value: string): boolean {
        return false;
    }

}