# Calendar API

Manipulates events and other calendar data.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 12 entities and 37 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Acl](docs/api/acl.html)

Results: Successful response.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `etag`: ETag of the resource.
- `id`: A UUID or similar unique string that identifies this channel.
- `kind`: Identifies this as a notification channel used to watch for changes to a resource, which is &quot;api#channel&quot;.
- `role`: The role assigned to the scope. Possible values are: - &quot;none&quot; - Provides no access. - &quot;freeBusyReader&quot; - Provides read access to free/busy information. - &quot;reader&quot; - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - &quot;writer&quot; - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. - &quot;owner&quot; - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs.
- `scope`: The extent to which calendar access is granted by this ACL rule.

### [Calendar](docs/api/calendar.html)

Results: Successful response.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `allowedConferenceSolutionTypes`: The types of conference solutions that are supported for this calendar. The possible values are: - &quot;eventHangout&quot; - &quot;eventNamedHangout&quot; - &quot;hangoutsMeet&quot; Optional.
- `conferenceProperties`: Conferencing properties for this calendar, for example what types of conferences are allowed.
- `description`: Description of the calendar. Optional.
- `etag`: ETag of the resource.
- `id`: Identifier of the calendar. To retrieve IDs call the calendarList.list() method.

### [CalendarList](docs/api/calendar_list.html)

Results: Successful response.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `accessRole`: The effective access role that the authenticated user has on the calendar. Read-only. Possible values are: - &quot;freeBusyReader&quot; - Provides read access to free/busy information. - &quot;reader&quot; - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - &quot;writer&quot; - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. - &quot;owner&quot; - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs.
- `backgroundColor`: The main color of the calendar in the hexadecimal format &quot;#0088aa&quot;. This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional.
- `colorId`: The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional.
- `conferenceProperties`: Conferencing properties for this calendar, for example what types of conferences are allowed.
- `defaultReminders`: The default reminders that the authenticated user has for this calendar.

### [Channel](docs/api/channel.html)

Results: Successful response.

SDK operations: `create`.

### [Color](docs/api/color.html)

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `calendar`: A global palette of calendar colors, mapping from the color ID to its definition. A calendarListEntry resource refers to one of these color IDs in its colorId field. Read-only.
- `event`: A global palette of event colors, mapping from the color ID to its definition. An event resource may refer to one of these color IDs in its colorId field. Read-only.
- `kind`: Type of the resource (&quot;calendar#colors&quot;).
- `updated`: Last modification time of the color palette (as a RFC3339 timestamp). Read-only.

### [Event](docs/api/event.html)

Results: Successful response.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `accessRole`: The user&#39;s access role for this calendar. Read-only. Possible values are: - &quot;none&quot; - The user has no access. - &quot;freeBusyReader&quot; - The user has read access to free/busy information. - &quot;reader&quot; - The user has read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - &quot;writer&quot; - The user has read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. - &quot;owner&quot; - The user has ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs.
- `anyoneCanAddSelf`: Whether anyone can invite themselves to the event (deprecated). Optional. The default is False.
- `attachments`: File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event,
- `attendees`: The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list.
- `attendeesOmitted`: Whether attendees may have been omitted from the event&#39;s representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant&#39;s response. Optional. The default is False.

### [FreeBusy](docs/api/free_busy.html)

Results: Successful response.

SDK operations: `create`.

Key fields to recognise:

- `calendarExpansionMax`: Maximal number of calendars for which FreeBusy information is to be provided.
- `calendars`: List of free/busy information for calendars.
- `groupExpansionMax`: Maximal number of calendar identifiers to be provided for a single group.
- `groups`: Expansion of groups.
- `items`: List of calendars and/or groups to query.

### [Import](docs/api/import.html)

SDK operations: .

### [QuickAdd](docs/api/quick_add.html)

SDK operations: .

### [Setting](docs/api/setting.html)

Results: Successful response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `etag`: Etag of the collection.
- `id`: A UUID or similar unique string that identifies this channel.
- `kind`: Identifies this as a notification channel used to watch for changes to a resource, which is &quot;api#channel&quot;.
- `value`: Value of the user setting. The format of the value depends on the ID of the setting. It must always be a UTF-8 string of length up to 1024 characters.

### [Stop](docs/api/stop.html)

SDK operations: .

### [Watch](docs/api/watch.html)

SDK operations: .

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Acl](docs/api/acl.html) | `create` | `POST /calendars/{calendarId}/acl/watch` | Required |
| [Acl](docs/api/acl.html) | `create` | `POST /calendars/{calendarId}/acl` | Required |
| [Acl](docs/api/acl.html) | `list` | `GET /calendars/{calendarId}/acl` | Required |
| [Acl](docs/api/acl.html) | `load` | `GET /calendars/{calendarId}/acl/{ruleId}` | Required |
| [Acl](docs/api/acl.html) | `patch` | `PATCH /calendars/{calendarId}/acl/{ruleId}` | Required |
| [Acl](docs/api/acl.html) | `remove` | `DELETE /calendars/{calendarId}/acl/{ruleId}` | Required |
| [Acl](docs/api/acl.html) | `update` | `PUT /calendars/{calendarId}/acl/{ruleId}` | Required |
| [Calendar](docs/api/calendar.html) | `create` | `POST /calendars/{calendarId}/clear` | Required |
| [Calendar](docs/api/calendar.html) | `create` | `POST /calendars` | Required |
| [Calendar](docs/api/calendar.html) | `load` | `GET /calendars/{calendarId}` | Required |
| [Calendar](docs/api/calendar.html) | `patch` | `PATCH /calendars/{calendarId}` | Required |
| [Calendar](docs/api/calendar.html) | `remove` | `DELETE /calendars/{calendarId}` | Required |
| [Calendar](docs/api/calendar.html) | `update` | `PUT /calendars/{calendarId}` | Required |
| [CalendarList](docs/api/calendar_list.html) | `create` | `POST /users/me/calendarList/watch` | Required |
| [CalendarList](docs/api/calendar_list.html) | `create` | `POST /users/me/calendarList` | Required |
| [CalendarList](docs/api/calendar_list.html) | `list` | `GET /users/me/calendarList` | Required |
| [CalendarList](docs/api/calendar_list.html) | `load` | `GET /users/me/calendarList/{calendarId}` | Required |
| [CalendarList](docs/api/calendar_list.html) | `patch` | `PATCH /users/me/calendarList/{calendarId}` | Required |
| [CalendarList](docs/api/calendar_list.html) | `remove` | `DELETE /users/me/calendarList/{calendarId}` | Required |
| [CalendarList](docs/api/calendar_list.html) | `update` | `PUT /users/me/calendarList/{calendarId}` | Required |
| [Channel](docs/api/channel.html) | `create` | `POST /channels/stop` | Required |
| [Color](docs/api/color.html) | `load` | `GET /colors` | Required |
| [Event](docs/api/event.html) | `create` | `POST /calendars/{calendarId}/events/watch` | Required |
| [Event](docs/api/event.html) | `create` | `POST /calendars/{calendarId}/events` | Required |
| [Event](docs/api/event.html) | `create` | `POST /calendars/{calendarId}/events/{eventId}/move` | Required |
| [Event](docs/api/event.html) | `create` | `POST /calendars/{calendarId}/events/quickAdd` | Required |
| [Event](docs/api/event.html) | `create` | `POST /calendars/{calendarId}/events/import` | Required |
| [Event](docs/api/event.html) | `list` | `GET /calendars/{calendarId}/events` | Required |
| [Event](docs/api/event.html) | `list` | `GET /calendars/{calendarId}/events/{eventId}/instances` | Required |
| [Event](docs/api/event.html) | `load` | `GET /calendars/{calendarId}/events/{eventId}` | Required |
| [Event](docs/api/event.html) | `patch` | `PATCH /calendars/{calendarId}/events/{eventId}` | Required |
| [Event](docs/api/event.html) | `remove` | `DELETE /calendars/{calendarId}/events/{eventId}` | Required |
| [Event](docs/api/event.html) | `update` | `PUT /calendars/{calendarId}/events/{eventId}` | Required |
| [FreeBusy](docs/api/free_busy.html) | `create` | `POST /freeBusy` | Required |
| [Setting](docs/api/setting.html) | `create` | `POST /users/me/settings/watch` | Required |
| [Setting](docs/api/setting.html) | `list` | `GET /users/me/settings` | Required |
| [Setting](docs/api/setting.html) | `load` | `GET /users/me/settings/{setting}` | Required |

## Connect to the API

- API server: `https://www.googleapis.com/calendar/v3`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Oauth 2.0 implicit authentication

Oauth 2.0 authorizationCode authentication

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `gcal_list`: List records for an entity. Supported entities: `acl`, `calendar_list`, `event`, `setting`.
- `gcal_load`: Load one record for an entity. Supported entities: `acl`, `calendar`, `calendar_list`, `color`, `event`, `setting`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

