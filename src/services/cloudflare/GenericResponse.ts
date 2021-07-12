export interface GenericResponse {
  success: boolean
  errors: any[]
  messages: string[]
}

export enum ZoneType {
  FULL = 'full',
  PARTIAL = 'partial'
}

export enum ZoneStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  INITIALIZING = 'initializing',
  MOVED = 'moved',
  DELETED = 'deleted',
  DEACTIVATED = 'deactivated'
}

export interface ZonePlan {
  id: string
  name: string
  price: number
  currency: string
  frequency: string
  legacy_id: string
  is_subscribed: boolean
  can_subscribe: boolean
}

export interface ZoneAccount {
  id: string
  name: string
}

export interface ZoneOwner {
  id: any
  email: any
  type: ZoneOwnerType
}

export enum ZoneOwnerType {
  USER = 'user'
}
