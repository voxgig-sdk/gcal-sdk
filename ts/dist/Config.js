"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Gcal',
        slug: "gcal",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://www.googleapis.com/calendar/v3",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            event: {},
        }
    };
    entity = {
        "event": {
            "fields": [
                {
                    "name": "created",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "type": "`$STRING`"
                },
                {
                    "name": "end",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$OBJECT`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$OBJECT`"
                        }
                    },
                    "type": "`$OBJECT`"
                },
                {
                    "name": "htmlLink",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "location",
                    "type": "`$STRING`"
                },
                {
                    "name": "start",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$OBJECT`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$OBJECT`"
                        }
                    },
                    "type": "`$OBJECT`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "summary",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "type": "`$STRING`"
                },
                {
                    "name": "updated",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "primary"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "primary",
                                "events"
                            ]
                        }
                    ]
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "single_event",
                                        "orig": "single_event",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/primary/events",
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "primary"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "order_by",
                                    "single_event"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "parts": [
                                "calendars",
                                "primary",
                                "events"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/primary/events/{eventId}",
                            "rename": {
                                "param": {
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "primary"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "primary",
                                "events",
                                "{id}"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/calendars/primary/events/{eventId}",
                            "rename": {
                                "param": {
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "primary"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "primary",
                                "events",
                                "{id}"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/calendars/primary/events/{eventId}",
                            "rename": {
                                "param": {
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "primary"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "primary",
                                "events",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map