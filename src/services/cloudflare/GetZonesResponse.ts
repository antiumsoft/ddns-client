import { GenericResponse, ZoneAccount, ZoneOwner, ZonePlan, ZoneStatus, ZoneType } from './GenericResponse'

export interface GetZonesResponse extends GenericResponse {
  result: Zone[]
}

export interface Zone {
  id: string
  name: string
  development_mode: number
  original_name_servers: string[]
  original_registrar: string
  original_dnshost: string
  created_on: Date
  modified_on: Date
  activated_on: Date
  owner: ZoneOwner
  account: ZoneAccount
  permissions: string[]
  plan: ZonePlan
  plan_pending: ZonePlan
  status: ZoneStatus
  paused: boolean
  type: ZoneType
  name_servers: string[]
}
