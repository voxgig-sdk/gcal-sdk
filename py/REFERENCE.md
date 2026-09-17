# Gcal Python SDK Reference

Complete API reference for the Gcal Python SDK.


## GcalSDK

### Constructor

```python
from gcal_sdk import GcalSDK

client = GcalSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GcalSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = GcalSDK.test()
```


### Instance Methods

#### `Acl(data=None)`

Create a new `AclEntity` instance. Pass `None` for no initial data.

#### `Calendar(data=None)`

Create a new `CalendarEntity` instance. Pass `None` for no initial data.

#### `CalendarList(data=None)`

Create a new `CalendarListEntity` instance. Pass `None` for no initial data.

#### `Channel(data=None)`

Create a new `ChannelEntity` instance. Pass `None` for no initial data.

#### `Color(data=None)`

Create a new `ColorEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `FreeBusy(data=None)`

Create a new `FreeBusyEntity` instance. Pass `None` for no initial data.

#### `Import(data=None)`

Create a new `ImportEntity` instance. Pass `None` for no initial data.

#### `QuickAdd(data=None)`

Create a new `QuickAddEntity` instance. Pass `None` for no initial data.

#### `Setting(data=None)`

Create a new `SettingEntity` instance. Pass `None` for no initial data.

#### `Stop(data=None)`

Create a new `StopEntity` instance. Pass `None` for no initial data.

#### `Watch(data=None)`

Create a new `WatchEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AclEntity

```python
acl = client.Acl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `str` | No | ETag of the resource. |
| `id` | `str` | No | Identifier of the Access Control List (ACL) rule. |
| `kind` | `str` | No | Type of the resource ("calendar#aclRule"). |
| `role` | `str` | No | The role assigned to the scope. |
| `scope` | `dict` | No | The extent to which calendar access is granted by this ACL rule. |
| `type` | `str` | No | The type of the scope. |
| `value` | `str` | No | The email address of a user or group, or the name of a domain, depending on the scope type. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Acl().create({
    "calendar_id": "example_calendar_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Acl().list({"calendar_id": "example"})
for acl in results:
    print(acl)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Acl().load({"id": "acl_id", "calendar_id": "calendar_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Acl().remove({"id": "acl_id", "calendar_id": "calendar_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Acl().update({
    "id": "acl_id",
    "calendar_id": "calendar_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AclEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CalendarEntity

```python
calendar = client.Calendar()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowedConferenceSolutionTypes` | `list` | No | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `dict` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `str` | No | Description of the calendar. |
| `etag` | `str` | No | ETag of the resource. |
| `id` | `str` | No | Identifier of the calendar. |
| `kind` | `str` | No | Type of the resource ("calendar#calendar"). |
| `location` | `str` | No | Geographic location of the calendar as free-form text. |
| `summary` | `str` | No | Title of the calendar. |
| `timeZone` | `str` | No | The time zone of the calendar. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Calendar().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Calendar().load({"id": "calendar_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Calendar().remove({"id": "calendar_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Calendar().update({
    "id": "calendar_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CalendarEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CalendarListEntity

```python
calendar_list = client.CalendarList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `str` | No | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | `str` | No | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | `str` | No | The color of the calendar. |
| `conferenceProperties` | `dict` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `list` | No | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `bool` | No | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `str` | No | Description of the calendar. |
| `etag` | `str` | No | ETag of the resource. |
| `foregroundColor` | `str` | No | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `bool` | No | Whether the calendar has been hidden from the list. |
| `id` | `str` | No | Identifier of the calendar. |
| `kind` | `str` | No | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `str` | No | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `dict` | No | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `bool` | No | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `bool` | No | Whether the calendar content shows up in the calendar UI. |
| `summary` | `str` | No | Title of the calendar. |
| `summaryOverride` | `str` | No | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `str` | No | The time zone of the calendar. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CalendarList().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CalendarList().list()
for calendar_list in results:
    print(calendar_list)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CalendarList().load({"id": "calendar_list_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.CalendarList().remove({"id": "calendar_list_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.CalendarList().update({
    "id": "calendar_list_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CalendarListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ChannelEntity

```python
channel = client.Channel()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Channel().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ChannelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ColorEntity

```python
color = client.Color()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendar` | `dict` | No | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `dict` | No | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `str` | No | Type of the resource ("calendar#colors"). |
| `updated` | `str` | No | Last modification time of the color palette (as a RFC3339 timestamp). |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Color().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ColorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `str` | No | The user's access role for this calendar. |
| `anyoneCanAddSelf` | `bool` | No | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `list` | No | File attachments for the event. |
| `attendees` | `list` | No | The attendees of the event. |
| `attendeesOmitted` | `bool` | No | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `str` | No | The color of the event. |
| `conferenceData` | `dict` | No | The conference-related information, such as details of a Google Meet conference. |
| `created` | `str` | No | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `dict` | No | The creator of the event. |
| `defaultReminders` | `list` | No | The default reminders on the calendar for the authenticated user. |
| `description` | `str` | No | Description of the event. |
| `end` | `dict` | No | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `bool` | No | Whether the end time is actually unspecified. |
| `etag` | `str` | No | ETag of the resource. |
| `eventType` | `str` | No | Specific type of the event. |
| `extendedProperties` | `dict` | No | Extended properties of the event. |
| `gadget` | `dict` | No | A gadget that extends this event. |
| `guestsCanInviteOthers` | `bool` | No | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `bool` | No | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `bool` | No | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `str` | No | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `str` | No | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `str` | No | Event unique identifier as defined in RFC5545. |
| `id` | `str` | No | Opaque identifier of the event. |
| `items` | `list` | No | List of events on the calendar. |
| `kind` | `str` | No | Type of the resource ("calendar#event"). |
| `location` | `str` | No | Geographic location of the event as free-form text. |
| `locked` | `bool` | No | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `str` | No | Token used to access the next page of this result. |
| `nextSyncToken` | `str` | No | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `dict` | No | The organizer of the event. |
| `originalStartTime` | `dict` | No | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `bool` | No | If set to True, Event propagation is disabled. |
| `recurrence` | `list` | No | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `str` | No | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `dict` | No | Information about the event's reminders for the authenticated user. |
| `sequence` | `int` | No | Sequence number as per iCalendar. |
| `source` | `dict` | No | Source from which the event was created. |
| `start` | `dict` | No | The (inclusive) start time of the event. |
| `status` | `str` | No | Status of the event. |
| `summary` | `str` | No | Title of the event. |
| `timeZone` | `str` | No | The time zone of the calendar. |
| `transparency` | `str` | No | Whether the event blocks time on the calendar. |
| `updated` | `str` | No | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `str` | No | Visibility of the event. |
| `workingLocationProperties` | `dict` | No | Developer Preview: Working Location event data. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Event().create({
    "calendar_id": "example_calendar_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Event().list({"calendar_id": "example"})
for event in results:
    print(event)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Event().load({"id": "event_id", "calendar_id": "calendar_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Event().remove({"id": "event_id", "calendar_id": "calendar_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Event().update({
    "id": "event_id",
    "calendar_id": "calendar_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FreeBusyEntity

```python
free_busy = client.FreeBusy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendarExpansionMax` | `int` | No | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `dict` | No | List of free/busy information for calendars. |
| `groupExpansionMax` | `int` | No | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `dict` | No | Expansion of groups. |
| `items` | `list` | No | List of calendars and/or groups to query. |
| `kind` | `str` | No | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `str` | No | The end of the interval. |
| `timeMin` | `str` | No | The start of the interval. |
| `timeZone` | `str` | No | Time zone used in the response. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FreeBusy().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FreeBusyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImportEntity

```python
import_ = client.Import()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QuickAddEntity

```python
quick_add = client.QuickAdd()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuickAddEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SettingEntity

```python
setting = client.Setting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `str` | No | ETag of the resource. |
| `id` | `str` | No | The id of the user setting. |
| `kind` | `str` | No | Type of the resource ("calendar#setting"). |
| `value` | `str` | No | Value of the user setting. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Setting().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Setting().list()
for setting in results:
    print(setting)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Setting().load({"id": "setting_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StopEntity

```python
stop = client.Stop()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StopEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WatchEntity

```python
watch = client.Watch()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WatchEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = GcalSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

