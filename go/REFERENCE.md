# Gcal Golang SDK Reference

Complete API reference for the Gcal Golang SDK.


## GcalSDK

### Constructor

```go
func NewGcalSDK(options map[string]any) *GcalSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *GcalSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GcalSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Acl(data map[string]any) GcalEntity`

Create a new `Acl` entity instance. Pass `nil` for no initial data.

#### `Calendar(data map[string]any) GcalEntity`

Create a new `Calendar` entity instance. Pass `nil` for no initial data.

#### `CalendarList(data map[string]any) GcalEntity`

Create a new `CalendarList` entity instance. Pass `nil` for no initial data.

#### `Channel(data map[string]any) GcalEntity`

Create a new `Channel` entity instance. Pass `nil` for no initial data.

#### `Color(data map[string]any) GcalEntity`

Create a new `Color` entity instance. Pass `nil` for no initial data.

#### `Event(data map[string]any) GcalEntity`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `FreeBusy(data map[string]any) GcalEntity`

Create a new `FreeBusy` entity instance. Pass `nil` for no initial data.

#### `Import(data map[string]any) GcalEntity`

Create a new `Import` entity instance. Pass `nil` for no initial data.

#### `QuickAdd(data map[string]any) GcalEntity`

Create a new `QuickAdd` entity instance. Pass `nil` for no initial data.

#### `Setting(data map[string]any) GcalEntity`

Create a new `Setting` entity instance. Pass `nil` for no initial data.

#### `Stop(data map[string]any) GcalEntity`

Create a new `Stop` entity instance. Pass `nil` for no initial data.

#### `Watch(data map[string]any) GcalEntity`

Create a new `Watch` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AclEntity

```go
acl := client.Acl(nil)
fmt.Println(acl.GetName()) // "acl"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | Identifier of the Access Control List (ACL) rule. |
| `kind` | `string` | No | Type of the resource ("calendar#aclRule"). |
| `role` | `string` | No | The role assigned to the scope. |
| `scope` | `map[string]any` | No | The extent to which calendar access is granted by this ACL rule. |
| `type` | `string` | No | The type of the scope. |
| `value` | `string` | No | The email address of a user or group, or the name of a domain, depending on the scope type. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Acl(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Acl(nil).Load(map[string]any{"id": "acl_id", "calendar_id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Acl(nil).Create(map[string]any{
    "calendar_id": "example_calendar_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Acl(nil).Update(map[string]any{
    "id": "acl_id",
    "calendar_id": "calendar_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Acl(nil).Remove(map[string]any{"id": "acl_id", "calendar_id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AclEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CalendarEntity

```go
calendar := client.Calendar(nil)
fmt.Println(calendar.GetName()) // "calendar"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowedConferenceSolutionTypes` | `[]any` | No | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `map[string]any` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `string` | No | Description of the calendar. |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | Identifier of the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#calendar"). |
| `location` | `string` | No | Geographic location of the calendar as free-form text. |
| `summary` | `string` | No | Title of the calendar. |
| `timeZone` | `string` | No | The time zone of the calendar. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Calendar(nil).Load(map[string]any{"id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Calendar(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Calendar(nil).Update(map[string]any{
    "id": "calendar_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Calendar(nil).Remove(map[string]any{"id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CalendarEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CalendarListEntity

```go
calendarList := client.CalendarList(nil)
fmt.Println(calendarList.GetName()) // "calendar_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `string` | No | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | `string` | No | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | `string` | No | The color of the calendar. |
| `conferenceProperties` | `map[string]any` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `[]any` | No | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `bool` | No | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `string` | No | Description of the calendar. |
| `etag` | `string` | No | ETag of the resource. |
| `foregroundColor` | `string` | No | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `bool` | No | Whether the calendar has been hidden from the list. |
| `id` | `string` | No | Identifier of the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `string` | No | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `map[string]any` | No | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `bool` | No | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `bool` | No | Whether the calendar content shows up in the calendar UI. |
| `summary` | `string` | No | Title of the calendar. |
| `summaryOverride` | `string` | No | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `string` | No | The time zone of the calendar. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CalendarList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CalendarList(nil).Load(map[string]any{"id": "calendar_list_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CalendarList(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.CalendarList(nil).Update(map[string]any{
    "id": "calendar_list_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.CalendarList(nil).Remove(map[string]any{"id": "calendar_list_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CalendarListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ChannelEntity

```go
channel := client.Channel(nil)
fmt.Println(channel.GetName()) // "channel"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Channel(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ChannelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ColorEntity

```go
color := client.Color(nil)
fmt.Println(color.GetName()) // "color"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendar` | `map[string]any` | No | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `map[string]any` | No | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `string` | No | Type of the resource ("calendar#colors"). |
| `updated` | `string` | No | Last modification time of the color palette (as a RFC3339 timestamp). |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Color(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ColorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventEntity

```go
event := client.Event(nil)
fmt.Println(event.GetName()) // "event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `string` | No | The user's access role for this calendar. |
| `anyoneCanAddSelf` | `bool` | No | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `[]any` | No | File attachments for the event. |
| `attendees` | `[]any` | No | The attendees of the event. |
| `attendeesOmitted` | `bool` | No | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `string` | No | The color of the event. |
| `conferenceData` | `map[string]any` | No | The conference-related information, such as details of a Google Meet conference. |
| `created` | `string` | No | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `map[string]any` | No | The creator of the event. |
| `defaultReminders` | `[]any` | No | The default reminders on the calendar for the authenticated user. |
| `description` | `string` | No | Description of the event. |
| `end` | `map[string]any` | No | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `bool` | No | Whether the end time is actually unspecified. |
| `etag` | `string` | No | ETag of the resource. |
| `eventType` | `string` | No | Specific type of the event. |
| `extendedProperties` | `map[string]any` | No | Extended properties of the event. |
| `gadget` | `map[string]any` | No | A gadget that extends this event. |
| `guestsCanInviteOthers` | `bool` | No | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `bool` | No | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `bool` | No | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `string` | No | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `string` | No | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `string` | No | Event unique identifier as defined in RFC5545. |
| `id` | `string` | No | Opaque identifier of the event. |
| `items` | `[]any` | No | List of events on the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#event"). |
| `location` | `string` | No | Geographic location of the event as free-form text. |
| `locked` | `bool` | No | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `string` | No | Token used to access the next page of this result. |
| `nextSyncToken` | `string` | No | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `map[string]any` | No | The organizer of the event. |
| `originalStartTime` | `map[string]any` | No | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `bool` | No | If set to True, Event propagation is disabled. |
| `recurrence` | `[]any` | No | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `string` | No | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `map[string]any` | No | Information about the event's reminders for the authenticated user. |
| `sequence` | `int` | No | Sequence number as per iCalendar. |
| `source` | `map[string]any` | No | Source from which the event was created. |
| `start` | `map[string]any` | No | The (inclusive) start time of the event. |
| `status` | `string` | No | Status of the event. |
| `summary` | `string` | No | Title of the event. |
| `timeZone` | `string` | No | The time zone of the calendar. |
| `transparency` | `string` | No | Whether the event blocks time on the calendar. |
| `updated` | `string` | No | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `string` | No | Visibility of the event. |
| `workingLocationProperties` | `map[string]any` | No | Developer Preview: Working Location event data. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Event(nil).Load(map[string]any{"id": "event_id", "calendar_id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Event(nil).Create(map[string]any{
    "calendar_id": "example_calendar_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Event(nil).Update(map[string]any{
    "id": "event_id",
    "calendar_id": "calendar_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Event(nil).Remove(map[string]any{"id": "event_id", "calendar_id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FreeBusyEntity

```go
freeBusy := client.FreeBusy(nil)
fmt.Println(freeBusy.GetName()) // "free_busy"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendarExpansionMax` | `int` | No | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `map[string]any` | No | List of free/busy information for calendars. |
| `groupExpansionMax` | `int` | No | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `map[string]any` | No | Expansion of groups. |
| `items` | `[]any` | No | List of calendars and/or groups to query. |
| `kind` | `string` | No | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `string` | No | The end of the interval. |
| `timeMin` | `string` | No | The start of the interval. |
| `timeZone` | `string` | No | Time zone used in the response. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.FreeBusy(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FreeBusyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ImportEntity

```go
import_ := client.Import(nil)
fmt.Println(import_.GetName()) // "import"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ImportEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## QuickAddEntity

```go
quickAdd := client.QuickAdd(nil)
fmt.Println(quickAdd.GetName()) // "quick_add"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QuickAddEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SettingEntity

```go
setting := client.Setting(nil)
fmt.Println(setting.GetName()) // "setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | The id of the user setting. |
| `kind` | `string` | No | Type of the resource ("calendar#setting"). |
| `value` | `string` | No | Value of the user setting. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Setting(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Setting(nil).Load(map[string]any{"id": "setting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Setting(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SettingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StopEntity

```go
stop := client.Stop(nil)
fmt.Println(stop.GetName()) // "stop"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StopEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WatchEntity

```go
watch := client.Watch(nil)
fmt.Println(watch.GetName()) // "watch"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WatchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Request/response capture ring buffer for debugging |
| `idempotency` | 0.0.1 | Idempotency keys for safe retries of mutating operations |
| `metrics` | 0.0.1 | Statistics capture: per-operation counters and latency |
| `paging` | 0.0.1 | Pagination signals for list operations |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```go
client := sdk.NewGcalSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Request/response capture ring buffer for debugging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency keys for safe retries of mutating operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Statistics capture: per-operation counters and latency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Pagination signals for list operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

