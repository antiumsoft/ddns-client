import {GenericResponse} from "./GenericResponse";
import {DNSRecord} from "./GetZoneDNSRecordsResponse";

export interface DNSRecordResponse extends GenericResponse {
    result: DNSRecord
}