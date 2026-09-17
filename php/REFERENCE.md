# Gcal PHP SDK Reference

Complete API reference for the Gcal PHP SDK.


## GcalSDK

### Constructor

```php
require_once __DIR__ . '/gcal_sdk.php';

$client = new GcalSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GcalSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = GcalSDK::test();
```


### Instance Methods

#### `Acl($data = null)`

Create a new `AclEntity` instance. Pass `null` for no initial data.

#### `Calendar($data = null)`

Create a new `CalendarEntity` instance. Pass `null` for no initial data.

#### `CalendarList($data = null)`

Create a new `CalendarListEntity` instance. Pass `null` for no initial data.

#### `Channel($data = null)`

Create a new `ChannelEntity` instance. Pass `null` for no initial data.

#### `Color($data = null)`

Create a new `ColorEntity` instance. Pass `null` for no initial data.

#### `Event($data = null)`

Create a new `EventEntity` instance. Pass `null` for no initial data.

#### `FreeBusy($data = null)`

Create a new `FreeBusyEntity` instance. Pass `null` for no initial data.

#### `Import($data = null)`

Create a new `ImportEntity` instance. Pass `null` for no initial data.

#### `QuickAdd($data = null)`

Create a new `QuickAddEntity` instance. Pass `null` for no initial data.

#### `Setting($data = null)`

Create a new `SettingEntity` instance. Pass `null` for no initial data.

#### `Stop($data = null)`

Create a new `StopEntity` instance. Pass `null` for no initial data.

#### `Watch($data = null)`

Create a new `WatchEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): GcalUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AclEntity

```php
$acl = $client->Acl();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | Identifier of the Access Control List (ACL) rule. |
| `kind` | `string` | No | Type of the resource ("calendar#aclRule"). |
| `role` | `string` | No | The role assigned to the scope. |
| `scope` | `array` | No | The extent to which calendar access is granted by this ACL rule. |
| `type` | `string` | No | The type of the scope. |
| `value` | `string` | No | The email address of a user or group, or the name of a domain, depending on the scope type. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Acl()->create([
  "calendar_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Acl()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Acl()->load(["id" => "acl_id", "calendar_id" => "calendar_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Acl()->remove(["id" => "acl_id", "calendar_id" => "calendar_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Acl()->update([
  "id" => "acl_id",
  "calendar_id" => "calendar_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AclEntity`

Create a new `AclEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CalendarEntity

```php
$calendar = $client->Calendar();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowedConferenceSolutionTypes` | `array` | No | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `array` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `string` | No | Description of the calendar. |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | Identifier of the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#calendar"). |
| `location` | `string` | No | Geographic location of the calendar as free-form text. |
| `summary` | `string` | No | Title of the calendar. |
| `timeZone` | `string` | No | The time zone of the calendar. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Calendar()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Calendar()->load(["id" => "calendar_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Calendar()->remove(["id" => "calendar_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Calendar()->update([
  "id" => "calendar_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CalendarEntity`

Create a new `CalendarEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CalendarListEntity

```php
$calendar_list = $client->CalendarList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `string` | No | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | `string` | No | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | `string` | No | The color of the calendar. |
| `conferenceProperties` | `array` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `array` | No | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `bool` | No | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `string` | No | Description of the calendar. |
| `etag` | `string` | No | ETag of the resource. |
| `foregroundColor` | `string` | No | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `bool` | No | Whether the calendar has been hidden from the list. |
| `id` | `string` | No | Identifier of the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `string` | No | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `array` | No | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `bool` | No | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `bool` | No | Whether the calendar content shows up in the calendar UI. |
| `summary` | `string` | No | Title of the calendar. |
| `summaryOverride` | `string` | No | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `string` | No | The time zone of the calendar. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CalendarList()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CalendarList()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CalendarList()->load(["id" => "calendar_list_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->CalendarList()->remove(["id" => "calendar_list_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->CalendarList()->update([
  "id" => "calendar_list_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CalendarListEntity`

Create a new `CalendarListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ChannelEntity

```php
$channel = $client->Channel();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Channel()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ChannelEntity`

Create a new `ChannelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ColorEntity

```php
$color = $client->Color();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendar` | `array` | No | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `array` | No | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `string` | No | Type of the resource ("calendar#colors"). |
| `updated` | `string` | No | Last modification time of the color palette (as a RFC3339 timestamp). |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Color()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ColorEntity`

Create a new `ColorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `string` | No | The user's access role for this calendar. |
| `anyoneCanAddSelf` | `bool` | No | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `array` | No | File attachments for the event. |
| `attendees` | `array` | No | The attendees of the event. |
| `attendeesOmitted` | `bool` | No | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `string` | No | The color of the event. |
| `conferenceData` | `array` | No | The conference-related information, such as details of a Google Meet conference. |
| `created` | `string` | No | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `array` | No | The creator of the event. |
| `defaultReminders` | `array` | No | The default reminders on the calendar for the authenticated user. |
| `description` | `string` | No | Description of the event. |
| `end` | `array` | No | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `bool` | No | Whether the end time is actually unspecified. |
| `etag` | `string` | No | ETag of the resource. |
| `eventType` | `string` | No | Specific type of the event. |
| `extendedProperties` | `array` | No | Extended properties of the event. |
| `gadget` | `array` | No | A gadget that extends this event. |
| `guestsCanInviteOthers` | `bool` | No | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `bool` | No | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `bool` | No | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `string` | No | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `string` | No | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `string` | No | Event unique identifier as defined in RFC5545. |
| `id` | `string` | No | Opaque identifier of the event. |
| `items` | `array` | No | List of events on the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#event"). |
| `location` | `string` | No | Geographic location of the event as free-form text. |
| `locked` | `bool` | No | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `string` | No | Token used to access the next page of this result. |
| `nextSyncToken` | `string` | No | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `array` | No | The organizer of the event. |
| `originalStartTime` | `array` | No | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `bool` | No | If set to True, Event propagation is disabled. |
| `recurrence` | `array` | No | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `string` | No | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `array` | No | Information about the event's reminders for the authenticated user. |
| `sequence` | `int` | No | Sequence number as per iCalendar. |
| `source` | `array` | No | Source from which the event was created. |
| `start` | `array` | No | The (inclusive) start time of the event. |
| `status` | `string` | No | Status of the event. |
| `summary` | `string` | No | Title of the event. |
| `timeZone` | `string` | No | The time zone of the calendar. |
| `transparency` | `string` | No | Whether the event blocks time on the calendar. |
| `updated` | `string` | No | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `string` | No | Visibility of the event. |
| `workingLocationProperties` | `array` | No | Developer Preview: Working Location event data. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Event()->create([
  "calendar_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Event()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Event()->load(["id" => "event_id", "calendar_id" => "calendar_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Event()->remove(["id" => "event_id", "calendar_id" => "calendar_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Event()->update([
  "id" => "event_id",
  "calendar_id" => "calendar_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FreeBusyEntity

```php
$free_busy = $client->FreeBusy();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendarExpansionMax` | `int` | No | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `array` | No | List of free/busy information for calendars. |
| `groupExpansionMax` | `int` | No | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `array` | No | Expansion of groups. |
| `items` | `array` | No | List of calendars and/or groups to query. |
| `kind` | `string` | No | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `string` | No | The end of the interval. |
| `timeMin` | `string` | No | The start of the interval. |
| `timeZone` | `string` | No | Time zone used in the response. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->FreeBusy()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FreeBusyEntity`

Create a new `FreeBusyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImportEntity

```php
$import = $client->Import();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImportEntity`

Create a new `ImportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QuickAddEntity

```php
$quick_add = $client->QuickAdd();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QuickAddEntity`

Create a new `QuickAddEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SettingEntity

```php
$setting = $client->Setting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | The id of the user setting. |
| `kind` | `string` | No | Type of the resource ("calendar#setting"). |
| `value` | `string` | No | Value of the user setting. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Setting()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Setting()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Setting()->load(["id" => "setting_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SettingEntity`

Create a new `SettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StopEntity

```php
$stop = $client->Stop();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StopEntity`

Create a new `StopEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WatchEntity

```php
$watch = $client->Watch();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WatchEntity`

Create a new `WatchEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new GcalSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

