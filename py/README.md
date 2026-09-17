# Gcal Python SDK



The Python SDK for the Gcal API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Acl()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/gcal-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from gcal_sdk import GcalSDK

client = GcalSDK({
    "apikey": os.environ.get("GCAL_APIKEY"),
})
```

### 2. List acl records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    acls = client.Acl().list({"calendar_id": "example"})
    for acl in acls:
        print(acl)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an acl

Acl is nested under calendar, so provide the `calendar_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    acl = client.Acl().load({"calendar_id": "example_calendar_id", "id": "example_id"})
    print(acl)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Acl().create({"calendar_id": "example_calendar_id"})

# Update — the created record's id is a plain dict key
client.Acl().update({"id": created.data_get()["id"], "calendar_id": "example_calendar_id", "alt": "example_alt"})

# Remove
client.Acl().remove({"id": created.data_get()["id"], "calendar_id": "example_calendar_id"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    calendar = client.Calendar().load({"id": "example_id"})
    print(calendar)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = GcalSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
calendar = client.Calendar().load({"id": "test01"})
# calendar contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = GcalSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### GcalSDK

```python
from gcal_sdk import GcalSDK

client = GcalSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = GcalSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### GcalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `acl = client.Acl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `etag` | `str` | ETag of the resource. |
| `id` | `str` | Identifier of the Access Control List (ACL) rule. |
| `kind` | `str` | Type of the resource ("calendar#aclRule"). |
| `role` | `str` | The role assigned to the scope. |
| `scope` | `dict` | The extent to which calendar access is granted by this ACL rule. |
| `type` | `str` | The type of the scope. |
| `value` | `str` | The email address of a user or group, or the name of a domain, depending on the scope type. |

#### Example: Load

```python
acl = client.Acl().load({"id": "acl_id", "calendar_id": "calendar_id"})
```

#### Example: List

```python
acls = client.Acl().list({"calendar_id": "example"})
```

#### Example: Create

```python
acl = client.Acl().create({
    "calendar_id": "example_calendar_id",  # str
})
```


### Calendar

Create an instance: `calendar = client.Calendar()`

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
| `allowedConferenceSolutionTypes` | `list` | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `dict` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `str` | Description of the calendar. |
| `etag` | `str` | ETag of the resource. |
| `id` | `str` | Identifier of the calendar. |
| `kind` | `str` | Type of the resource ("calendar#calendar"). |
| `location` | `str` | Geographic location of the calendar as free-form text. |
| `summary` | `str` | Title of the calendar. |
| `timeZone` | `str` | The time zone of the calendar. |

#### Example: Load

```python
calendar = client.Calendar().load({"id": "calendar_id"})
```

#### Example: Create

```python
calendar = client.Calendar().create({
})
```


### CalendarList

Create an instance: `calendar_list = client.CalendarList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRole` | `str` | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | `str` | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | `str` | The color of the calendar. |
| `conferenceProperties` | `dict` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `list` | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `bool` | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `str` | Description of the calendar. |
| `etag` | `str` | ETag of the resource. |
| `foregroundColor` | `str` | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `bool` | Whether the calendar has been hidden from the list. |
| `id` | `str` | Identifier of the calendar. |
| `kind` | `str` | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `str` | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `dict` | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `bool` | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `bool` | Whether the calendar content shows up in the calendar UI. |
| `summary` | `str` | Title of the calendar. |
| `summaryOverride` | `str` | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `str` | The time zone of the calendar. |

#### Example: Load

```python
calendar_list = client.CalendarList().load({"id": "calendar_list_id"})
```

#### Example: List

```python
calendar_lists = client.CalendarList().list()
```

#### Example: Create

```python
calendar_list = client.CalendarList().create({
})
```


### Channel

Create an instance: `channel = client.Channel()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
channel = client.Channel().create({
})
```


### Color

Create an instance: `color = client.Color()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendar` | `dict` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `dict` | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `str` | Type of the resource ("calendar#colors"). |
| `updated` | `str` | Last modification time of the color palette (as a RFC3339 timestamp). |

#### Example: Load

```python
color = client.Color().load()
```


### Event

Create an instance: `event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRole` | `str` | The user's access role for this calendar. |
| `anyoneCanAddSelf` | `bool` | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `list` | File attachments for the event. |
| `attendees` | `list` | The attendees of the event. |
| `attendeesOmitted` | `bool` | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `str` | The color of the event. |
| `conferenceData` | `dict` | The conference-related information, such as details of a Google Meet conference. |
| `created` | `str` | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `dict` | The creator of the event. |
| `defaultReminders` | `list` | The default reminders on the calendar for the authenticated user. |
| `description` | `str` | Description of the event. |
| `end` | `dict` | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `bool` | Whether the end time is actually unspecified. |
| `etag` | `str` | ETag of the resource. |
| `eventType` | `str` | Specific type of the event. |
| `extendedProperties` | `dict` | Extended properties of the event. |
| `gadget` | `dict` | A gadget that extends this event. |
| `guestsCanInviteOthers` | `bool` | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `bool` | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `bool` | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `str` | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `str` | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `str` | Event unique identifier as defined in RFC5545. |
| `id` | `str` | Opaque identifier of the event. |
| `items` | `list` | List of events on the calendar. |
| `kind` | `str` | Type of the resource ("calendar#event"). |
| `location` | `str` | Geographic location of the event as free-form text. |
| `locked` | `bool` | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `str` | Token used to access the next page of this result. |
| `nextSyncToken` | `str` | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `dict` | The organizer of the event. |
| `originalStartTime` | `dict` | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `bool` | If set to True, Event propagation is disabled. |
| `recurrence` | `list` | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `str` | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `dict` | Information about the event's reminders for the authenticated user. |
| `sequence` | `int` | Sequence number as per iCalendar. |
| `source` | `dict` | Source from which the event was created. |
| `start` | `dict` | The (inclusive) start time of the event. |
| `status` | `str` | Status of the event. |
| `summary` | `str` | Title of the event. |
| `timeZone` | `str` | The time zone of the calendar. |
| `transparency` | `str` | Whether the event blocks time on the calendar. |
| `updated` | `str` | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `str` | Visibility of the event. |
| `workingLocationProperties` | `dict` | Developer Preview: Working Location event data. |

#### Example: Load

```python
event = client.Event().load({"id": "event_id", "calendar_id": "calendar_id"})
```

#### Example: List

```python
events = client.Event().list({"calendar_id": "example"})
```

#### Example: Create

```python
event = client.Event().create({
    "calendar_id": "example_calendar_id",  # str
})
```


### FreeBusy

Create an instance: `free_busy = client.FreeBusy()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendarExpansionMax` | `int` | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `dict` | List of free/busy information for calendars. |
| `groupExpansionMax` | `int` | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `dict` | Expansion of groups. |
| `items` | `list` | List of calendars and/or groups to query. |
| `kind` | `str` | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `str` | The end of the interval. |
| `timeMin` | `str` | The start of the interval. |
| `timeZone` | `str` | Time zone used in the response. |

#### Example: Create

```python
free_busy = client.FreeBusy().create({
})
```


### Import

Create an instance: `import_ = client.Import()`


### QuickAdd

Create an instance: `quick_add = client.QuickAdd()`


### Setting

Create an instance: `setting = client.Setting()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `etag` | `str` | ETag of the resource. |
| `id` | `str` | The id of the user setting. |
| `kind` | `str` | Type of the resource ("calendar#setting"). |
| `value` | `str` | Value of the user setting. |

#### Example: Load

```python
setting = client.Setting().load({"id": "setting_id"})
```

#### Example: List

```python
settings = client.Setting().list()
```

#### Example: Create

```python
setting = client.Setting().create({
})
```


### Stop

Create an instance: `stop = client.Stop()`


### Watch

Create an instance: `watch = client.Watch()`

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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── gcal_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`gcal_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
calendar = client.Calendar()
calendar.load({"id": "example_id"})

# calendar.data_get() now returns the calendar data from the last load
# calendar.match_get() returns the last match criteria
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
