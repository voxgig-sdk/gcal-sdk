// Typed models for the Gcal SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Acl
 * @property {string} [etag]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [role]
 * @property {Object} [scope]
 * @property {string} [type]
 * @property {string} [value]
 */

/**
 * @typedef {Object} AclLoadMatch
 * @property {string} calendar_id
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} AclListMatch
 * @property {string} calendar_id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {number} [max_result]
 * @property {string} [oauth_token]
 * @property {string} [page_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {boolean} [show_deleted]
 * @property {string} [sync_token]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} AclCreateData
 * @property {string} calendar_id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {boolean} [send_notification]
 * @property {string} [user_ip]
 * @property {string} [etag]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [role]
 * @property {Object} [scope]
 * @property {string} [type]
 * @property {string} [value]
 */

/**
 * @typedef {Object} AclUpdateData
 * @property {string} calendar_id
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {boolean} [send_notification]
 * @property {string} [user_ip]
 * @property {string} [etag]
 * @property {string} [kind]
 * @property {string} [role]
 * @property {Object} [scope]
 * @property {string} [type]
 * @property {string} [value]
 */

/**
 * @typedef {Object} AclRemoveMatch
 * @property {string} calendar_id
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} Calendar
 * @property {Array} [allowedConferenceSolutionTypes]
 * @property {Object} [conferenceProperties]
 * @property {string} [description]
 * @property {string} [etag]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {string} [summary]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} CalendarLoadMatch
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} CalendarCreateData
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 * @property {Array} [allowedConferenceSolutionTypes]
 * @property {Object} [conferenceProperties]
 * @property {string} [description]
 * @property {string} [etag]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {string} [summary]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} CalendarUpdateData
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 * @property {Array} [allowedConferenceSolutionTypes]
 * @property {Object} [conferenceProperties]
 * @property {string} [description]
 * @property {string} [etag]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {string} [summary]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} CalendarRemoveMatch
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} CalendarList
 * @property {string} [accessRole]
 * @property {string} [backgroundColor]
 * @property {string} [colorId]
 * @property {Object} [conferenceProperties]
 * @property {Array} [defaultReminders]
 * @property {boolean} [deleted]
 * @property {string} [description]
 * @property {string} [etag]
 * @property {string} [foregroundColor]
 * @property {boolean} [hidden]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {Object} [notificationSettings]
 * @property {boolean} [primary]
 * @property {boolean} [selected]
 * @property {string} [summary]
 * @property {string} [summaryOverride]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} CalendarListLoadMatch
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} CalendarListListMatch
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {number} [max_result]
 * @property {string} [min_access_role]
 * @property {string} [oauth_token]
 * @property {string} [page_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {boolean} [show_deleted]
 * @property {boolean} [show_hidden]
 * @property {string} [sync_token]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} CalendarListCreateData
 * @property {string} [alt]
 * @property {boolean} [color_rgb_format]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 * @property {string} [accessRole]
 * @property {string} [backgroundColor]
 * @property {string} [colorId]
 * @property {Object} [conferenceProperties]
 * @property {Array} [defaultReminders]
 * @property {boolean} [deleted]
 * @property {string} [description]
 * @property {string} [etag]
 * @property {string} [foregroundColor]
 * @property {boolean} [hidden]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {Object} [notificationSettings]
 * @property {boolean} [primary]
 * @property {boolean} [selected]
 * @property {string} [summary]
 * @property {string} [summaryOverride]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} CalendarListUpdateData
 * @property {string} id
 * @property {string} [alt]
 * @property {boolean} [color_rgb_format]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 * @property {string} [accessRole]
 * @property {string} [backgroundColor]
 * @property {string} [colorId]
 * @property {Object} [conferenceProperties]
 * @property {Array} [defaultReminders]
 * @property {boolean} [deleted]
 * @property {string} [description]
 * @property {string} [etag]
 * @property {string} [foregroundColor]
 * @property {boolean} [hidden]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {Object} [notificationSettings]
 * @property {boolean} [primary]
 * @property {boolean} [selected]
 * @property {string} [summary]
 * @property {string} [summaryOverride]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} CalendarListRemoveMatch
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} Channel
 */

/**
 * @typedef {Object} ChannelCreateData
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} Color
 * @property {Object} [calendar]
 * @property {Object} [event]
 * @property {string} [kind]
 * @property {string} [updated]
 */

/**
 * @typedef {Object} ColorLoadMatch
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} Event
 * @property {string} [accessRole]
 * @property {boolean} [anyoneCanAddSelf]
 * @property {Array} [attachments]
 * @property {Array} [attendees]
 * @property {boolean} [attendeesOmitted]
 * @property {string} [colorId]
 * @property {Object} [conferenceData]
 * @property {string} [created]
 * @property {Object} [creator]
 * @property {Array} [defaultReminders]
 * @property {string} [description]
 * @property {Object} [end]
 * @property {boolean} [endTimeUnspecified]
 * @property {string} [etag]
 * @property {string} [eventType]
 * @property {Object} [extendedProperties]
 * @property {Object} [gadget]
 * @property {boolean} [guestsCanInviteOthers]
 * @property {boolean} [guestsCanModify]
 * @property {boolean} [guestsCanSeeOtherGuests]
 * @property {string} [hangoutLink]
 * @property {string} [htmlLink]
 * @property {string} [iCalUID]
 * @property {string} [id]
 * @property {Array} [items]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {boolean} [locked]
 * @property {string} [nextPageToken]
 * @property {string} [nextSyncToken]
 * @property {Object} [organizer]
 * @property {Object} [originalStartTime]
 * @property {boolean} [privateCopy]
 * @property {Array} [recurrence]
 * @property {string} [recurringEventId]
 * @property {Object} [reminders]
 * @property {number} [sequence]
 * @property {Object} [source]
 * @property {Object} [start]
 * @property {string} [status]
 * @property {string} [summary]
 * @property {string} [timeZone]
 * @property {string} [transparency]
 * @property {string} [updated]
 * @property {string} [visibility]
 * @property {Object} [workingLocationProperties]
 */

/**
 * @typedef {Object} EventLoadMatch
 * @property {string} calendar_id
 * @property {string} id
 * @property {string} [alt]
 * @property {boolean} [always_include_email]
 * @property {string} [field]
 * @property {string} [key]
 * @property {number} [max_attendee]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [time_zone]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} EventListMatch
 * @property {string} calendar_id
 * @property {string} [alt]
 * @property {boolean} [always_include_email]
 * @property {Array} [event_type]
 * @property {string} [field]
 * @property {string} [i_cal_uid]
 * @property {string} [key]
 * @property {number} [max_attendee]
 * @property {number} [max_result]
 * @property {string} [oauth_token]
 * @property {string} [order_by]
 * @property {string} [page_token]
 * @property {boolean} [pretty_print]
 * @property {Array} [private_extended_property]
 * @property {string} [q]
 * @property {string} [quota_user]
 * @property {Array} [shared_extended_property]
 * @property {boolean} [show_deleted]
 * @property {boolean} [show_hidden_invitation]
 * @property {boolean} [single_event]
 * @property {string} [sync_token]
 * @property {string} [time_max]
 * @property {string} [time_min]
 * @property {string} [time_zone]
 * @property {string} [updated_min]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} EventCreateData
 * @property {string} calendar_id
 * @property {string} [alt]
 * @property {number} [conference_data_version]
 * @property {string} [field]
 * @property {string} [key]
 * @property {number} [max_attendee]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {boolean} [send_notification]
 * @property {string} [send_update]
 * @property {boolean} [supports_attachment]
 * @property {string} [user_ip]
 * @property {string} [accessRole]
 * @property {boolean} [anyoneCanAddSelf]
 * @property {Array} [attachments]
 * @property {Array} [attendees]
 * @property {boolean} [attendeesOmitted]
 * @property {string} [colorId]
 * @property {Object} [conferenceData]
 * @property {string} [created]
 * @property {Object} [creator]
 * @property {Array} [defaultReminders]
 * @property {string} [description]
 * @property {Object} [end]
 * @property {boolean} [endTimeUnspecified]
 * @property {string} [etag]
 * @property {string} [eventType]
 * @property {Object} [extendedProperties]
 * @property {Object} [gadget]
 * @property {boolean} [guestsCanInviteOthers]
 * @property {boolean} [guestsCanModify]
 * @property {boolean} [guestsCanSeeOtherGuests]
 * @property {string} [hangoutLink]
 * @property {string} [htmlLink]
 * @property {string} [iCalUID]
 * @property {string} [id]
 * @property {Array} [items]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {boolean} [locked]
 * @property {string} [nextPageToken]
 * @property {string} [nextSyncToken]
 * @property {Object} [organizer]
 * @property {Object} [originalStartTime]
 * @property {boolean} [privateCopy]
 * @property {Array} [recurrence]
 * @property {string} [recurringEventId]
 * @property {Object} [reminders]
 * @property {number} [sequence]
 * @property {Object} [source]
 * @property {Object} [start]
 * @property {string} [status]
 * @property {string} [summary]
 * @property {string} [timeZone]
 * @property {string} [transparency]
 * @property {string} [updated]
 * @property {string} [visibility]
 * @property {Object} [workingLocationProperties]
 */

/**
 * @typedef {Object} EventUpdateData
 * @property {string} calendar_id
 * @property {string} id
 * @property {string} [alt]
 * @property {boolean} [always_include_email]
 * @property {number} [conference_data_version]
 * @property {string} [field]
 * @property {string} [key]
 * @property {number} [max_attendee]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {boolean} [send_notification]
 * @property {string} [send_update]
 * @property {boolean} [supports_attachment]
 * @property {string} [user_ip]
 * @property {string} [accessRole]
 * @property {boolean} [anyoneCanAddSelf]
 * @property {Array} [attachments]
 * @property {Array} [attendees]
 * @property {boolean} [attendeesOmitted]
 * @property {string} [colorId]
 * @property {Object} [conferenceData]
 * @property {string} [created]
 * @property {Object} [creator]
 * @property {Array} [defaultReminders]
 * @property {string} [description]
 * @property {Object} [end]
 * @property {boolean} [endTimeUnspecified]
 * @property {string} [etag]
 * @property {string} [eventType]
 * @property {Object} [extendedProperties]
 * @property {Object} [gadget]
 * @property {boolean} [guestsCanInviteOthers]
 * @property {boolean} [guestsCanModify]
 * @property {boolean} [guestsCanSeeOtherGuests]
 * @property {string} [hangoutLink]
 * @property {string} [htmlLink]
 * @property {string} [iCalUID]
 * @property {Array} [items]
 * @property {string} [kind]
 * @property {string} [location]
 * @property {boolean} [locked]
 * @property {string} [nextPageToken]
 * @property {string} [nextSyncToken]
 * @property {Object} [organizer]
 * @property {Object} [originalStartTime]
 * @property {boolean} [privateCopy]
 * @property {Array} [recurrence]
 * @property {string} [recurringEventId]
 * @property {Object} [reminders]
 * @property {number} [sequence]
 * @property {Object} [source]
 * @property {Object} [start]
 * @property {string} [status]
 * @property {string} [summary]
 * @property {string} [timeZone]
 * @property {string} [transparency]
 * @property {string} [updated]
 * @property {string} [visibility]
 * @property {Object} [workingLocationProperties]
 */

/**
 * @typedef {Object} EventRemoveMatch
 * @property {string} calendar_id
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {boolean} [send_notification]
 * @property {string} [send_update]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} FreeBusy
 * @property {number} [calendarExpansionMax]
 * @property {Object} [calendars]
 * @property {number} [groupExpansionMax]
 * @property {Object} [groups]
 * @property {Array} [items]
 * @property {string} [kind]
 * @property {string} [timeMax]
 * @property {string} [timeMin]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} FreeBusyCreateData
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 * @property {number} [calendarExpansionMax]
 * @property {Object} [calendars]
 * @property {number} [groupExpansionMax]
 * @property {Object} [groups]
 * @property {Array} [items]
 * @property {string} [kind]
 * @property {string} [timeMax]
 * @property {string} [timeMin]
 * @property {string} [timeZone]
 */

/**
 * @typedef {Object} Import
 */

/**
 * @typedef {Object} QuickAdd
 */

/**
 * @typedef {Object} Setting
 * @property {string} [etag]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [value]
 */

/**
 * @typedef {Object} SettingLoadMatch
 * @property {string} id
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {string} [oauth_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} SettingListMatch
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {number} [max_result]
 * @property {string} [oauth_token]
 * @property {string} [page_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [sync_token]
 * @property {string} [user_ip]
 */

/**
 * @typedef {Object} SettingCreateData
 * @property {string} [alt]
 * @property {string} [field]
 * @property {string} [key]
 * @property {number} [max_result]
 * @property {string} [oauth_token]
 * @property {string} [page_token]
 * @property {boolean} [pretty_print]
 * @property {string} [quota_user]
 * @property {string} [sync_token]
 * @property {string} [user_ip]
 * @property {string} [etag]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {string} [value]
 */

/**
 * @typedef {Object} Stop
 */

/**
 * @typedef {Object} Watch
 */

