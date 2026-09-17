# Gcal Golang SDK



The Golang SDK for the Gcal API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Acl(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`, `Patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/gcal-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/gcal-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/gcal-sdk/go=../gcal-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/gcal-sdk/go"
)

func main() {
    client := sdk.NewGcalSDK(map[string]any{
        "apikey": os.Getenv("GCAL_APIKEY"),
    })

    // List acl records — the value is the array of records itself.
    acls, err := client.Acl(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range acls.([]any) {
        fmt.Println(item)
    }

    // Load a single acl — the value is the loaded record.
    acl, err := client.Acl(nil).Load(map[string]any{"id": "example_id", "calendar_id": "example_calendar_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(acl)

    // Create a acl.
    created, err := client.Acl(nil).Create(map[string]any{"calendar_id": "example_calendar_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Update a acl.
    updated, err := client.Acl(nil).Update(map[string]any{"id": "example_id", "calendar_id": "example_calendar_id", "alt": "example_alt"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated)

    // Remove a acl.
    removed, err := client.Acl(nil).Remove(map[string]any{"id": "example_id", "calendar_id": "example_calendar_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
calendar, err := client.Calendar(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = calendar
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

calendar, err := client.Calendar(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(calendar) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewGcalSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GCAL_TEST_LIVE=TRUE
GCAL_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewGcalSDK

```go
func NewGcalSDK(options map[string]any) *GcalSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *GcalSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GcalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Acl` | `(data map[string]any) GcalEntity` | Create an Acl entity instance. |
| `Calendar` | `(data map[string]any) GcalEntity` | Create a Calendar entity instance. |
| `CalendarList` | `(data map[string]any) GcalEntity` | Create a CalendarList entity instance. |
| `Channel` | `(data map[string]any) GcalEntity` | Create a Channel entity instance. |
| `Color` | `(data map[string]any) GcalEntity` | Create a Color entity instance. |
| `Event` | `(data map[string]any) GcalEntity` | Create an Event entity instance. |
| `FreeBusy` | `(data map[string]any) GcalEntity` | Create a FreeBusy entity instance. |
| `Import` | `(data map[string]any) GcalEntity` | Create an Import entity instance. |
| `QuickAdd` | `(data map[string]any) GcalEntity` | Create a QuickAdd entity instance. |
| `Setting` | `(data map[string]any) GcalEntity` | Create a Setting entity instance. |
| `Stop` | `(data map[string]any) GcalEntity` | Create a Stop entity instance. |
| `Watch` | `(data map[string]any) GcalEntity` | Create a Watch entity instance. |

### Entity interface (GcalEntity)

All entities implement the `GcalEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    acl, err := client.Acl(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // acl is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Acl

| Field | Description |
| --- | --- |
| `"etag"` | ETag of the resource. |
| `"id"` | Identifier of the Access Control List (ACL) rule. |
| `"kind"` | Type of the resource ("calendar#aclRule"). |
| `"role"` | The role assigned to the scope. |
| `"scope"` | The extent to which calendar access is granted by this ACL rule. |
| `"type"` | The type of the scope. |
| `"value"` | The email address of a user or group, or the name of a domain, depending on the scope type. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/calendars/{calendarId}/acl/watch`

#### Calendar

| Field | Description |
| --- | --- |
| `"allowedConferenceSolutionTypes"` | The types of conference solutions that are supported for this calendar. |
| `"conferenceProperties"` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `"description"` | Description of the calendar. |
| `"etag"` | ETag of the resource. |
| `"id"` | Identifier of the calendar. |
| `"kind"` | Type of the resource ("calendar#calendar"). |
| `"location"` | Geographic location of the calendar as free-form text. |
| `"summary"` | Title of the calendar. |
| `"timeZone"` | The time zone of the calendar. |

Operations: Create, Load, Patch, Remove, Update.

API path: `/calendars/{calendarId}/clear`

#### CalendarList

| Field | Description |
| --- | --- |
| `"accessRole"` | The effective access role that the authenticated user has on the calendar. |
| `"backgroundColor"` | The main color of the calendar in the hexadecimal format "#0088aa". |
| `"colorId"` | The color of the calendar. |
| `"conferenceProperties"` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `"defaultReminders"` | The default reminders that the authenticated user has for this calendar. |
| `"deleted"` | Whether this calendar list entry has been deleted from the calendar list. |
| `"description"` | Description of the calendar. |
| `"etag"` | ETag of the resource. |
| `"foregroundColor"` | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `"hidden"` | Whether the calendar has been hidden from the list. |
| `"id"` | Identifier of the calendar. |
| `"kind"` | Type of the resource ("calendar#calendarListEntry"). |
| `"location"` | Geographic location of the calendar as free-form text. |
| `"notificationSettings"` | The notifications that the authenticated user is receiving for this calendar. |
| `"primary"` | Whether the calendar is the primary calendar of the authenticated user. |
| `"selected"` | Whether the calendar content shows up in the calendar UI. |
| `"summary"` | Title of the calendar. |
| `"summaryOverride"` | The summary that the authenticated user has set for this calendar. |
| `"timeZone"` | The time zone of the calendar. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/users/me/calendarList/watch`

#### Channel

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/channels/stop`

#### Color

| Field | Description |
| --- | --- |
| `"calendar"` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `"event"` | A global palette of event colors, mapping from the color ID to its definition. |
| `"kind"` | Type of the resource ("calendar#colors"). |
| `"updated"` | Last modification time of the color palette (as a RFC3339 timestamp). |

Operations: Load.

API path: `/colors`

#### Event

| Field | Description |
| --- | --- |
| `"accessRole"` | The user's access role for this calendar. |
| `"anyoneCanAddSelf"` | Whether anyone can invite themselves to the event (deprecated). |
| `"attachments"` | File attachments for the event. |
| `"attendees"` | The attendees of the event. |
| `"attendeesOmitted"` | Whether attendees may have been omitted from the event's representation. |
| `"colorId"` | The color of the event. |
| `"conferenceData"` | The conference-related information, such as details of a Google Meet conference. |
| `"created"` | Creation time of the event (as a RFC3339 timestamp). |
| `"creator"` | The creator of the event. |
| `"defaultReminders"` | The default reminders on the calendar for the authenticated user. |
| `"description"` | Description of the event. |
| `"end"` | The (exclusive) end time of the event. |
| `"endTimeUnspecified"` | Whether the end time is actually unspecified. |
| `"etag"` | ETag of the resource. |
| `"eventType"` | Specific type of the event. |
| `"extendedProperties"` | Extended properties of the event. |
| `"gadget"` | A gadget that extends this event. |
| `"guestsCanInviteOthers"` | Whether attendees other than the organizer can invite others to the event. |
| `"guestsCanModify"` | Whether attendees other than the organizer can modify the event. |
| `"guestsCanSeeOtherGuests"` | Whether attendees other than the organizer can see who the event's attendees are. |
| `"hangoutLink"` | An absolute link to the Google Hangout associated with this event. |
| `"htmlLink"` | An absolute link to this event in the Google Calendar Web UI. |
| `"iCalUID"` | Event unique identifier as defined in RFC5545. |
| `"id"` | Opaque identifier of the event. |
| `"items"` | List of events on the calendar. |
| `"kind"` | Type of the resource ("calendar#event"). |
| `"location"` | Geographic location of the event as free-form text. |
| `"locked"` | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `"nextPageToken"` | Token used to access the next page of this result. |
| `"nextSyncToken"` | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `"organizer"` | The organizer of the event. |
| `"originalStartTime"` | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `"privateCopy"` | If set to True, Event propagation is disabled. |
| `"recurrence"` | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `"recurringEventId"` | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `"reminders"` | Information about the event's reminders for the authenticated user. |
| `"sequence"` | Sequence number as per iCalendar. |
| `"source"` | Source from which the event was created. |
| `"start"` | The (inclusive) start time of the event. |
| `"status"` | Status of the event. |
| `"summary"` | Title of the event. |
| `"timeZone"` | The time zone of the calendar. |
| `"transparency"` | Whether the event blocks time on the calendar. |
| `"updated"` | Last modification time of the event (as a RFC3339 timestamp). |
| `"visibility"` | Visibility of the event. |
| `"workingLocationProperties"` | Developer Preview: Working Location event data. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/calendars/{calendarId}/events/watch`

#### FreeBusy

| Field | Description |
| --- | --- |
| `"calendarExpansionMax"` | Maximal number of calendars for which FreeBusy information is to be provided. |
| `"calendars"` | List of free/busy information for calendars. |
| `"groupExpansionMax"` | Maximal number of calendar identifiers to be provided for a single group. |
| `"groups"` | Expansion of groups. |
| `"items"` | List of calendars and/or groups to query. |
| `"kind"` | Type of the resource ("calendar#freeBusy"). |
| `"timeMax"` | The end of the interval. |
| `"timeMin"` | The start of the interval. |
| `"timeZone"` | Time zone used in the response. |

Operations: Create.

API path: `/freeBusy`

#### Import

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### QuickAdd

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### Setting

| Field | Description |
| --- | --- |
| `"etag"` | ETag of the resource. |
| `"id"` | The id of the user setting. |
| `"kind"` | Type of the resource ("calendar#setting"). |
| `"value"` | Value of the user setting. |

Operations: Create, List, Load.

API path: `/users/me/settings/watch`

#### Stop

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### Watch

| Field | Description |
| --- | --- |

Operations: .

API path: ``



## Entities


### Acl

Create an instance: `acl := client.Acl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | Identifier of the Access Control List (ACL) rule. |
| `kind` | `string` | Type of the resource ("calendar#aclRule"). |
| `role` | `string` | The role assigned to the scope. |
| `scope` | `map[string]any` | The extent to which calendar access is granted by this ACL rule. |
| `type` | `string` | The type of the scope. |
| `value` | `string` | The email address of a user or group, or the name of a domain, depending on the scope type. |

#### Example: Load

```go
acl, err := client.Acl(nil).Load(map[string]any{"id": "acl_id", "calendar_id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(acl) // the loaded record
```

#### Example: List

```go
acls, err := client.Acl(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(acls) // the array of records
```

#### Example: Create

```go
result, err := client.Acl(nil).Create(map[string]any{
    "calendar_id": "example_calendar_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Calendar

Create an instance: `calendar := client.Calendar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowedConferenceSolutionTypes` | `[]any` | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `map[string]any` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendar"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `summary` | `string` | Title of the calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```go
calendar, err := client.Calendar(nil).Load(map[string]any{"id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(calendar) // the loaded record
```

#### Example: Create

```go
result, err := client.Calendar(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CalendarList

Create an instance: `calendarList := client.CalendarList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRole` | `string` | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | `string` | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | `string` | The color of the calendar. |
| `conferenceProperties` | `map[string]any` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `[]any` | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `bool` | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `foregroundColor` | `string` | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `bool` | Whether the calendar has been hidden from the list. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `map[string]any` | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `bool` | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `bool` | Whether the calendar content shows up in the calendar UI. |
| `summary` | `string` | Title of the calendar. |
| `summaryOverride` | `string` | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```go
calendarList, err := client.CalendarList(nil).Load(map[string]any{"id": "calendar_list_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(calendarList) // the loaded record
```

#### Example: List

```go
calendarLists, err := client.CalendarList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(calendarLists) // the array of records
```

#### Example: Create

```go
result, err := client.CalendarList(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Channel

Create an instance: `channel := client.Channel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Channel(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Color

Create an instance: `color := client.Color(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendar` | `map[string]any` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `map[string]any` | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `string` | Type of the resource ("calendar#colors"). |
| `updated` | `string` | Last modification time of the color palette (as a RFC3339 timestamp). |

#### Example: Load

```go
color, err := client.Color(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(color) // the loaded record
```


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRole` | `string` | The user's access role for this calendar. |
| `anyoneCanAddSelf` | `bool` | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `[]any` | File attachments for the event. |
| `attendees` | `[]any` | The attendees of the event. |
| `attendeesOmitted` | `bool` | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `string` | The color of the event. |
| `conferenceData` | `map[string]any` | The conference-related information, such as details of a Google Meet conference. |
| `created` | `string` | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `map[string]any` | The creator of the event. |
| `defaultReminders` | `[]any` | The default reminders on the calendar for the authenticated user. |
| `description` | `string` | Description of the event. |
| `end` | `map[string]any` | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `bool` | Whether the end time is actually unspecified. |
| `etag` | `string` | ETag of the resource. |
| `eventType` | `string` | Specific type of the event. |
| `extendedProperties` | `map[string]any` | Extended properties of the event. |
| `gadget` | `map[string]any` | A gadget that extends this event. |
| `guestsCanInviteOthers` | `bool` | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `bool` | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `bool` | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `string` | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `string` | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `string` | Event unique identifier as defined in RFC5545. |
| `id` | `string` | Opaque identifier of the event. |
| `items` | `[]any` | List of events on the calendar. |
| `kind` | `string` | Type of the resource ("calendar#event"). |
| `location` | `string` | Geographic location of the event as free-form text. |
| `locked` | `bool` | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `string` | Token used to access the next page of this result. |
| `nextSyncToken` | `string` | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `map[string]any` | The organizer of the event. |
| `originalStartTime` | `map[string]any` | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `bool` | If set to True, Event propagation is disabled. |
| `recurrence` | `[]any` | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `string` | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `map[string]any` | Information about the event's reminders for the authenticated user. |
| `sequence` | `int` | Sequence number as per iCalendar. |
| `source` | `map[string]any` | Source from which the event was created. |
| `start` | `map[string]any` | The (inclusive) start time of the event. |
| `status` | `string` | Status of the event. |
| `summary` | `string` | Title of the event. |
| `timeZone` | `string` | The time zone of the calendar. |
| `transparency` | `string` | Whether the event blocks time on the calendar. |
| `updated` | `string` | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `string` | Visibility of the event. |
| `workingLocationProperties` | `map[string]any` | Developer Preview: Working Location event data. |

#### Example: Load

```go
event, err := client.Event(nil).Load(map[string]any{"id": "event_id", "calendar_id": "calendar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(event) // the loaded record
```

#### Example: List

```go
events, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(events) // the array of records
```

#### Example: Create

```go
result, err := client.Event(nil).Create(map[string]any{
    "calendar_id": "example_calendar_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### FreeBusy

Create an instance: `freeBusy := client.FreeBusy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendarExpansionMax` | `int` | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `map[string]any` | List of free/busy information for calendars. |
| `groupExpansionMax` | `int` | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `map[string]any` | Expansion of groups. |
| `items` | `[]any` | List of calendars and/or groups to query. |
| `kind` | `string` | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `string` | The end of the interval. |
| `timeMin` | `string` | The start of the interval. |
| `timeZone` | `string` | Time zone used in the response. |

#### Example: Create

```go
result, err := client.FreeBusy(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Import

Create an instance: `import_ := client.Import(nil)`


### QuickAdd

Create an instance: `quickAdd := client.QuickAdd(nil)`


### Setting

Create an instance: `setting := client.Setting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | The id of the user setting. |
| `kind` | `string` | Type of the resource ("calendar#setting"). |
| `value` | `string` | Value of the user setting. |

#### Example: Load

```go
setting, err := client.Setting(nil).Load(map[string]any{"id": "setting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(setting) // the loaded record
```

#### Example: List

```go
settings, err := client.Setting(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(settings) // the array of records
```

#### Example: Create

```go
result, err := client.Setting(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Stop

Create an instance: `stop := client.Stop(nil)`


### Watch

Create an instance: `watch := client.Watch(nil)`

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/gcal-sdk/go/
├── gcal.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/gcal-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
calendar := client.Calendar(nil)
calendar.Load(map[string]any{"id": "example_id"}, nil)

// calendar.Data() now returns the calendar data from the last load
// calendar.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
