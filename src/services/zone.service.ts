export default interface ZoneService {
    updateRecord(zone: string, domain: string, value: string): boolean

    listZone(zone: string): boolean

    getCurrentValue(zone: string, domain: string): boolean
}