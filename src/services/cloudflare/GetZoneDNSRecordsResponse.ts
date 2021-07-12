import { GetZonesResponse } from './GetZonesResponse'
import { GenericResponse } from './GenericResponse'
import { DNSRecordType } from '../zone.service'

export interface GetZoneDNSRecordsResponse extends GenericResponse {
  result: DNSRecord[]
}

export interface DNSRecord {
  id: string
  name: string
  ttl: number
  zone_id: string
  modified_on: Date
  created_on: Date
  proxiable: boolean
  content: string
  type: DNSRecordType
  proxied: boolean
  zone_name: string
  data: any
  locked: boolean
  meta: DNSRecordMeta
}

export interface DNSRecordMeta {
  auto_added: boolean
  source: string
}
