// Typed models for the Gcal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/gcal-sdk/go/core"
)

// Acl is the typed data model for the acl entity.
type Acl struct {
	Etag *string `json:"etag,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Role *string `json:"role,omitempty"`
	Scope *map[string]any `json:"scope,omitempty"`
	Type *string `json:"type,omitempty"`
	Value *string `json:"value,omitempty"`
}

// AclLoadMatch is the typed request payload for Acl.LoadTyped.
type AclLoadMatch struct {
	CalendarId string `json:"calendar_id"`
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// AclListMatch is the typed request payload for Acl.ListTyped.
type AclListMatch struct {
	CalendarId string `json:"calendar_id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PageToken *string `json:"page_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	ShowDeleted *bool `json:"show_deleted,omitempty"`
	SyncToken *string `json:"sync_token,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// AclCreateData is the typed request payload for Acl.CreateTyped.
type AclCreateData struct {
	CalendarId string `json:"calendar_id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SendNotification *bool `json:"send_notification,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	Etag *string `json:"etag,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Role *string `json:"role,omitempty"`
	Scope *map[string]any `json:"scope,omitempty"`
	Type *string `json:"type,omitempty"`
	Value *string `json:"value,omitempty"`
}

// AclUpdateData is the typed request payload for Acl.UpdateTyped.
type AclUpdateData struct {
	CalendarId string `json:"calendar_id"`
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SendNotification *bool `json:"send_notification,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	Etag *string `json:"etag,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Role *string `json:"role,omitempty"`
	Scope *map[string]any `json:"scope,omitempty"`
	Type *string `json:"type,omitempty"`
	Value *string `json:"value,omitempty"`
}

// AclRemoveMatch is the typed request payload for Acl.RemoveTyped.
type AclRemoveMatch struct {
	CalendarId string `json:"calendar_id"`
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// Calendar is the typed data model for the calendar entity.
type Calendar struct {
	AllowedConferenceSolutionTypes *[]any `json:"allowedConferenceSolutionTypes,omitempty"`
	ConferenceProperties *map[string]any `json:"conferenceProperties,omitempty"`
	Description *string `json:"description,omitempty"`
	Etag *string `json:"etag,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	Summary *string `json:"summary,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// CalendarLoadMatch is the typed request payload for Calendar.LoadTyped.
type CalendarLoadMatch struct {
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// CalendarCreateData is the typed request payload for Calendar.CreateTyped.
type CalendarCreateData struct {
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	AllowedConferenceSolutionTypes *[]any `json:"allowedConferenceSolutionTypes,omitempty"`
	ConferenceProperties *map[string]any `json:"conferenceProperties,omitempty"`
	Description *string `json:"description,omitempty"`
	Etag *string `json:"etag,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	Summary *string `json:"summary,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// CalendarUpdateData is the typed request payload for Calendar.UpdateTyped.
type CalendarUpdateData struct {
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	AllowedConferenceSolutionTypes *[]any `json:"allowedConferenceSolutionTypes,omitempty"`
	ConferenceProperties *map[string]any `json:"conferenceProperties,omitempty"`
	Description *string `json:"description,omitempty"`
	Etag *string `json:"etag,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	Summary *string `json:"summary,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// CalendarRemoveMatch is the typed request payload for Calendar.RemoveTyped.
type CalendarRemoveMatch struct {
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// CalendarList is the typed data model for the calendar_list entity.
type CalendarList struct {
	AccessRole *string `json:"accessRole,omitempty"`
	BackgroundColor *string `json:"backgroundColor,omitempty"`
	ColorId *string `json:"colorId,omitempty"`
	ConferenceProperties *map[string]any `json:"conferenceProperties,omitempty"`
	DefaultReminders *[]any `json:"defaultReminders,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Etag *string `json:"etag,omitempty"`
	ForegroundColor *string `json:"foregroundColor,omitempty"`
	Hidden *bool `json:"hidden,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	NotificationSettings *map[string]any `json:"notificationSettings,omitempty"`
	Primary *bool `json:"primary,omitempty"`
	Selected *bool `json:"selected,omitempty"`
	Summary *string `json:"summary,omitempty"`
	SummaryOverride *string `json:"summaryOverride,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// CalendarListLoadMatch is the typed request payload for CalendarList.LoadTyped.
type CalendarListLoadMatch struct {
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// CalendarListListMatch is the typed request payload for CalendarList.ListTyped.
type CalendarListListMatch struct {
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	MinAccessRole *string `json:"min_access_role,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PageToken *string `json:"page_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	ShowDeleted *bool `json:"show_deleted,omitempty"`
	ShowHidden *bool `json:"show_hidden,omitempty"`
	SyncToken *string `json:"sync_token,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// CalendarListCreateData is the typed request payload for CalendarList.CreateTyped.
type CalendarListCreateData struct {
	Alt *string `json:"alt,omitempty"`
	ColorRgbFormat *bool `json:"color_rgb_format,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	AccessRole *string `json:"accessRole,omitempty"`
	BackgroundColor *string `json:"backgroundColor,omitempty"`
	ColorId *string `json:"colorId,omitempty"`
	ConferenceProperties *map[string]any `json:"conferenceProperties,omitempty"`
	DefaultReminders *[]any `json:"defaultReminders,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Etag *string `json:"etag,omitempty"`
	ForegroundColor *string `json:"foregroundColor,omitempty"`
	Hidden *bool `json:"hidden,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	NotificationSettings *map[string]any `json:"notificationSettings,omitempty"`
	Primary *bool `json:"primary,omitempty"`
	Selected *bool `json:"selected,omitempty"`
	Summary *string `json:"summary,omitempty"`
	SummaryOverride *string `json:"summaryOverride,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// CalendarListUpdateData is the typed request payload for CalendarList.UpdateTyped.
type CalendarListUpdateData struct {
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	ColorRgbFormat *bool `json:"color_rgb_format,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	AccessRole *string `json:"accessRole,omitempty"`
	BackgroundColor *string `json:"backgroundColor,omitempty"`
	ColorId *string `json:"colorId,omitempty"`
	ConferenceProperties *map[string]any `json:"conferenceProperties,omitempty"`
	DefaultReminders *[]any `json:"defaultReminders,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Etag *string `json:"etag,omitempty"`
	ForegroundColor *string `json:"foregroundColor,omitempty"`
	Hidden *bool `json:"hidden,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	NotificationSettings *map[string]any `json:"notificationSettings,omitempty"`
	Primary *bool `json:"primary,omitempty"`
	Selected *bool `json:"selected,omitempty"`
	Summary *string `json:"summary,omitempty"`
	SummaryOverride *string `json:"summaryOverride,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// CalendarListRemoveMatch is the typed request payload for CalendarList.RemoveTyped.
type CalendarListRemoveMatch struct {
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// Channel is the typed data model for the channel entity.
type Channel struct {
}

// ChannelCreateData is the typed request payload for Channel.CreateTyped.
type ChannelCreateData struct {
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// Color is the typed data model for the color entity.
type Color struct {
	Calendar *map[string]any `json:"calendar,omitempty"`
	Event *map[string]any `json:"event,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Updated *string `json:"updated,omitempty"`
}

// ColorLoadMatch is the typed request payload for Color.LoadTyped.
type ColorLoadMatch struct {
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
	AccessRole *string `json:"accessRole,omitempty"`
	AnyoneCanAddSelf *bool `json:"anyoneCanAddSelf,omitempty"`
	Attachments *[]any `json:"attachments,omitempty"`
	Attendees *[]any `json:"attendees,omitempty"`
	AttendeesOmitted *bool `json:"attendeesOmitted,omitempty"`
	ColorId *string `json:"colorId,omitempty"`
	ConferenceData *map[string]any `json:"conferenceData,omitempty"`
	Created *string `json:"created,omitempty"`
	Creator *map[string]any `json:"creator,omitempty"`
	DefaultReminders *[]any `json:"defaultReminders,omitempty"`
	Description *string `json:"description,omitempty"`
	End *map[string]any `json:"end,omitempty"`
	EndTimeUnspecified *bool `json:"endTimeUnspecified,omitempty"`
	Etag *string `json:"etag,omitempty"`
	EventType *string `json:"eventType,omitempty"`
	ExtendedProperties *map[string]any `json:"extendedProperties,omitempty"`
	Gadget *map[string]any `json:"gadget,omitempty"`
	GuestsCanInviteOthers *bool `json:"guestsCanInviteOthers,omitempty"`
	GuestsCanModify *bool `json:"guestsCanModify,omitempty"`
	GuestsCanSeeOtherGuests *bool `json:"guestsCanSeeOtherGuests,omitempty"`
	HangoutLink *string `json:"hangoutLink,omitempty"`
	HtmlLink *string `json:"htmlLink,omitempty"`
	ICalUID *string `json:"iCalUID,omitempty"`
	Id *string `json:"id,omitempty"`
	Items *[]any `json:"items,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	Locked *bool `json:"locked,omitempty"`
	NextPageToken *string `json:"nextPageToken,omitempty"`
	NextSyncToken *string `json:"nextSyncToken,omitempty"`
	Organizer *map[string]any `json:"organizer,omitempty"`
	OriginalStartTime *map[string]any `json:"originalStartTime,omitempty"`
	PrivateCopy *bool `json:"privateCopy,omitempty"`
	Recurrence *[]any `json:"recurrence,omitempty"`
	RecurringEventId *string `json:"recurringEventId,omitempty"`
	Reminders *map[string]any `json:"reminders,omitempty"`
	Sequence *int `json:"sequence,omitempty"`
	Source *map[string]any `json:"source,omitempty"`
	Start *map[string]any `json:"start,omitempty"`
	Status *string `json:"status,omitempty"`
	Summary *string `json:"summary,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
	Transparency *string `json:"transparency,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	WorkingLocationProperties *map[string]any `json:"workingLocationProperties,omitempty"`
}

// EventLoadMatch is the typed request payload for Event.LoadTyped.
type EventLoadMatch struct {
	CalendarId string `json:"calendar_id"`
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	AlwaysIncludeEmail *bool `json:"always_include_email,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxAttendee *int `json:"max_attendee,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	TimeZone *string `json:"time_zone,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	CalendarId string `json:"calendar_id"`
	Alt *string `json:"alt,omitempty"`
	AlwaysIncludeEmail *bool `json:"always_include_email,omitempty"`
	EventType *[]any `json:"event_type,omitempty"`
	Field *string `json:"field,omitempty"`
	ICalUid *string `json:"i_cal_uid,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxAttendee *int `json:"max_attendee,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	OrderBy *string `json:"order_by,omitempty"`
	PageToken *string `json:"page_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	PrivateExtendedProperty *[]any `json:"private_extended_property,omitempty"`
	Q *string `json:"q,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SharedExtendedProperty *[]any `json:"shared_extended_property,omitempty"`
	ShowDeleted *bool `json:"show_deleted,omitempty"`
	ShowHiddenInvitation *bool `json:"show_hidden_invitation,omitempty"`
	SingleEvent *bool `json:"single_event,omitempty"`
	SyncToken *string `json:"sync_token,omitempty"`
	TimeMax *string `json:"time_max,omitempty"`
	TimeMin *string `json:"time_min,omitempty"`
	TimeZone *string `json:"time_zone,omitempty"`
	UpdatedMin *string `json:"updated_min,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// EventCreateData is the typed request payload for Event.CreateTyped.
type EventCreateData struct {
	CalendarId string `json:"calendar_id"`
	Alt *string `json:"alt,omitempty"`
	ConferenceDataVersion *int `json:"conference_data_version,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxAttendee *int `json:"max_attendee,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SendNotification *bool `json:"send_notification,omitempty"`
	SendUpdate *string `json:"send_update,omitempty"`
	SupportsAttachment *bool `json:"supports_attachment,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	AccessRole *string `json:"accessRole,omitempty"`
	AnyoneCanAddSelf *bool `json:"anyoneCanAddSelf,omitempty"`
	Attachments *[]any `json:"attachments,omitempty"`
	Attendees *[]any `json:"attendees,omitempty"`
	AttendeesOmitted *bool `json:"attendeesOmitted,omitempty"`
	ColorId *string `json:"colorId,omitempty"`
	ConferenceData *map[string]any `json:"conferenceData,omitempty"`
	Created *string `json:"created,omitempty"`
	Creator *map[string]any `json:"creator,omitempty"`
	DefaultReminders *[]any `json:"defaultReminders,omitempty"`
	Description *string `json:"description,omitempty"`
	End *map[string]any `json:"end,omitempty"`
	EndTimeUnspecified *bool `json:"endTimeUnspecified,omitempty"`
	Etag *string `json:"etag,omitempty"`
	EventType *string `json:"eventType,omitempty"`
	ExtendedProperties *map[string]any `json:"extendedProperties,omitempty"`
	Gadget *map[string]any `json:"gadget,omitempty"`
	GuestsCanInviteOthers *bool `json:"guestsCanInviteOthers,omitempty"`
	GuestsCanModify *bool `json:"guestsCanModify,omitempty"`
	GuestsCanSeeOtherGuests *bool `json:"guestsCanSeeOtherGuests,omitempty"`
	HangoutLink *string `json:"hangoutLink,omitempty"`
	HtmlLink *string `json:"htmlLink,omitempty"`
	ICalUID *string `json:"iCalUID,omitempty"`
	Id *string `json:"id,omitempty"`
	Items *[]any `json:"items,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	Locked *bool `json:"locked,omitempty"`
	NextPageToken *string `json:"nextPageToken,omitempty"`
	NextSyncToken *string `json:"nextSyncToken,omitempty"`
	Organizer *map[string]any `json:"organizer,omitempty"`
	OriginalStartTime *map[string]any `json:"originalStartTime,omitempty"`
	PrivateCopy *bool `json:"privateCopy,omitempty"`
	Recurrence *[]any `json:"recurrence,omitempty"`
	RecurringEventId *string `json:"recurringEventId,omitempty"`
	Reminders *map[string]any `json:"reminders,omitempty"`
	Sequence *int `json:"sequence,omitempty"`
	Source *map[string]any `json:"source,omitempty"`
	Start *map[string]any `json:"start,omitempty"`
	Status *string `json:"status,omitempty"`
	Summary *string `json:"summary,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
	Transparency *string `json:"transparency,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	WorkingLocationProperties *map[string]any `json:"workingLocationProperties,omitempty"`
}

// EventUpdateData is the typed request payload for Event.UpdateTyped.
type EventUpdateData struct {
	CalendarId string `json:"calendar_id"`
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	AlwaysIncludeEmail *bool `json:"always_include_email,omitempty"`
	ConferenceDataVersion *int `json:"conference_data_version,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxAttendee *int `json:"max_attendee,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SendNotification *bool `json:"send_notification,omitempty"`
	SendUpdate *string `json:"send_update,omitempty"`
	SupportsAttachment *bool `json:"supports_attachment,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	AccessRole *string `json:"accessRole,omitempty"`
	AnyoneCanAddSelf *bool `json:"anyoneCanAddSelf,omitempty"`
	Attachments *[]any `json:"attachments,omitempty"`
	Attendees *[]any `json:"attendees,omitempty"`
	AttendeesOmitted *bool `json:"attendeesOmitted,omitempty"`
	ColorId *string `json:"colorId,omitempty"`
	ConferenceData *map[string]any `json:"conferenceData,omitempty"`
	Created *string `json:"created,omitempty"`
	Creator *map[string]any `json:"creator,omitempty"`
	DefaultReminders *[]any `json:"defaultReminders,omitempty"`
	Description *string `json:"description,omitempty"`
	End *map[string]any `json:"end,omitempty"`
	EndTimeUnspecified *bool `json:"endTimeUnspecified,omitempty"`
	Etag *string `json:"etag,omitempty"`
	EventType *string `json:"eventType,omitempty"`
	ExtendedProperties *map[string]any `json:"extendedProperties,omitempty"`
	Gadget *map[string]any `json:"gadget,omitempty"`
	GuestsCanInviteOthers *bool `json:"guestsCanInviteOthers,omitempty"`
	GuestsCanModify *bool `json:"guestsCanModify,omitempty"`
	GuestsCanSeeOtherGuests *bool `json:"guestsCanSeeOtherGuests,omitempty"`
	HangoutLink *string `json:"hangoutLink,omitempty"`
	HtmlLink *string `json:"htmlLink,omitempty"`
	ICalUID *string `json:"iCalUID,omitempty"`
	Items *[]any `json:"items,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Location *string `json:"location,omitempty"`
	Locked *bool `json:"locked,omitempty"`
	NextPageToken *string `json:"nextPageToken,omitempty"`
	NextSyncToken *string `json:"nextSyncToken,omitempty"`
	Organizer *map[string]any `json:"organizer,omitempty"`
	OriginalStartTime *map[string]any `json:"originalStartTime,omitempty"`
	PrivateCopy *bool `json:"privateCopy,omitempty"`
	Recurrence *[]any `json:"recurrence,omitempty"`
	RecurringEventId *string `json:"recurringEventId,omitempty"`
	Reminders *map[string]any `json:"reminders,omitempty"`
	Sequence *int `json:"sequence,omitempty"`
	Source *map[string]any `json:"source,omitempty"`
	Start *map[string]any `json:"start,omitempty"`
	Status *string `json:"status,omitempty"`
	Summary *string `json:"summary,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
	Transparency *string `json:"transparency,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	WorkingLocationProperties *map[string]any `json:"workingLocationProperties,omitempty"`
}

// EventRemoveMatch is the typed request payload for Event.RemoveTyped.
type EventRemoveMatch struct {
	CalendarId string `json:"calendar_id"`
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SendNotification *bool `json:"send_notification,omitempty"`
	SendUpdate *string `json:"send_update,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// FreeBusy is the typed data model for the free_busy entity.
type FreeBusy struct {
	CalendarExpansionMax *int `json:"calendarExpansionMax,omitempty"`
	Calendars *map[string]any `json:"calendars,omitempty"`
	GroupExpansionMax *int `json:"groupExpansionMax,omitempty"`
	Groups *map[string]any `json:"groups,omitempty"`
	Items *[]any `json:"items,omitempty"`
	Kind *string `json:"kind,omitempty"`
	TimeMax *string `json:"timeMax,omitempty"`
	TimeMin *string `json:"timeMin,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// FreeBusyCreateData is the typed request payload for FreeBusy.CreateTyped.
type FreeBusyCreateData struct {
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	CalendarExpansionMax *int `json:"calendarExpansionMax,omitempty"`
	Calendars *map[string]any `json:"calendars,omitempty"`
	GroupExpansionMax *int `json:"groupExpansionMax,omitempty"`
	Groups *map[string]any `json:"groups,omitempty"`
	Items *[]any `json:"items,omitempty"`
	Kind *string `json:"kind,omitempty"`
	TimeMax *string `json:"timeMax,omitempty"`
	TimeMin *string `json:"timeMin,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
}

// Import is the typed data model for the import entity.
type Import struct {
}

// QuickAdd is the typed data model for the quick_add entity.
type QuickAdd struct {
}

// Setting is the typed data model for the setting entity.
type Setting struct {
	Etag *string `json:"etag,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Value *string `json:"value,omitempty"`
}

// SettingLoadMatch is the typed request payload for Setting.LoadTyped.
type SettingLoadMatch struct {
	Id string `json:"id"`
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// SettingListMatch is the typed request payload for Setting.ListTyped.
type SettingListMatch struct {
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PageToken *string `json:"page_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SyncToken *string `json:"sync_token,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
}

// SettingCreateData is the typed request payload for Setting.CreateTyped.
type SettingCreateData struct {
	Alt *string `json:"alt,omitempty"`
	Field *string `json:"field,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	OauthToken *string `json:"oauth_token,omitempty"`
	PageToken *string `json:"page_token,omitempty"`
	PrettyPrint *bool `json:"pretty_print,omitempty"`
	QuotaUser *string `json:"quota_user,omitempty"`
	SyncToken *string `json:"sync_token,omitempty"`
	UserIp *string `json:"user_ip,omitempty"`
	Etag *string `json:"etag,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Value *string `json:"value,omitempty"`
}

// Stop is the typed data model for the stop entity.
type Stop struct {
}

// Watch is the typed data model for the watch entity.
type Watch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
