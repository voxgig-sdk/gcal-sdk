# Gcal JavaScript SDK



The JavaScript SDK for the Gcal API — an entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Acl()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```js
npm install gcal
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.


### Create a Client

```js
const { GcalSDK } = require('@voxgig-sdk/gcal-js')

const client = new GcalSDK({
  apikey: process.env.GCAL_APIKEY,
})
```

### Load an Acl

```js
const acl = await client.Acl().load({ id: 'acl_id', calendar_id: 'example_calendar_id' })
console.log(acl)
```

### List Acl Records

```js
const acls = await client.Acl().list({ calendar_id: "example" })
for (const acl of acls) {
  console.log(acl)
}
```

### Create a Acl

```js
const created = await client.Acl().create({
  calendar_id: 'example_calendar_id',
})
console.log(created)
```

### Update a Acl

```js
const updated = await client.Acl().update({
  id: 'acl_id',
  calendar_id: 'example_calendar_id',
  alt: 'example_alt',
})
console.log(updated)
```

### Remove a Acl

```js
await client.Acl().remove({ id: 'acl_id', calendar_id: 'example_calendar_id' })
```

### Direct API Access

Use `client.direct()` to call any API endpoint directly:

```js
const result = await client.direct({
  path: '/custom/endpoint/{id}',
  method: 'GET',
  params: { id: 'abc123' },
})

if (result.ok) {
  console.log(result.data)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const calendar = await client.Calendar().load({ id: "example_id" })
  console.log(calendar)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```js
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```js
const client = GcalSDK.test()

const calendar = await client.Calendar().load({ id: 'test01' })
// calendar is the entity, populated with mock response data
// — call calendar.data() for the record itself
console.log(calendar)
```

You can also use the instance method:

```js
const client = new GcalSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```js
const entity = client.Calendar()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```js
const logger = {
  hooks: {
    PreRequest: (ctx) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new GcalSDK({
  apikey: '...',
  extend: [logger],
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
cd js && npm test
```


## Reference

### GcalSDK

#### Constructor

```js
new GcalSDK(options?)
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Acl(data?)` | `AclEntity` | Create an Acl entity instance. |
| `Calendar(data?)` | `CalendarEntity` | Create a Calendar entity instance. |
| `CalendarList(data?)` | `CalendarListEntity` | Create a CalendarList entity instance. |
| `Channel(data?)` | `ChannelEntity` | Create a Channel entity instance. |
| `Color(data?)` | `ColorEntity` | Create a Color entity instance. |
| `Event(data?)` | `EventEntity` | Create an Event entity instance. |
| `FreeBusy(data?)` | `FreeBusyEntity` | Create a FreeBusy entity instance. |
| `Import(data?)` | `ImportEntity` | Create an Import entity instance. |
| `QuickAdd(data?)` | `QuickAddEntity` | Create a QuickAdd entity instance. |
| `Setting(data?)` | `SettingEntity` | Create a Setting entity instance. |
| `Stop(data?)` | `StopEntity` | Create a Stop entity instance. |
| `Watch(data?)` | `WatchEntity` | Create a Watch entity instance. |
| `tester(testopts?, sdkopts?)` | `GcalSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `GcalSDK.test(testopts?, sdkopts?)` | `GcalSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GcalSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `undefined`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```js
{
  ok: true,
  status: 200,
  headers: {},
  data: {}
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```js
{
  url: 'string',
  method: 'string',
  headers: {},
  body: undefined
}
```

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

API path: `/users/me/calendarList/watch`

#### Channel

| Field | Description |
| --- | --- |

Operations: create.

API path: `/channels/stop`

#### Color

| Field | Description |
| --- | --- |
| `calendar` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | Type of the resource ("calendar#colors"). |
| `updated` | Last modification time of the color palette (as a RFC3339 timestamp). |

Operations: load.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create.

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

Operations: create, list, load.

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

Create an instance: `const acl = client.Acl()`

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
| `scope` | `Object` | The extent to which calendar access is granted by this ACL rule. |
| `type` | `string` | The type of the scope. |
| `value` | `string` | The email address of a user or group, or the name of a domain, depending on the scope type. |

#### Example: Load

```ts
const acl = await client.Acl().load({ id: 'acl_id', calendar_id: 'calendar_id' })
```

#### Example: List

```ts
const acls = await client.Acl().list({ calendar_id: "example" })
```

#### Example: Create

```ts
const acl = await client.Acl().create({
  calendar_id: 'example_calendar_id',
})
```


### Calendar

Create an instance: `const calendar = client.Calendar()`

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
| `allowedConferenceSolutionTypes` | `Array` | The types of conference solutions that are supported for this calendar. |
| `conferenceProperties` | `Object` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendar"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `summary` | `string` | Title of the calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```ts
const calendar = await client.Calendar().load({ id: 'calendar_id' })
```

#### Example: Create

```ts
const calendar = await client.Calendar().create({
})
```


### CalendarList

Create an instance: `const calendar_list = client.CalendarList()`

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
| `conferenceProperties` | `Object` | Conferencing properties for this calendar, for example what types of conferences are allowed. |
| `defaultReminders` | `Array` | The default reminders that the authenticated user has for this calendar. |
| `deleted` | `boolean` | Whether this calendar list entry has been deleted from the calendar list. |
| `description` | `string` | Description of the calendar. |
| `etag` | `string` | ETag of the resource. |
| `foregroundColor` | `string` | The foreground color of the calendar in the hexadecimal format "#ffffff". |
| `hidden` | `boolean` | Whether the calendar has been hidden from the list. |
| `id` | `string` | Identifier of the calendar. |
| `kind` | `string` | Type of the resource ("calendar#calendarListEntry"). |
| `location` | `string` | Geographic location of the calendar as free-form text. |
| `notificationSettings` | `Object` | The notifications that the authenticated user is receiving for this calendar. |
| `primary` | `boolean` | Whether the calendar is the primary calendar of the authenticated user. |
| `selected` | `boolean` | Whether the calendar content shows up in the calendar UI. |
| `summary` | `string` | Title of the calendar. |
| `summaryOverride` | `string` | The summary that the authenticated user has set for this calendar. |
| `timeZone` | `string` | The time zone of the calendar. |

#### Example: Load

```ts
const calendar_list = await client.CalendarList().load({ id: 'calendar_list_id' })
```

#### Example: List

```ts
const calendar_lists = await client.CalendarList().list()
```

#### Example: Create

```ts
const calendar_list = await client.CalendarList().create({
})
```


### Channel

Create an instance: `const channel = client.Channel()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const channel = await client.Channel().create({
})
```


### Color

Create an instance: `const color = client.Color()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendar` | `Object` | A global palette of calendar colors, mapping from the color ID to its definition. |
| `event` | `Object` | A global palette of event colors, mapping from the color ID to its definition. |
| `kind` | `string` | Type of the resource ("calendar#colors"). |
| `updated` | `string` | Last modification time of the color palette (as a RFC3339 timestamp). |

#### Example: Load

```ts
const color = await client.Color().load()
```


### Event

Create an instance: `const event = client.Event()`

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
| `attachments` | `Array` | File attachments for the event. |
| `attendees` | `Array` | The attendees of the event. |
| `attendeesOmitted` | `boolean` | Whether attendees may have been omitted from the event's representation. |
| `colorId` | `string` | The color of the event. |
| `conferenceData` | `Object` | The conference-related information, such as details of a Google Meet conference. |
| `created` | `string` | Creation time of the event (as a RFC3339 timestamp). |
| `creator` | `Object` | The creator of the event. |
| `defaultReminders` | `Array` | The default reminders on the calendar for the authenticated user. |
| `description` | `string` | Description of the event. |
| `end` | `Object` | The (exclusive) end time of the event. |
| `endTimeUnspecified` | `boolean` | Whether the end time is actually unspecified. |
| `etag` | `string` | ETag of the resource. |
| `eventType` | `string` | Specific type of the event. |
| `extendedProperties` | `Object` | Extended properties of the event. |
| `gadget` | `Object` | A gadget that extends this event. |
| `guestsCanInviteOthers` | `boolean` | Whether attendees other than the organizer can invite others to the event. |
| `guestsCanModify` | `boolean` | Whether attendees other than the organizer can modify the event. |
| `guestsCanSeeOtherGuests` | `boolean` | Whether attendees other than the organizer can see who the event's attendees are. |
| `hangoutLink` | `string` | An absolute link to the Google Hangout associated with this event. |
| `htmlLink` | `string` | An absolute link to this event in the Google Calendar Web UI. |
| `iCalUID` | `string` | Event unique identifier as defined in RFC5545. |
| `id` | `string` | Opaque identifier of the event. |
| `items` | `Array` | List of events on the calendar. |
| `kind` | `string` | Type of the resource ("calendar#event"). |
| `location` | `string` | Geographic location of the event as free-form text. |
| `locked` | `boolean` | Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". |
| `nextPageToken` | `string` | Token used to access the next page of this result. |
| `nextSyncToken` | `string` | Token used at a later point in time to retrieve only the entries that have changed since this result was returned. |
| `organizer` | `Object` | The organizer of the event. |
| `originalStartTime` | `Object` | For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. |
| `privateCopy` | `boolean` | If set to True, Event propagation is disabled. |
| `recurrence` | `Array` | List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. |
| `recurringEventId` | `string` | For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. |
| `reminders` | `Object` | Information about the event's reminders for the authenticated user. |
| `sequence` | `number` | Sequence number as per iCalendar. |
| `source` | `Object` | Source from which the event was created. |
| `start` | `Object` | The (inclusive) start time of the event. |
| `status` | `string` | Status of the event. |
| `summary` | `string` | Title of the event. |
| `timeZone` | `string` | The time zone of the calendar. |
| `transparency` | `string` | Whether the event blocks time on the calendar. |
| `updated` | `string` | Last modification time of the event (as a RFC3339 timestamp). |
| `visibility` | `string` | Visibility of the event. |
| `workingLocationProperties` | `Object` | Developer Preview: Working Location event data. |

#### Example: Load

```ts
const event = await client.Event().load({ id: 'event_id', calendar_id: 'calendar_id' })
```

#### Example: List

```ts
const events = await client.Event().list({ calendar_id: "example" })
```

#### Example: Create

```ts
const event = await client.Event().create({
  calendar_id: 'example_calendar_id',
})
```


### FreeBusy

Create an instance: `const free_busy = client.FreeBusy()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendarExpansionMax` | `number` | Maximal number of calendars for which FreeBusy information is to be provided. |
| `calendars` | `Object` | List of free/busy information for calendars. |
| `groupExpansionMax` | `number` | Maximal number of calendar identifiers to be provided for a single group. |
| `groups` | `Object` | Expansion of groups. |
| `items` | `Array` | List of calendars and/or groups to query. |
| `kind` | `string` | Type of the resource ("calendar#freeBusy"). |
| `timeMax` | `string` | The end of the interval. |
| `timeMin` | `string` | The start of the interval. |
| `timeZone` | `string` | Time zone used in the response. |

#### Example: Create

```ts
const free_busy = await client.FreeBusy().create({
})
```


### Import

Create an instance: `const import_ = client.Import()`


### QuickAdd

Create an instance: `const quick_add = client.QuickAdd()`


### Setting

Create an instance: `const setting = client.Setting()`

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

```ts
const setting = await client.Setting().load({ id: 'setting_id' })
```

#### Example: List

```ts
const settings = await client.Setting().list()
```

#### Example: Create

```ts
const setting = await client.Setting().create({
})
```


### Stop

Create an instance: `const stop = client.Stop()`


### Watch

Create an instance: `const watch = client.Watch()`

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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
gcal/
├── src/
│   ├── GcalSDK.js        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
└── test/                   # Test suites
```

Import the SDK from the package root:

```js
const { GcalSDK } = require('@voxgig-sdk/gcal-js')
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const calendar = client.Calendar()
await calendar.load({ id: "example_id" })

// calendar.data() now returns the calendar data from the last `load`
// calendar.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
