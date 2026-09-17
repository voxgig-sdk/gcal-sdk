# Gcal Lua SDK



The Lua SDK for the Gcal API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Acl()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/gcal-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("gcal_sdk")

local client = sdk.new({
  apikey = os.getenv("GCAL_APIKEY"),
})
```

### 2. List acl records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local acls, err = client:Acl():list()
if err then error(err) end

for _, item in ipairs(acls) do
  print(item["id"], item["etag"])
end
```

### 3. Load an acl

Acl is nested under calendar, so provide the `calendar_id`.

```lua
local acl, err = client:Acl():load({ calendar_id = "example_calendar_id", id = "example_id" })
if err then error(err) end
print(acl)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Acl():create({ calendar_id = "example_calendar_id" })
if err then error(err) end

-- Update
client:Acl():update({ id = created:data_get()["id"], calendar_id = "example_calendar_id", alt = "example_alt" })

-- Remove
client:Acl():remove({ id = created:data_get()["id"], calendar_id = "example_calendar_id" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local calendar, err = client:Calendar():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Calendar():load({ id = "test01" })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### GcalSDK

```lua
local sdk = require("gcal_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GcalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Acl` | `(data) -> AclEntity` | Create an Acl entity instance. |
| `Calendar` | `(data) -> CalendarEntity` | Create a Calendar entity instance. |
| `CalendarList` | `(data) -> CalendarListEntity` | Create a CalendarList entity instance. |
| `Channel` | `(data) -> ChannelEntity` | Create a Channel entity instance. |
| `Color` | `(data) -> ColorEntity` | Create a Color entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `FreeBusy` | `(data) -> FreeBusyEntity` | Create a FreeBusy entity instance. |
| `Import` | `(data) -> ImportEntity` | Create an Import entity instance. |
| `QuickAdd` | `(data) -> QuickAddEntity` | Create a QuickAdd entity instance. |
| `Setting` | `(data) -> SettingEntity` | Create a Setting entity instance. |
| `Stop` | `(data) -> StopEntity` | Create a Stop entity instance. |
| `Watch` | `(data) -> WatchEntity` | Create a Watch entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local acl, err = client:Acl():load({ id = "example_id" })
    if err then error(err) end
    -- acl is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Acl

| Field | Description |
| --- | --- |
| `etag` | ETag of the resource. |
| `id` | Identifier of the Access Control List (ACL) rule. |
| `kind` | Type of the resource ("calendar#aclRule"). |
| `role` | The role assigned to the scope. |
| `scope` | The extent to which calendar access is granted by this ACL rule. |
| `type` | The type of the scope. |
| `value` | The email address of a user or group, or the name of a domain, depending on the scope type. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/calendars/{calendarId}/acl/watch`

#### Calendar

| Field | Description |
| --- | --- |
| `allowedConferenceSolutionTypes` | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | Description of the calendar. |
| `etag` | ETag of the resource. |
| `id` | Identifier of the calendar. |
| `kind` | Type of the resource ("calendar#calendar"). |
| `location` | Geographic location of the calendar as free-form text. |
| `summary` | Title of the calendar. |
| `timeZone` | The time zone of the calendar. |

Operations: Create, Load, Patch, Remove, Update.

API path: `/calendars/{calendarId}/clear`

#### CalendarList

| Field | Description |
| --- | --- |
| `accessRole` | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | The color of the calendar. |
| `conferenceProperties` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | The default reminders that the authenticated user has for this calendar. |
| `deleted` | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | Description of the calendar. |
| `etag` | ETag of the resource. |
| `foregroundColor` | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | Whether the calendar has been hidden from the list. |
| `id` | Identifier of the calendar. |
| `kind` | Type of the resource ("calendar#calendarListEntry"). |
| `location` | Geographic location of the calendar as free-form text. |
| `notificationSettings` | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | Whether the calendar content shows up in the calendar UI. |
| `summary` | Title of the calendar. |
| `summaryOverride` | The summary that the authenticated user has set for this calendar. |
| `timeZone` | The time zone of the calendar. |

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
| `calendar` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | Type of the resource ("calendar#colors"). |
| `updated` | Last modification time of the color palette (as a RFC3339 timestamp). |

Operations: Load.

API path: `/colors`

#### Event

| Field | Description |
| --- | --- |
| `accessRole` | The user's access role for this calendar. |
| `anyoneCanAddSelf` | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | File attachments for the event. |
| `attendees` | The attendees of the event. |
| `attendeesOmitted` | Whether attendees may have been omitted from the event's representation. |
| `colorId` | The color of the event. |
| `conferenceData` | The conference-related information, such as details of a Google Meet conference. |
| `created` | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | The creator of the event. |
| `defaultReminders` | The default reminders on the calendar for the authenticated user. |
| `description` | Description of the event. |
| `end` | The (exclusive) end time of the event. |
| `endTimeUnspecified` | Whether the end time is actually unspecified. |
| `etag` | ETag of the resource. |
| `eventType` | Specific type of the event. |
| `extendedProperties` | Extended properties of the event. |
| `gadget` | A gadget that extends this event. |
| `guestsCanInviteOthers` | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | Event unique identifier as defined in RFC5545. |
| `id` | Opaque identifier of the event. |
| `items` | List of events on the calendar. |
| `kind` | Type of the resource ("calendar#event"). |
| `location` | Geographic location of the event as free-form text. |
| `locked` | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | Token used to access the next page of this result. |
| `nextSyncToken` | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | The organizer of the event. |
| `originalStartTime` | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | If set to True, Event propagation is disabled. |
| `recurrence` | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | Information about the event's reminders for the authenticated user. |
| `sequence` | Sequence number as per iCalendar. |
| `source` | Source from which the event was created. |
| `start` | The (inclusive) start time of the event. |
| `status` | Status of the event. |
| `summary` | Title of the event. |
| `timeZone` | The time zone of the calendar. |
| `transparency` | Whether the event blocks time on the calendar. |
| `updated` | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | Visibility of the event. |
| `workingLocationProperties` | Developer Preview: Working Location event data. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/calendars/{calendarId}/events/watch`

#### FreeBusy

| Field | Description |
| --- | --- |
| `calendarExpansionMax` | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | List of free/busy information for calendars. |
| `groupExpansionMax` | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | Expansion of groups. |
| `items` | List of calendars and/or groups to query. |
| `kind` | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | The end of the interval. |
| `timeMin` | The start of the interval. |
| `timeZone` | Time zone used in the response. |

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
| `etag` | ETag of the resource. |
| `id` | The id of the user setting. |
| `kind` | Type of the resource ("calendar#setting"). |
| `value` | Value of the user setting. |

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

Create an instance: `local acl = client:Acl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | Identifier of the Access Control List (ACL) rule. |
| `kind` | `string` | Type of the resource ("calendar#aclRule"). |
| `role` | `string` | The role assigned to the scope. |
| `scope` | `table` | The extent to which calendar access is granted by this ACL rule. |
| `type` | `string` | The type of the scope. |
| `value` | `string` | The email address of a user or group, or the name of a domain, depending on the scope type. |

#### Example: Load

```lua
local acl, err = client:Acl():load({ id = "acl_id", calendar_id = "calendar_id" })
```

#### Example: List

```lua
local acls, err = client:Acl():list()
```

#### Example: Create

```lua
local acl, err = client:Acl():create({
  calendar_id = "example_calendar_id", -- string
})
```


### Calendar

Create an instance: `local calendar = client:Calendar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowedConferenceSolutionTypes` | `table` | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `table` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendar"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `summary` | `string` | Title of the calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```lua
local calendar, err = client:Calendar():load({ id = "calendar_id" })
```

#### Example: Create

```lua
local calendar, err = client:Calendar():create({
})
```


### CalendarList

Create an instance: `local calendar_list = client:CalendarList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRole` | `string` | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | `string` | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | `string` | The color of the calendar. |
| `conferenceProperties` | `table` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `table` | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `boolean` | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `foregroundColor` | `string` | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `boolean` | Whether the calendar has been hidden from the list. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `table` | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `boolean` | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `boolean` | Whether the calendar content shows up in the calendar UI. |
| `summary` | `string` | Title of the calendar. |
| `summaryOverride` | `string` | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```lua
local calendar_list, err = client:CalendarList():load({ id = "calendar_list_id" })
```

#### Example: List

```lua
local calendar_lists, err = client:CalendarList():list()
```

#### Example: Create

```lua
local calendar_list, err = client:CalendarList():create({
})
```


### Channel

Create an instance: `local channel = client:Channel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local channel, err = client:Channel():create({
})
```


### Color

Create an instance: `local color = client:Color(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendar` | `table` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `table` | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `string` | Type of the resource ("calendar#colors"). |
| `updated` | `string` | Last modification time of the color palette (as a RFC3339 timestamp). |

#### Example: Load

```lua
local color, err = client:Color():load()
```


### Event

Create an instance: `local event = client:Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRole` | `string` | The user's access role for this calendar. |
| `anyoneCanAddSelf` | `boolean` | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `table` | File attachments for the event. |
| `attendees` | `table` | The attendees of the event. |
| `attendeesOmitted` | `boolean` | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `string` | The color of the event. |
| `conferenceData` | `table` | The conference-related information, such as details of a Google Meet conference. |
| `created` | `string` | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `table` | The creator of the event. |
| `defaultReminders` | `table` | The default reminders on the calendar for the authenticated user. |
| `description` | `string` | Description of the event. |
| `end` | `table` | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `boolean` | Whether the end time is actually unspecified. |
| `etag` | `string` | ETag of the resource. |
| `eventType` | `string` | Specific type of the event. |
| `extendedProperties` | `table` | Extended properties of the event. |
| `gadget` | `table` | A gadget that extends this event. |
| `guestsCanInviteOthers` | `boolean` | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `boolean` | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `boolean` | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `string` | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `string` | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `string` | Event unique identifier as defined in RFC5545. |
| `id` | `string` | Opaque identifier of the event. |
| `items` | `table` | List of events on the calendar. |
| `kind` | `string` | Type of the resource ("calendar#event"). |
| `location` | `string` | Geographic location of the event as free-form text. |
| `locked` | `boolean` | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `string` | Token used to access the next page of this result. |
| `nextSyncToken` | `string` | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `table` | The organizer of the event. |
| `originalStartTime` | `table` | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `boolean` | If set to True, Event propagation is disabled. |
| `recurrence` | `table` | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `string` | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `table` | Information about the event's reminders for the authenticated user. |
| `sequence` | `number` | Sequence number as per iCalendar. |
| `source` | `table` | Source from which the event was created. |
| `start` | `table` | The (inclusive) start time of the event. |
| `status` | `string` | Status of the event. |
| `summary` | `string` | Title of the event. |
| `timeZone` | `string` | The time zone of the calendar. |
| `transparency` | `string` | Whether the event blocks time on the calendar. |
| `updated` | `string` | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `string` | Visibility of the event. |
| `workingLocationProperties` | `table` | Developer Preview: Working Location event data. |

#### Example: Load

```lua
local event, err = client:Event():load({ id = "event_id", calendar_id = "calendar_id" })
```

#### Example: List

```lua
local events, err = client:Event():list()
```

#### Example: Create

```lua
local event, err = client:Event():create({
  calendar_id = "example_calendar_id", -- string
})
```


### FreeBusy

Create an instance: `local free_busy = client:FreeBusy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendarExpansionMax` | `number` | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `table` | List of free/busy information for calendars. |
| `groupExpansionMax` | `number` | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `table` | Expansion of groups. |
| `items` | `table` | List of calendars and/or groups to query. |
| `kind` | `string` | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `string` | The end of the interval. |
| `timeMin` | `string` | The start of the interval. |
| `timeZone` | `string` | Time zone used in the response. |

#### Example: Create

```lua
local free_busy, err = client:FreeBusy():create({
})
```


### Import

Create an instance: `local import = client:Import(nil)`


### QuickAdd

Create an instance: `local quick_add = client:QuickAdd(nil)`


### Setting

Create an instance: `local setting = client:Setting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | The id of the user setting. |
| `kind` | `string` | Type of the resource ("calendar#setting"). |
| `value` | `string` | Value of the user setting. |

#### Example: Load

```lua
local setting, err = client:Setting():load({ id = "setting_id" })
```

#### Example: List

```lua
local settings, err = client:Setting():list()
```

#### Example: Create

```lua
local setting, err = client:Setting():create({
})
```


### Stop

Create an instance: `local stop = client:Stop(nil)`


### Watch

Create an instance: `local watch = client:Watch(nil)`

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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── gcal_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`gcal_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local calendar = client:Calendar()
calendar:load({ id = "example_id" })

-- calendar:data_get() now returns the calendar data from the last load
-- calendar:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
