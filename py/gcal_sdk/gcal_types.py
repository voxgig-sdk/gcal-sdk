# Typed models for the Gcal SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Acl(TypedDict, total=False):
    etag: str
    id: str
    kind: str
    role: str
    scope: dict
    type: str
    value: str


class AclLoadMatchRequired(TypedDict):
    calendar_id: str
    id: str


class AclLoadMatch(AclLoadMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class AclListMatchRequired(TypedDict):
    calendar_id: str


class AclListMatch(AclListMatchRequired, total=False):
    alt: str
    field: str
    key: str
    max_result: int
    oauth_token: str
    page_token: str
    pretty_print: bool
    quota_user: str
    show_deleted: bool
    sync_token: str
    user_ip: str


class AclCreateDataRequired(TypedDict):
    calendar_id: str


class AclCreateData(AclCreateDataRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    send_notification: bool
    user_ip: str
    etag: str
    id: str
    kind: str
    role: str
    scope: dict
    type: str
    value: str


class AclUpdateDataRequired(TypedDict):
    calendar_id: str
    id: str


class AclUpdateData(AclUpdateDataRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    send_notification: bool
    user_ip: str
    etag: str
    kind: str
    role: str
    scope: dict
    type: str
    value: str


class AclRemoveMatchRequired(TypedDict):
    calendar_id: str
    id: str


class AclRemoveMatch(AclRemoveMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class Calendar(TypedDict, total=False):
    allowedConferenceSolutionTypes: list
    conferenceProperties: dict
    description: str
    etag: str
    id: str
    kind: str
    location: str
    summary: str
    timeZone: str


class CalendarLoadMatchRequired(TypedDict):
    id: str


class CalendarLoadMatch(CalendarLoadMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class CalendarCreateData(TypedDict, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str
    allowedConferenceSolutionTypes: list
    conferenceProperties: dict
    description: str
    etag: str
    id: str
    kind: str
    location: str
    summary: str
    timeZone: str


class CalendarUpdateDataRequired(TypedDict):
    id: str


class CalendarUpdateData(CalendarUpdateDataRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str
    allowedConferenceSolutionTypes: list
    conferenceProperties: dict
    description: str
    etag: str
    kind: str
    location: str
    summary: str
    timeZone: str


class CalendarRemoveMatchRequired(TypedDict):
    id: str


class CalendarRemoveMatch(CalendarRemoveMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class CalendarList(TypedDict, total=False):
    accessRole: str
    backgroundColor: str
    colorId: str
    conferenceProperties: dict
    defaultReminders: list
    deleted: bool
    description: str
    etag: str
    foregroundColor: str
    hidden: bool
    id: str
    kind: str
    location: str
    notificationSettings: dict
    primary: bool
    selected: bool
    summary: str
    summaryOverride: str
    timeZone: str


class CalendarListLoadMatchRequired(TypedDict):
    id: str


class CalendarListLoadMatch(CalendarListLoadMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class CalendarListListMatch(TypedDict, total=False):
    alt: str
    field: str
    key: str
    max_result: int
    min_access_role: str
    oauth_token: str
    page_token: str
    pretty_print: bool
    quota_user: str
    show_deleted: bool
    show_hidden: bool
    sync_token: str
    user_ip: str


class CalendarListCreateData(TypedDict, total=False):
    alt: str
    color_rgb_format: bool
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str
    accessRole: str
    backgroundColor: str
    colorId: str
    conferenceProperties: dict
    defaultReminders: list
    deleted: bool
    description: str
    etag: str
    foregroundColor: str
    hidden: bool
    id: str
    kind: str
    location: str
    notificationSettings: dict
    primary: bool
    selected: bool
    summary: str
    summaryOverride: str
    timeZone: str


class CalendarListUpdateDataRequired(TypedDict):
    id: str


class CalendarListUpdateData(CalendarListUpdateDataRequired, total=False):
    alt: str
    color_rgb_format: bool
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str
    accessRole: str
    backgroundColor: str
    colorId: str
    conferenceProperties: dict
    defaultReminders: list
    deleted: bool
    description: str
    etag: str
    foregroundColor: str
    hidden: bool
    kind: str
    location: str
    notificationSettings: dict
    primary: bool
    selected: bool
    summary: str
    summaryOverride: str
    timeZone: str


class CalendarListRemoveMatchRequired(TypedDict):
    id: str


class CalendarListRemoveMatch(CalendarListRemoveMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class Channel(TypedDict):
    pass


class ChannelCreateData(TypedDict, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class Color(TypedDict, total=False):
    calendar: dict
    event: dict
    kind: str
    updated: str


class ColorLoadMatch(TypedDict, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class Event(TypedDict, total=False):
    accessRole: str
    anyoneCanAddSelf: bool
    attachments: list
    attendees: list
    attendeesOmitted: bool
    colorId: str
    conferenceData: dict
    created: str
    creator: dict
    defaultReminders: list
    description: str
    end: dict
    endTimeUnspecified: bool
    etag: str
    eventType: str
    extendedProperties: dict
    gadget: dict
    guestsCanInviteOthers: bool
    guestsCanModify: bool
    guestsCanSeeOtherGuests: bool
    hangoutLink: str
    htmlLink: str
    iCalUID: str
    id: str
    items: list
    kind: str
    location: str
    locked: bool
    nextPageToken: str
    nextSyncToken: str
    organizer: dict
    originalStartTime: dict
    privateCopy: bool
    recurrence: list
    recurringEventId: str
    reminders: dict
    sequence: int
    source: dict
    start: dict
    status: str
    summary: str
    timeZone: str
    transparency: str
    updated: str
    visibility: str
    workingLocationProperties: dict


class EventLoadMatchRequired(TypedDict):
    calendar_id: str
    id: str


class EventLoadMatch(EventLoadMatchRequired, total=False):
    alt: str
    always_include_email: bool
    field: str
    key: str
    max_attendee: int
    oauth_token: str
    pretty_print: bool
    quota_user: str
    time_zone: str
    user_ip: str


class EventListMatchRequired(TypedDict):
    calendar_id: str


class EventListMatch(EventListMatchRequired, total=False):
    alt: str
    always_include_email: bool
    event_type: list
    field: str
    i_cal_uid: str
    key: str
    max_attendee: int
    max_result: int
    oauth_token: str
    order_by: str
    page_token: str
    pretty_print: bool
    private_extended_property: list
    q: str
    quota_user: str
    shared_extended_property: list
    show_deleted: bool
    show_hidden_invitation: bool
    single_event: bool
    sync_token: str
    time_max: str
    time_min: str
    time_zone: str
    updated_min: str
    user_ip: str


class EventCreateDataRequired(TypedDict):
    calendar_id: str


class EventCreateData(EventCreateDataRequired, total=False):
    alt: str
    conference_data_version: int
    field: str
    key: str
    max_attendee: int
    oauth_token: str
    pretty_print: bool
    quota_user: str
    send_notification: bool
    send_update: str
    supports_attachment: bool
    user_ip: str
    accessRole: str
    anyoneCanAddSelf: bool
    attachments: list
    attendees: list
    attendeesOmitted: bool
    colorId: str
    conferenceData: dict
    created: str
    creator: dict
    defaultReminders: list
    description: str
    end: dict
    endTimeUnspecified: bool
    etag: str
    eventType: str
    extendedProperties: dict
    gadget: dict
    guestsCanInviteOthers: bool
    guestsCanModify: bool
    guestsCanSeeOtherGuests: bool
    hangoutLink: str
    htmlLink: str
    iCalUID: str
    id: str
    items: list
    kind: str
    location: str
    locked: bool
    nextPageToken: str
    nextSyncToken: str
    organizer: dict
    originalStartTime: dict
    privateCopy: bool
    recurrence: list
    recurringEventId: str
    reminders: dict
    sequence: int
    source: dict
    start: dict
    status: str
    summary: str
    timeZone: str
    transparency: str
    updated: str
    visibility: str
    workingLocationProperties: dict


class EventUpdateDataRequired(TypedDict):
    calendar_id: str
    id: str


class EventUpdateData(EventUpdateDataRequired, total=False):
    alt: str
    always_include_email: bool
    conference_data_version: int
    field: str
    key: str
    max_attendee: int
    oauth_token: str
    pretty_print: bool
    quota_user: str
    send_notification: bool
    send_update: str
    supports_attachment: bool
    user_ip: str
    accessRole: str
    anyoneCanAddSelf: bool
    attachments: list
    attendees: list
    attendeesOmitted: bool
    colorId: str
    conferenceData: dict
    created: str
    creator: dict
    defaultReminders: list
    description: str
    end: dict
    endTimeUnspecified: bool
    etag: str
    eventType: str
    extendedProperties: dict
    gadget: dict
    guestsCanInviteOthers: bool
    guestsCanModify: bool
    guestsCanSeeOtherGuests: bool
    hangoutLink: str
    htmlLink: str
    iCalUID: str
    items: list
    kind: str
    location: str
    locked: bool
    nextPageToken: str
    nextSyncToken: str
    organizer: dict
    originalStartTime: dict
    privateCopy: bool
    recurrence: list
    recurringEventId: str
    reminders: dict
    sequence: int
    source: dict
    start: dict
    status: str
    summary: str
    timeZone: str
    transparency: str
    updated: str
    visibility: str
    workingLocationProperties: dict


class EventRemoveMatchRequired(TypedDict):
    calendar_id: str
    id: str


class EventRemoveMatch(EventRemoveMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    send_notification: bool
    send_update: str
    user_ip: str


class FreeBusy(TypedDict, total=False):
    calendarExpansionMax: int
    calendars: dict
    groupExpansionMax: int
    groups: dict
    items: list
    kind: str
    timeMax: str
    timeMin: str
    timeZone: str


class FreeBusyCreateData(TypedDict, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str
    calendarExpansionMax: int
    calendars: dict
    groupExpansionMax: int
    groups: dict
    items: list
    kind: str
    timeMax: str
    timeMin: str
    timeZone: str


class Import(TypedDict):
    pass


class QuickAdd(TypedDict):
    pass


class Setting(TypedDict, total=False):
    etag: str
    id: str
    kind: str
    value: str


class SettingLoadMatchRequired(TypedDict):
    id: str


class SettingLoadMatch(SettingLoadMatchRequired, total=False):
    alt: str
    field: str
    key: str
    oauth_token: str
    pretty_print: bool
    quota_user: str
    user_ip: str


class SettingListMatch(TypedDict, total=False):
    alt: str
    field: str
    key: str
    max_result: int
    oauth_token: str
    page_token: str
    pretty_print: bool
    quota_user: str
    sync_token: str
    user_ip: str


class SettingCreateData(TypedDict, total=False):
    alt: str
    field: str
    key: str
    max_result: int
    oauth_token: str
    page_token: str
    pretty_print: bool
    quota_user: str
    sync_token: str
    user_ip: str
    etag: str
    id: str
    kind: str
    value: str


class Stop(TypedDict):
    pass


class Watch(TypedDict):
    pass
