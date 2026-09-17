<?php
declare(strict_types=1);

// Typed models for the Gcal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Acl entity data model. */
class Acl
{
    public ?string $etag = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $role = null;
    public ?array $scope = null;
    public ?string $type = null;
    public ?string $value = null;
}

/** Request payload for Acl#load. */
class AclLoadMatch
{
    public string $calendar_id;
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Request payload for Acl#list. */
class AclListMatch
{
    public string $calendar_id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?int $max_result = null;
    public ?string $oauth_token = null;
    public ?string $page_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?bool $show_deleted = null;
    public ?string $sync_token = null;
    public ?string $user_ip = null;
}

/** Request payload for Acl#create. */
class AclCreateData
{
    public string $calendar_id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?bool $send_notification = null;
    public ?string $user_ip = null;
    public ?string $etag = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $role = null;
    public ?array $scope = null;
    public ?string $type = null;
    public ?string $value = null;
}

/** Request payload for Acl#update. */
class AclUpdateData
{
    public string $calendar_id;
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?bool $send_notification = null;
    public ?string $user_ip = null;
    public ?string $etag = null;
    public ?string $kind = null;
    public ?string $role = null;
    public ?array $scope = null;
    public ?string $type = null;
    public ?string $value = null;
}

/** Request payload for Acl#remove. */
class AclRemoveMatch
{
    public string $calendar_id;
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Calendar entity data model. */
class Calendar
{
    public ?array $allowedConferenceSolutionTypes = null;
    public ?array $conferenceProperties = null;
    public ?string $description = null;
    public ?string $etag = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?string $summary = null;
    public ?string $timeZone = null;
}

/** Request payload for Calendar#load. */
class CalendarLoadMatch
{
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Request payload for Calendar#create. */
class CalendarCreateData
{
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
    public ?array $allowedConferenceSolutionTypes = null;
    public ?array $conferenceProperties = null;
    public ?string $description = null;
    public ?string $etag = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?string $summary = null;
    public ?string $timeZone = null;
}

/** Request payload for Calendar#update. */
class CalendarUpdateData
{
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
    public ?array $allowedConferenceSolutionTypes = null;
    public ?array $conferenceProperties = null;
    public ?string $description = null;
    public ?string $etag = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?string $summary = null;
    public ?string $timeZone = null;
}

/** Request payload for Calendar#remove. */
class CalendarRemoveMatch
{
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** CalendarList entity data model. */
class CalendarList
{
    public ?string $accessRole = null;
    public ?string $backgroundColor = null;
    public ?string $colorId = null;
    public ?array $conferenceProperties = null;
    public ?array $defaultReminders = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $etag = null;
    public ?string $foregroundColor = null;
    public ?bool $hidden = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?array $notificationSettings = null;
    public ?bool $primary = null;
    public ?bool $selected = null;
    public ?string $summary = null;
    public ?string $summaryOverride = null;
    public ?string $timeZone = null;
}

/** Request payload for CalendarList#load. */
class CalendarListLoadMatch
{
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Request payload for CalendarList#list. */
class CalendarListListMatch
{
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?int $max_result = null;
    public ?string $min_access_role = null;
    public ?string $oauth_token = null;
    public ?string $page_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?bool $show_deleted = null;
    public ?bool $show_hidden = null;
    public ?string $sync_token = null;
    public ?string $user_ip = null;
}

/** Request payload for CalendarList#create. */
class CalendarListCreateData
{
    public ?string $alt = null;
    public ?bool $color_rgb_format = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
    public ?string $accessRole = null;
    public ?string $backgroundColor = null;
    public ?string $colorId = null;
    public ?array $conferenceProperties = null;
    public ?array $defaultReminders = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $etag = null;
    public ?string $foregroundColor = null;
    public ?bool $hidden = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?array $notificationSettings = null;
    public ?bool $primary = null;
    public ?bool $selected = null;
    public ?string $summary = null;
    public ?string $summaryOverride = null;
    public ?string $timeZone = null;
}

/** Request payload for CalendarList#update. */
class CalendarListUpdateData
{
    public string $id;
    public ?string $alt = null;
    public ?bool $color_rgb_format = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
    public ?string $accessRole = null;
    public ?string $backgroundColor = null;
    public ?string $colorId = null;
    public ?array $conferenceProperties = null;
    public ?array $defaultReminders = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $etag = null;
    public ?string $foregroundColor = null;
    public ?bool $hidden = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?array $notificationSettings = null;
    public ?bool $primary = null;
    public ?bool $selected = null;
    public ?string $summary = null;
    public ?string $summaryOverride = null;
    public ?string $timeZone = null;
}

/** Request payload for CalendarList#remove. */
class CalendarListRemoveMatch
{
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Channel entity data model. */
class Channel
{
}

/** Request payload for Channel#create. */
class ChannelCreateData
{
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Color entity data model. */
class Color
{
    public ?array $calendar = null;
    public ?array $event = null;
    public ?string $kind = null;
    public ?string $updated = null;
}

/** Request payload for Color#load. */
class ColorLoadMatch
{
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Event entity data model. */
class Event
{
    public ?string $accessRole = null;
    public ?bool $anyoneCanAddSelf = null;
    public ?array $attachments = null;
    public ?array $attendees = null;
    public ?bool $attendeesOmitted = null;
    public ?string $colorId = null;
    public ?array $conferenceData = null;
    public ?string $created = null;
    public ?array $creator = null;
    public ?array $defaultReminders = null;
    public ?string $description = null;
    public ?array $end = null;
    public ?bool $endTimeUnspecified = null;
    public ?string $etag = null;
    public ?string $eventType = null;
    public ?array $extendedProperties = null;
    public ?array $gadget = null;
    public ?bool $guestsCanInviteOthers = null;
    public ?bool $guestsCanModify = null;
    public ?bool $guestsCanSeeOtherGuests = null;
    public ?string $hangoutLink = null;
    public ?string $htmlLink = null;
    public ?string $iCalUID = null;
    public ?string $id = null;
    public ?array $items = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?bool $locked = null;
    public ?string $nextPageToken = null;
    public ?string $nextSyncToken = null;
    public ?array $organizer = null;
    public ?array $originalStartTime = null;
    public ?bool $privateCopy = null;
    public ?array $recurrence = null;
    public ?string $recurringEventId = null;
    public ?array $reminders = null;
    public ?int $sequence = null;
    public ?array $source = null;
    public ?array $start = null;
    public ?string $status = null;
    public ?string $summary = null;
    public ?string $timeZone = null;
    public ?string $transparency = null;
    public ?string $updated = null;
    public ?string $visibility = null;
    public ?array $workingLocationProperties = null;
}

/** Request payload for Event#load. */
class EventLoadMatch
{
    public string $calendar_id;
    public string $id;
    public ?string $alt = null;
    public ?bool $always_include_email = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?int $max_attendee = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $time_zone = null;
    public ?string $user_ip = null;
}

/** Request payload for Event#list. */
class EventListMatch
{
    public string $calendar_id;
    public ?string $alt = null;
    public ?bool $always_include_email = null;
    public ?array $event_type = null;
    public ?string $field = null;
    public ?string $i_cal_uid = null;
    public ?string $key = null;
    public ?int $max_attendee = null;
    public ?int $max_result = null;
    public ?string $oauth_token = null;
    public ?string $order_by = null;
    public ?string $page_token = null;
    public ?bool $pretty_print = null;
    public ?array $private_extended_property = null;
    public ?string $q = null;
    public ?string $quota_user = null;
    public ?array $shared_extended_property = null;
    public ?bool $show_deleted = null;
    public ?bool $show_hidden_invitation = null;
    public ?bool $single_event = null;
    public ?string $sync_token = null;
    public ?string $time_max = null;
    public ?string $time_min = null;
    public ?string $time_zone = null;
    public ?string $updated_min = null;
    public ?string $user_ip = null;
}

/** Request payload for Event#create. */
class EventCreateData
{
    public string $calendar_id;
    public ?string $alt = null;
    public ?int $conference_data_version = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?int $max_attendee = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?bool $send_notification = null;
    public ?string $send_update = null;
    public ?bool $supports_attachment = null;
    public ?string $user_ip = null;
    public ?string $accessRole = null;
    public ?bool $anyoneCanAddSelf = null;
    public ?array $attachments = null;
    public ?array $attendees = null;
    public ?bool $attendeesOmitted = null;
    public ?string $colorId = null;
    public ?array $conferenceData = null;
    public ?string $created = null;
    public ?array $creator = null;
    public ?array $defaultReminders = null;
    public ?string $description = null;
    public ?array $end = null;
    public ?bool $endTimeUnspecified = null;
    public ?string $etag = null;
    public ?string $eventType = null;
    public ?array $extendedProperties = null;
    public ?array $gadget = null;
    public ?bool $guestsCanInviteOthers = null;
    public ?bool $guestsCanModify = null;
    public ?bool $guestsCanSeeOtherGuests = null;
    public ?string $hangoutLink = null;
    public ?string $htmlLink = null;
    public ?string $iCalUID = null;
    public ?string $id = null;
    public ?array $items = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?bool $locked = null;
    public ?string $nextPageToken = null;
    public ?string $nextSyncToken = null;
    public ?array $organizer = null;
    public ?array $originalStartTime = null;
    public ?bool $privateCopy = null;
    public ?array $recurrence = null;
    public ?string $recurringEventId = null;
    public ?array $reminders = null;
    public ?int $sequence = null;
    public ?array $source = null;
    public ?array $start = null;
    public ?string $status = null;
    public ?string $summary = null;
    public ?string $timeZone = null;
    public ?string $transparency = null;
    public ?string $updated = null;
    public ?string $visibility = null;
    public ?array $workingLocationProperties = null;
}

/** Request payload for Event#update. */
class EventUpdateData
{
    public string $calendar_id;
    public string $id;
    public ?string $alt = null;
    public ?bool $always_include_email = null;
    public ?int $conference_data_version = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?int $max_attendee = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?bool $send_notification = null;
    public ?string $send_update = null;
    public ?bool $supports_attachment = null;
    public ?string $user_ip = null;
    public ?string $accessRole = null;
    public ?bool $anyoneCanAddSelf = null;
    public ?array $attachments = null;
    public ?array $attendees = null;
    public ?bool $attendeesOmitted = null;
    public ?string $colorId = null;
    public ?array $conferenceData = null;
    public ?string $created = null;
    public ?array $creator = null;
    public ?array $defaultReminders = null;
    public ?string $description = null;
    public ?array $end = null;
    public ?bool $endTimeUnspecified = null;
    public ?string $etag = null;
    public ?string $eventType = null;
    public ?array $extendedProperties = null;
    public ?array $gadget = null;
    public ?bool $guestsCanInviteOthers = null;
    public ?bool $guestsCanModify = null;
    public ?bool $guestsCanSeeOtherGuests = null;
    public ?string $hangoutLink = null;
    public ?string $htmlLink = null;
    public ?string $iCalUID = null;
    public ?array $items = null;
    public ?string $kind = null;
    public ?string $location = null;
    public ?bool $locked = null;
    public ?string $nextPageToken = null;
    public ?string $nextSyncToken = null;
    public ?array $organizer = null;
    public ?array $originalStartTime = null;
    public ?bool $privateCopy = null;
    public ?array $recurrence = null;
    public ?string $recurringEventId = null;
    public ?array $reminders = null;
    public ?int $sequence = null;
    public ?array $source = null;
    public ?array $start = null;
    public ?string $status = null;
    public ?string $summary = null;
    public ?string $timeZone = null;
    public ?string $transparency = null;
    public ?string $updated = null;
    public ?string $visibility = null;
    public ?array $workingLocationProperties = null;
}

/** Request payload for Event#remove. */
class EventRemoveMatch
{
    public string $calendar_id;
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?bool $send_notification = null;
    public ?string $send_update = null;
    public ?string $user_ip = null;
}

/** FreeBusy entity data model. */
class FreeBusy
{
    public ?int $calendarExpansionMax = null;
    public ?array $calendars = null;
    public ?int $groupExpansionMax = null;
    public ?array $groups = null;
    public ?array $items = null;
    public ?string $kind = null;
    public ?string $timeMax = null;
    public ?string $timeMin = null;
    public ?string $timeZone = null;
}

/** Request payload for FreeBusy#create. */
class FreeBusyCreateData
{
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
    public ?int $calendarExpansionMax = null;
    public ?array $calendars = null;
    public ?int $groupExpansionMax = null;
    public ?array $groups = null;
    public ?array $items = null;
    public ?string $kind = null;
    public ?string $timeMax = null;
    public ?string $timeMin = null;
    public ?string $timeZone = null;
}

/** Import entity data model. */
class Import
{
}

/** QuickAdd entity data model. */
class QuickAdd
{
}

/** Setting entity data model. */
class Setting
{
    public ?string $etag = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $value = null;
}

/** Request payload for Setting#load. */
class SettingLoadMatch
{
    public string $id;
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?string $oauth_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $user_ip = null;
}

/** Request payload for Setting#list. */
class SettingListMatch
{
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?int $max_result = null;
    public ?string $oauth_token = null;
    public ?string $page_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $sync_token = null;
    public ?string $user_ip = null;
}

/** Request payload for Setting#create. */
class SettingCreateData
{
    public ?string $alt = null;
    public ?string $field = null;
    public ?string $key = null;
    public ?int $max_result = null;
    public ?string $oauth_token = null;
    public ?string $page_token = null;
    public ?bool $pretty_print = null;
    public ?string $quota_user = null;
    public ?string $sync_token = null;
    public ?string $user_ip = null;
    public ?string $etag = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?string $value = null;
}

/** Stop entity data model. */
class Stop
{
}

/** Watch entity data model. */
class Watch
{
}

