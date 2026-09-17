# Gcal TypeScript SDK Reference

Complete API reference for the Gcal TypeScript SDK.


## GcalSDK

### Constructor

```ts
new GcalSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GcalSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GcalSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GcalSDK` instance in test mode.


### Instance Methods

#### `Acl(data?: object)`

Create a new `Acl` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AclEntity` instance.

#### `Calendar(data?: object)`

Create a new `Calendar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CalendarEntity` instance.

#### `CalendarList(data?: object)`

Create a new `CalendarList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CalendarListEntity` instance.

#### `Channel(data?: object)`

Create a new `Channel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ChannelEntity` instance.

#### `Color(data?: object)`

Create a new `Color` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ColorEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `FreeBusy(data?: object)`

Create a new `FreeBusy` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FreeBusyEntity` instance.

#### `Import(data?: object)`

Create a new `Import` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImportEntity` instance.

#### `QuickAdd(data?: object)`

Create a new `QuickAdd` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QuickAddEntity` instance.

#### `Setting(data?: object)`

Create a new `Setting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SettingEntity` instance.

#### `Stop(data?: object)`

Create a new `Stop` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StopEntity` instance.

#### `Watch(data?: object)`

Create a new `Watch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WatchEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GcalSDK.test()`.

**Returns:** `GcalSDK` instance in test mode.


---

## AclEntity

```ts
const acl = client.Acl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | Identifier of the Access Control List (ACL) rule. |
| `kind` | `string` | No | Type of the resource ("calendar#aclRule"). |
| `role` | `string` | No | The role assigned to the scope. |
| `scope` | `Record<string, any>` | No | The extent to which calendar access is granted by this ACL rule. |
| `type` | `string` | No | The type of the scope. |
| `value` | `string` | No | The email address of a user or group, or the name of a domain, depending on the scope type. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `watch` | `/calendars/{calendarId}/acl/watch` | `client.Acl().create({ $action: 'watch', ... })` |

An action returns that action's OWN response, which is not necessarily a
Acl record — check the API definition for its shape.

```ts
const result = await client.Acl().create({
  $action: 'watch',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Acl().create({
  calendar_id: 'example_calendar_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Acl().list({ calendar_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Acl().load({ id: 'acl_id', calendar_id: 'calendar_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Acl().remove({ id: 'acl_id', calendar_id: 'calendar_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Acl().update({
  id: 'acl_id',
  calendar_id: 'calendar_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AclEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CalendarEntity

```ts
const calendar = client.Calendar()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowedConferenceSolutionTypes` | `any[]` | No | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `Record<string, any>` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `string` | No | Description of the calendar. |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | Identifier of the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#calendar"). |
| `location` | `string` | No | Geographic location of the calendar as free-form text. |
| `summary` | `string` | No | Title of the calendar. |
| `timeZone` | `string` | No | The time zone of the calendar. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `clear` | `/calendars/{calendarId}/clear` | `client.Calendar().create({ $action: 'clear', ... })` |

An action returns that action's OWN response, which is not necessarily a
Calendar record — check the API definition for its shape.

```ts
const result = await client.Calendar().create({
  $action: 'clear',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Calendar().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Calendar().load({ id: 'calendar_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Calendar().remove({ id: 'calendar_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Calendar().update({
  id: 'calendar_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CalendarEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CalendarListEntity

```ts
const calendar_list = client.CalendarList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `string` | No | The effective access role that the authenticated user has on the calendar. |
| `backgroundColor` | `string` | No | The main color of the calendar in the hexadecimal format "#0088aa". |
| `colorId` | `string` | No | The color of the calendar. |
| `conferenceProperties` | `Record<string, any>` | No | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `any[]` | No | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `boolean` | No | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `string` | No | Description of the calendar. |
| `etag` | `string` | No | ETag of the resource. |
| `foregroundColor` | `string` | No | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `boolean` | No | Whether the calendar has been hidden from the list. |
| `id` | `string` | No | Identifier of the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `string` | No | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `Record<string, any>` | No | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `boolean` | No | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `boolean` | No | Whether the calendar content shows up in the calendar UI. |
| `summary` | `string` | No | Title of the calendar. |
| `summaryOverride` | `string` | No | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `string` | No | The time zone of the calendar. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `watch` | `/users/me/calendarList/watch` | `client.CalendarList().create({ $action: 'watch', ... })` |

An action returns that action's OWN response, which is not necessarily a
CalendarList record — check the API definition for its shape.

```ts
const result = await client.CalendarList().create({
  $action: 'watch',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CalendarList().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CalendarList().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CalendarList().load({ id: 'calendar_list_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.CalendarList().remove({ id: 'calendar_list_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.CalendarList().update({
  id: 'calendar_list_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CalendarListEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ChannelEntity

```ts
const channel = client.Channel()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `stop` | `/channels/stop` | `client.Channel().create({ $action: 'stop', ... })` |

An action returns that action's OWN response, which is not necessarily a
Channel record — check the API definition for its shape.

```ts
const result = await client.Channel().create({
  $action: 'stop',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Channel().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ChannelEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ColorEntity

```ts
const color = client.Color()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendar` | `Record<string, any>` | No | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `Record<string, any>` | No | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `string` | No | Type of the resource ("calendar#colors"). |
| `updated` | `string` | No | Last modification time of the color palette (as a RFC3339 timestamp). |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Color().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ColorEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRole` | `string` | No | The user's access role for this calendar. |
| `anyoneCanAddSelf` | `boolean` | No | Whether anyone can invite themselves to the event (deprecated). |
| `attachments` | `any[]` | No | File attachments for the event. |
| `attendees` | `any[]` | No | The attendees of the event. |
| `attendeesOmitted` | `boolean` | No | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `string` | No | The color of the event. |
| `conferenceData` | `Record<string, any>` | No | The conference-related information, such as details of a Google Meet conference. |
| `created` | `string` | No | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `Record<string, any>` | No | The creator of the event. |
| `defaultReminders` | `any[]` | No | The default reminders on the calendar for the authenticated user. |
| `description` | `string` | No | Description of the event. |
| `end` | `Record<string, any>` | No | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `boolean` | No | Whether the end time is actually unspecified. |
| `etag` | `string` | No | ETag of the resource. |
| `eventType` | `string` | No | Specific type of the event. |
| `extendedProperties` | `Record<string, any>` | No | Extended properties of the event. |
| `gadget` | `Record<string, any>` | No | A gadget that extends this event. |
| `guestsCanInviteOthers` | `boolean` | No | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `boolean` | No | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `boolean` | No | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `string` | No | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `string` | No | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `string` | No | Event unique identifier as defined in RFC5545. |
| `id` | `string` | No | Opaque identifier of the event. |
| `items` | `any[]` | No | List of events on the calendar. |
| `kind` | `string` | No | Type of the resource ("calendar#event"). |
| `location` | `string` | No | Geographic location of the event as free-form text. |
| `locked` | `boolean` | No | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `string` | No | Token used to access the next page of this result. |
| `nextSyncToken` | `string` | No | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `Record<string, any>` | No | The organizer of the event. |
| `originalStartTime` | `Record<string, any>` | No | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `boolean` | No | If set to True, Event propagation is disabled. |
| `recurrence` | `any[]` | No | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `string` | No | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `Record<string, any>` | No | Information about the event's reminders for the authenticated user. |
| `sequence` | `number` | No | Sequence number as per iCalendar. |
| `source` | `Record<string, any>` | No | Source from which the event was created. |
| `start` | `Record<string, any>` | No | The (inclusive) start time of the event. |
| `status` | `string` | No | Status of the event. |
| `summary` | `string` | No | Title of the event. |
| `timeZone` | `string` | No | The time zone of the calendar. |
| `transparency` | `string` | No | Whether the event blocks time on the calendar. |
| `updated` | `string` | No | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `string` | No | Visibility of the event. |
| `workingLocationProperties` | `Record<string, any>` | No | Developer Preview: Working Location event data. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `import` | `/calendars/{calendarId}/events/import` | `client.Event().create({ $action: 'import', ... })` |
| `move` | `/calendars/{calendarId}/events/{eventId}/move` | `client.Event().create({ $action: 'move', ... })` |
| `quick_add` | `/calendars/{calendarId}/events/quickAdd` | `client.Event().create({ $action: 'quick_add', ... })` |
| `watch` | `/calendars/{calendarId}/events/watch` | `client.Event().create({ $action: 'watch', ... })` |
| `instance` | `/calendars/{calendarId}/events/{eventId}/instances` | `client.Event().list({ $action: 'instance', ... })` |

An action returns that action's OWN response, which is not necessarily a
Event record — check the API definition for its shape.

```ts
const result = await client.Event().create({
  $action: 'import',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Event().create({
  calendar_id: 'example_calendar_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Event().list({ calendar_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Event().load({ id: 'event_id', calendar_id: 'calendar_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Event().remove({ id: 'event_id', calendar_id: 'calendar_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Event().update({
  id: 'event_id',
  calendar_id: 'calendar_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FreeBusyEntity

```ts
const free_busy = client.FreeBusy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calendarExpansionMax` | `number` | No | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `Record<string, any>` | No | List of free/busy information for calendars. |
| `groupExpansionMax` | `number` | No | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `Record<string, any>` | No | Expansion of groups. |
| `items` | `any[]` | No | List of calendars and/or groups to query. |
| `kind` | `string` | No | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `string` | No | The end of the interval. |
| `timeMin` | `string` | No | The start of the interval. |
| `timeZone` | `string` | No | Time zone used in the response. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FreeBusy().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FreeBusyEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImportEntity

```ts
const import_ = client.Import()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImportEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QuickAddEntity

```ts
const quick_add = client.QuickAdd()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QuickAddEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SettingEntity

```ts
const setting = client.Setting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `etag` | `string` | No | ETag of the resource. |
| `id` | `string` | No | The id of the user setting. |
| `kind` | `string` | No | Type of the resource ("calendar#setting"). |
| `value` | `string` | No | Value of the user setting. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `watch` | `/users/me/settings/watch` | `client.Setting().create({ $action: 'watch', ... })` |

An action returns that action's OWN response, which is not necessarily a
Setting record — check the API definition for its shape.

```ts
const result = await client.Setting().create({
  $action: 'watch',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Setting().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Setting().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Setting().load({ id: 'setting_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StopEntity

```ts
const stop = client.Stop()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StopEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WatchEntity

```ts
const watch = client.Watch()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `GcalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new GcalSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

