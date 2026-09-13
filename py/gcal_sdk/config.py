# Gcal SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Gcal",
            "slug": "gcal",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://www.googleapis.com/calendar/v3",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "event": {},
            },
        },
        "entity": {
      "event": {
        "fields": [
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "end",
            "op": {
              "create": {
                "req": True,
                "type": "`$OBJECT`",
              },
              "update": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "type": "`$OBJECT`",
          },
          {
            "name": "htmlLink",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "start",
            "op": {
              "create": {
                "req": True,
                "type": "`$OBJECT`",
              },
              "update": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "summary",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "type": "`$STRING`",
          },
          {
            "name": "updated",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "event",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/calendars/primary/events",
                "segments": [
                  {
                    "lit": "calendars",
                  },
                  {
                    "lit": "primary",
                  },
                  {
                    "lit": "events",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "calendars",
                  "primary",
                  "events",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "order_by",
                      "orig": "order_by",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "single_event",
                      "orig": "single_event",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/calendars/primary/events",
                "segments": [
                  {
                    "lit": "calendars",
                  },
                  {
                    "lit": "primary",
                  },
                  {
                    "lit": "events",
                  },
                ],
                "select": {
                  "exist": [
                    "order_by",
                    "single_event",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "parts": [
                  "calendars",
                  "primary",
                  "events",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "event_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/calendars/primary/events/{eventId}",
                "rename": {
                  "param": {
                    "eventId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "calendars",
                  },
                  {
                    "lit": "primary",
                  },
                  {
                    "lit": "events",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "calendars",
                  "primary",
                  "events",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "event_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/calendars/primary/events/{eventId}",
                "rename": {
                  "param": {
                    "eventId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "calendars",
                  },
                  {
                    "lit": "primary",
                  },
                  {
                    "lit": "events",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "calendars",
                  "primary",
                  "events",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "event_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/calendars/primary/events/{eventId}",
                "rename": {
                  "param": {
                    "eventId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "calendars",
                  },
                  {
                    "lit": "primary",
                  },
                  {
                    "lit": "events",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "calendars",
                  "primary",
                  "events",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
