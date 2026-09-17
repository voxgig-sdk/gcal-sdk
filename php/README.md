# Gcal PHP SDK



The PHP SDK for the Gcal API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Acl()` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/gcal-sdk/releases](https://github.com/voxgig-sdk/gcal-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'gcal_sdk.php';

$client = new GcalSDK([
    "apikey" => getenv("GCAL_APIKEY"),
]);
```

### 2. List acl records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $acls = $client->Acl()->list();
    foreach ($acls as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["etag"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an acl

Acl is nested under calendar, so provide the `calendar_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Acl record (throws on error).
    $acl = $client->Acl()->load(["calendar_id" => "example_calendar_id", "id" => "example_id"]);
    print_r($acl->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Acl record.
$created = $client->Acl()->create(["calendar_id" => "example_calendar_id"]);

// Update — index the record via data_get() ($created->data_get()["id"]).
$client->Acl()->update(["id" => $created->data_get()["id"], "calendar_id" => "example_calendar_id", "alt" => "example_alt"]);

// Remove
$client->Acl()->remove(["id" => $created->data_get()["id"], "calendar_id" => "example_calendar_id"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $calendar = $client->Calendar()->load(["id" => "example_id"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = GcalSDK::test([
    "entity" => ["calendar" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$calendar = $client->Calendar()->load(["id" => "test01"]);
print_r($calendar->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new GcalSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
GCAL_TEST_LIVE=TRUE
GCAL_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### GcalSDK

```php
require_once 'gcal_sdk.php';
$client = new GcalSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = GcalSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### GcalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Acl` | `($data): AclEntity` | Create an Acl entity instance. |
| `Calendar` | `($data): CalendarEntity` | Create a Calendar entity instance. |
| `CalendarList` | `($data): CalendarListEntity` | Create a CalendarList entity instance. |
| `Channel` | `($data): ChannelEntity` | Create a Channel entity instance. |
| `Color` | `($data): ColorEntity` | Create a Color entity instance. |
| `Event` | `($data): EventEntity` | Create an Event entity instance. |
| `FreeBusy` | `($data): FreeBusyEntity` | Create a FreeBusy entity instance. |
| `Import` | `($data): ImportEntity` | Create an Import entity instance. |
| `QuickAdd` | `($data): QuickAddEntity` | Create a QuickAdd entity instance. |
| `Setting` | `($data): SettingEntity` | Create a Setting entity instance. |
| `Stop` | `($data): StopEntity` | Create a Stop entity instance. |
| `Watch` | `($data): WatchEntity` | Create a Watch entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$acl = $client->Acl();`

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
| `scope` | `array` | The extent to which calendar access is granted by this ACL rule. |
| `type` | `string` | The type of the scope. |
| `value` | `string` | The email address of a user or group, or the name of a domain, depending on the scope type. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Acl record (throws on error).
$acl = $client->Acl()->load(["id" => "acl_id", "calendar_id" => "calendar_id"]);
```

#### Example: List

```php
// list() returns an array of Acl records (throws on error).
$acls = $client->Acl()->list();
```

#### Example: Create

```php
$acl = $client->Acl()->create([
    "calendar_id" => null, // string
]);
```


### Calendar

Create an instance: `$calendar = $client->Calendar();`

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
| `allowedConferenceSolutionTypes` | `array` | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `array` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendar"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `summary` | `string` | Title of the calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Calendar record (throws on error).
$calendar = $client->Calendar()->load(["id" => "calendar_id"]);
```

#### Example: Create

```php
$calendar = $client->Calendar()->create([
]);
```


### CalendarList

Create an instance: `$calendar_list = $client->CalendarList();`

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
| `conferenceProperties` | `array` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `array` | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `bool` | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `foregroundColor` | `string` | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `bool` | Whether the calendar has been hidden from the list. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `array` | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `bool` | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `bool` | Whether the calendar content shows up in the calendar UI. |
| `summary` | `string` | Title of the calendar. |
| `summaryOverride` | `string` | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CalendarList record (throws on error).
$calendar_list = $client->CalendarList()->load(["id" => "calendar_list_id"]);
```

#### Example: List

```php
// list() returns an array of CalendarList records (throws on error).
$calendar_lists = $client->CalendarList()->list();
```

#### Example: Create

```php
$calendar_list = $client->CalendarList()->create([
]);
```


### Channel

Create an instance: `$channel = $client->Channel();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$channel = $client->Channel()->create([
]);
```


### Color

Create an instance: `$color = $client->Color();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendar` | `array` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `array` | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `string` | Type of the resource ("calendar#colors"). |
| `updated` | `string` | Last modification time of the color palette (as a RFC3339 timestamp). |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Color record (throws on error).
$color = $client->Color()->load();
```


### Event

Create an instance: `$event = $client->Event();`

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
| `anyoneCanAddSelf` | `bool` | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `array` | File attachments for the event. |
| `attendees` | `array` | The attendees of the event. |
| `attendeesOmitted` | `bool` | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `string` | The color of the event. |
| `conferenceData` | `array` | The conference-related information, such as details of a Google Meet conference. |
| `created` | `string` | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `array` | The creator of the event. |
| `defaultReminders` | `array` | The default reminders on the calendar for the authenticated user. |
| `description` | `string` | Description of the event. |
| `end` | `array` | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `bool` | Whether the end time is actually unspecified. |
| `etag` | `string` | ETag of the resource. |
| `eventType` | `string` | Specific type of the event. |
| `extendedProperties` | `array` | Extended properties of the event. |
| `gadget` | `array` | A gadget that extends this event. |
| `guestsCanInviteOthers` | `bool` | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `bool` | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `bool` | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `string` | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `string` | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `string` | Event unique identifier as defined in RFC5545. |
| `id` | `string` | Opaque identifier of the event. |
| `items` | `array` | List of events on the calendar. |
| `kind` | `string` | Type of the resource ("calendar#event"). |
| `location` | `string` | Geographic location of the event as free-form text. |
| `locked` | `bool` | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `string` | Token used to access the next page of this result. |
| `nextSyncToken` | `string` | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `array` | The organizer of the event. |
| `originalStartTime` | `array` | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `bool` | If set to True, Event propagation is disabled. |
| `recurrence` | `array` | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `string` | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `array` | Information about the event's reminders for the authenticated user. |
| `sequence` | `int` | Sequence number as per iCalendar. |
| `source` | `array` | Source from which the event was created. |
| `start` | `array` | The (inclusive) start time of the event. |
| `status` | `string` | Status of the event. |
| `summary` | `string` | Title of the event. |
| `timeZone` | `string` | The time zone of the calendar. |
| `transparency` | `string` | Whether the event blocks time on the calendar. |
| `updated` | `string` | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `string` | Visibility of the event. |
| `workingLocationProperties` | `array` | Developer Preview: Working Location event data. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Event record (throws on error).
$event = $client->Event()->load(["id" => "event_id", "calendar_id" => "calendar_id"]);
```

#### Example: List

```php
// list() returns an array of Event records (throws on error).
$events = $client->Event()->list();
```

#### Example: Create

```php
$event = $client->Event()->create([
    "calendar_id" => null, // string
]);
```


### FreeBusy

Create an instance: `$free_busy = $client->FreeBusy();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendarExpansionMax` | `int` | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `array` | List of free/busy information for calendars. |
| `groupExpansionMax` | `int` | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `array` | Expansion of groups. |
| `items` | `array` | List of calendars and/or groups to query. |
| `kind` | `string` | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `string` | The end of the interval. |
| `timeMin` | `string` | The start of the interval. |
| `timeZone` | `string` | Time zone used in the response. |

#### Example: Create

```php
$free_busy = $client->FreeBusy()->create([
]);
```


### Import

Create an instance: `$import = $client->Import();`


### QuickAdd

Create an instance: `$quick_add = $client->QuickAdd();`


### Setting

Create an instance: `$setting = $client->Setting();`

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

```php
// load() returns the ENTITY — call data_get() for the Setting record (throws on error).
$setting = $client->Setting()->load(["id" => "setting_id"]);
```

#### Example: List

```php
// list() returns an array of Setting records (throws on error).
$settings = $client->Setting()->list();
```

#### Example: Create

```php
$setting = $client->Setting()->create([
]);
```


### Stop

Create an instance: `$stop = $client->Stop();`


### Watch

Create an instance: `$watch = $client->Watch();`

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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── gcal_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`gcal_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$calendar = $client->Calendar();
$calendar->load(["id" => "example_id"]);

// $calendar->data_get() now returns the calendar data from the last load
// $calendar->match_get() returns the last match criteria
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
