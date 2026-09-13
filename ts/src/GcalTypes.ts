// Typed models for the Gcal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Event {
  created?: string
  description?: string
  end?: Record<string, any>
  htmlLink?: string
  id?: string
  location?: string
  start?: Record<string, any>
  status?: string
  summary?: string
  updated?: string
}

export interface EventLoadMatch {
  id: string
}

export interface EventListMatch {
  order_by?: string
  single_event?: boolean
}

export interface EventCreateData {
  created?: string
  description?: string
  end?: Record<string, any>
  htmlLink?: string
  id?: string
  location?: string
  start?: Record<string, any>
  status?: string
  summary?: string
  updated?: string
}

export interface EventUpdateData {
  id: string
  created?: string
  description?: string
  end?: Record<string, any>
  htmlLink?: string
  location?: string
  start?: Record<string, any>
  status?: string
  summary?: string
  updated?: string
}

export interface EventRemoveMatch {
  id: string
}

