export default interface ZoneService {
    updateRecord(zone: string, domain: string, value: string, type: DNSRecordType): any

    listZone(zone: string): any

    getCurrentValue(zone: string, domain: string): any
}

export enum DNSRecordType {
    A = "A",
    AAAA = "AAAA",
    CNAME = "CNAME",
    HTTPS = "HTTPS",
    TXT = "TXT",
    SRV = "SRV",
    LOC = "LOC",
    MX = "MX",
    NS = "NS",
    SPF = "SPF",
    CERT = "CERT",
    DNSKEY = "DNSKEY",
    DS = "DS",
    NAPTR = "NAPTR",
    SMIMEA = "SMIMEA",
    SSHFP = "SSHFP",
    SVCB = "SVCB",
    TLSA = "TLSA",
    URI = "URI"
}
