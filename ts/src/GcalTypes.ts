// Typed models for the Gcal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Acl {
  etag?: string
  id?: string
  kind?: string
  role?: string
  scope?: Record<string, any>
  type?: string
  value?: string
}

export interface AclLoadMatch {
  calendar_id: string
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface AclListMatch {
  calendar_id: string
  alt?: string
  field?: string
  key?: string
  max_result?: number
  oauth_token?: string
  page_token?: string
  pretty_print?: boolean
  quota_user?: string
  show_deleted?: boolean
  sync_token?: string
  user_ip?: string
}

export interface AclCreateData {
  calendar_id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  send_notification?: boolean
  user_ip?: string
  etag?: string
  id?: string
  kind?: string
  role?: string
  scope?: Record<string, any>
  type?: string
  value?: string

  // Selects a custom action instead of the plain create:
  //   'watch'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AclUpdateData {
  calendar_id: string
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  send_notification?: boolean
  user_ip?: string
  etag?: string
  kind?: string
  role?: string
  scope?: Record<string, any>
  type?: string
  value?: string
}

export interface AclRemoveMatch {
  calendar_id: string
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface Calendar {
  allowedConferenceSolutionTypes?: any[]
  conferenceProperties?: Record<string, any>
  description?: string
  etag?: string
  id?: string
  kind?: string
  location?: string
  summary?: string
  timeZone?: string
}

export interface CalendarLoadMatch {
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface CalendarCreateData {
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
  allowedConferenceSolutionTypes?: any[]
  conferenceProperties?: Record<string, any>
  description?: string
  etag?: string
  id?: string
  kind?: string
  location?: string
  summary?: string
  timeZone?: string

  // Selects a custom action instead of the plain create:
  //   'clear'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CalendarUpdateData {
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
  allowedConferenceSolutionTypes?: any[]
  conferenceProperties?: Record<string, any>
  description?: string
  etag?: string
  kind?: string
  location?: string
  summary?: string
  timeZone?: string
}

export interface CalendarRemoveMatch {
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface CalendarList {
  accessRole?: string
  backgroundColor?: string
  colorId?: string
  conferenceProperties?: Record<string, any>
  defaultReminders?: any[]
  deleted?: boolean
  description?: string
  etag?: string
  foregroundColor?: string
  hidden?: boolean
  id?: string
  kind?: string
  location?: string
  notificationSettings?: Record<string, any>
  primary?: boolean
  selected?: boolean
  summary?: string
  summaryOverride?: string
  timeZone?: string
}

export interface CalendarListLoadMatch {
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface CalendarListListMatch {
  alt?: string
  field?: string
  key?: string
  max_result?: number
  min_access_role?: string
  oauth_token?: string
  page_token?: string
  pretty_print?: boolean
  quota_user?: string
  show_deleted?: boolean
  show_hidden?: boolean
  sync_token?: string
  user_ip?: string
}

export interface CalendarListCreateData {
  alt?: string
  color_rgb_format?: boolean
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
  accessRole?: string
  backgroundColor?: string
  colorId?: string
  conferenceProperties?: Record<string, any>
  defaultReminders?: any[]
  deleted?: boolean
  description?: string
  etag?: string
  foregroundColor?: string
  hidden?: boolean
  id?: string
  kind?: string
  location?: string
  notificationSettings?: Record<string, any>
  primary?: boolean
  selected?: boolean
  summary?: string
  summaryOverride?: string
  timeZone?: string

  // Selects a custom action instead of the plain create:
  //   'watch'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CalendarListUpdateData {
  id: string
  alt?: string
  color_rgb_format?: boolean
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
  accessRole?: string
  backgroundColor?: string
  colorId?: string
  conferenceProperties?: Record<string, any>
  defaultReminders?: any[]
  deleted?: boolean
  description?: string
  etag?: string
  foregroundColor?: string
  hidden?: boolean
  kind?: string
  location?: string
  notificationSettings?: Record<string, any>
  primary?: boolean
  selected?: boolean
  summary?: string
  summaryOverride?: string
  timeZone?: string
}

export interface CalendarListRemoveMatch {
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface Channel {
}

export interface ChannelCreateData {
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string

  // Selects a custom action instead of the plain create:
  //   'stop'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Color {
  calendar?: Record<string, any>
  event?: Record<string, any>
  kind?: string
  updated?: string
}

export interface ColorLoadMatch {
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface Event {
  accessRole?: string
  anyoneCanAddSelf?: boolean
  attachments?: any[]
  attendees?: any[]
  attendeesOmitted?: boolean
  colorId?: string
  conferenceData?: Record<string, any>
  created?: string
  creator?: Record<string, any>
  defaultReminders?: any[]
  description?: string
  end?: Record<string, any>
  endTimeUnspecified?: boolean
  etag?: string
  eventType?: string
  extendedProperties?: Record<string, any>
  gadget?: Record<string, any>
  guestsCanInviteOthers?: boolean
  guestsCanModify?: boolean
  guestsCanSeeOtherGuests?: boolean
  hangoutLink?: string
  htmlLink?: string
  iCalUID?: string
  id?: string
  items?: any[]
  kind?: string
  location?: string
  locked?: boolean
  nextPageToken?: string
  nextSyncToken?: string
  organizer?: Record<string, any>
  originalStartTime?: Record<string, any>
  privateCopy?: boolean
  recurrence?: any[]
  recurringEventId?: string
  reminders?: Record<string, any>
  sequence?: number
  source?: Record<string, any>
  start?: Record<string, any>
  status?: string
  summary?: string
  timeZone?: string
  transparency?: string
  updated?: string
  visibility?: string
  workingLocationProperties?: Record<string, any>
}

export interface EventLoadMatch {
  calendar_id: string
  id: string
  alt?: string
  always_include_email?: boolean
  field?: string
  key?: string
  max_attendee?: number
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  time_zone?: string
  user_ip?: string
}

export interface EventListMatch {
  calendar_id: string
  alt?: string
  always_include_email?: boolean
  event_type?: any[]
  field?: string
  i_cal_uid?: string
  key?: string
  max_attendee?: number
  max_result?: number
  oauth_token?: string
  order_by?: string
  page_token?: string
  pretty_print?: boolean
  private_extended_property?: any[]
  q?: string
  quota_user?: string
  shared_extended_property?: any[]
  show_deleted?: boolean
  show_hidden_invitation?: boolean
  single_event?: boolean
  sync_token?: string
  time_max?: string
  time_min?: string
  time_zone?: string
  updated_min?: string
  user_ip?: string

  // Selects a custom action instead of the plain list:
  //   'instance'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EventCreateData {
  calendar_id: string
  alt?: string
  conference_data_version?: number
  field?: string
  key?: string
  max_attendee?: number
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  send_notification?: boolean
  send_update?: string
  supports_attachment?: boolean
  user_ip?: string
  accessRole?: string
  anyoneCanAddSelf?: boolean
  attachments?: any[]
  attendees?: any[]
  attendeesOmitted?: boolean
  colorId?: string
  conferenceData?: Record<string, any>
  created?: string
  creator?: Record<string, any>
  defaultReminders?: any[]
  description?: string
  end?: Record<string, any>
  endTimeUnspecified?: boolean
  etag?: string
  eventType?: string
  extendedProperties?: Record<string, any>
  gadget?: Record<string, any>
  guestsCanInviteOthers?: boolean
  guestsCanModify?: boolean
  guestsCanSeeOtherGuests?: boolean
  hangoutLink?: string
  htmlLink?: string
  iCalUID?: string
  id?: string
  items?: any[]
  kind?: string
  location?: string
  locked?: boolean
  nextPageToken?: string
  nextSyncToken?: string
  organizer?: Record<string, any>
  originalStartTime?: Record<string, any>
  privateCopy?: boolean
  recurrence?: any[]
  recurringEventId?: string
  reminders?: Record<string, any>
  sequence?: number
  source?: Record<string, any>
  start?: Record<string, any>
  status?: string
  summary?: string
  timeZone?: string
  transparency?: string
  updated?: string
  visibility?: string
  workingLocationProperties?: Record<string, any>

  // Selects a custom action instead of the plain create:
  //   'import' | 'move' | 'quick_add' | 'watch'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EventUpdateData {
  calendar_id: string
  id: string
  alt?: string
  always_include_email?: boolean
  conference_data_version?: number
  field?: string
  key?: string
  max_attendee?: number
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  send_notification?: boolean
  send_update?: string
  supports_attachment?: boolean
  user_ip?: string
  accessRole?: string
  anyoneCanAddSelf?: boolean
  attachments?: any[]
  attendees?: any[]
  attendeesOmitted?: boolean
  colorId?: string
  conferenceData?: Record<string, any>
  created?: string
  creator?: Record<string, any>
  defaultReminders?: any[]
  description?: string
  end?: Record<string, any>
  endTimeUnspecified?: boolean
  etag?: string
  eventType?: string
  extendedProperties?: Record<string, any>
  gadget?: Record<string, any>
  guestsCanInviteOthers?: boolean
  guestsCanModify?: boolean
  guestsCanSeeOtherGuests?: boolean
  hangoutLink?: string
  htmlLink?: string
  iCalUID?: string
  items?: any[]
  kind?: string
  location?: string
  locked?: boolean
  nextPageToken?: string
  nextSyncToken?: string
  organizer?: Record<string, any>
  originalStartTime?: Record<string, any>
  privateCopy?: boolean
  recurrence?: any[]
  recurringEventId?: string
  reminders?: Record<string, any>
  sequence?: number
  source?: Record<string, any>
  start?: Record<string, any>
  status?: string
  summary?: string
  timeZone?: string
  transparency?: string
  updated?: string
  visibility?: string
  workingLocationProperties?: Record<string, any>
}

export interface EventRemoveMatch {
  calendar_id: string
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  send_notification?: boolean
  send_update?: string
  user_ip?: string
}

export interface FreeBusy {
  calendarExpansionMax?: number
  calendars?: Record<string, any>
  groupExpansionMax?: number
  groups?: Record<string, any>
  items?: any[]
  kind?: string
  timeMax?: string
  timeMin?: string
  timeZone?: string
}

export interface FreeBusyCreateData {
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
  calendarExpansionMax?: number
  calendars?: Record<string, any>
  groupExpansionMax?: number
  groups?: Record<string, any>
  items?: any[]
  kind?: string
  timeMax?: string
  timeMin?: string
  timeZone?: string
}

export interface Import {
}

export interface QuickAdd {
}

export interface Setting {
  etag?: string
  id?: string
  kind?: string
  value?: string
}

export interface SettingLoadMatch {
  id: string
  alt?: string
  field?: string
  key?: string
  oauth_token?: string
  pretty_print?: boolean
  quota_user?: string
  user_ip?: string
}

export interface SettingListMatch {
  alt?: string
  field?: string
  key?: string
  max_result?: number
  oauth_token?: string
  page_token?: string
  pretty_print?: boolean
  quota_user?: string
  sync_token?: string
  user_ip?: string
}

export interface SettingCreateData {
  alt?: string
  field?: string
  key?: string
  max_result?: number
  oauth_token?: string
  page_token?: string
  pretty_print?: boolean
  quota_user?: string
  sync_token?: string
  user_ip?: string
  etag?: string
  id?: string
  kind?: string
  value?: string

  // Selects a custom action instead of the plain create:
  //   'watch'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Stop {
}

export interface Watch {
}

