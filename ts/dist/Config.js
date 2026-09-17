"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
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
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
            acl: {},
            calendar: {},
            calendar_list: {},
            channel: {},
            color: {},
            event: {},
            free_busy: {},
            import: {},
            quick_add: {},
            setting: {},
            stop: {},
            watch: {},
        }
    };
    entity = {
        "acl": {
            "fields": [
                {
                    "name": "etag",
                    "short": "ETag of the resource.",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Identifier of the Access Control List (ACL) rule.",
                    "type": "`$STRING`"
                },
                {
                    "name": "kind",
                    "short": "Type of the resource (\"calendar#aclRule\").",
                    "type": "`$STRING`"
                },
                {
                    "name": "role",
                    "short": "The role assigned to the scope.",
                    "type": "`$STRING`"
                },
                {
                    "name": "scope",
                    "short": "The extent to which calendar access is granted by this ACL rule.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "type",
                    "short": "The type of the scope.",
                    "type": "`$STRING`"
                },
                {
                    "name": "value",
                    "short": "The email address of a user or group, or the name of a domain, depending on the scope type.",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "acl",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_deleted",
                                        "orig": "show_deleted",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/acl/watch",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "acl"
                                },
                                {
                                    "lit": "watch"
                                }
                            ],
                            "select": {
                                "$action": "watch",
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "key",
                                    "max_result",
                                    "oauth_token",
                                    "page_token",
                                    "pretty_print",
                                    "quota_user",
                                    "show_deleted",
                                    "sync_token",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.params`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "acl",
                                "watch"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/acl",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "acl"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.scope`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "acl"
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
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_deleted",
                                        "orig": "show_deleted",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/{calendarId}/acl",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "acl"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "key",
                                    "max_result",
                                    "oauth_token",
                                    "page_token",
                                    "pretty_print",
                                    "quota_user",
                                    "show_deleted",
                                    "sync_token",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "acl"
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
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "rule_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/{calendarId}/acl/{ruleId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "ruleId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "acl"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.scope`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "acl",
                                "{id}"
                            ]
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "rule_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/calendars/{calendarId}/acl/{ruleId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "ruleId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "acl"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.scope`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "acl",
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
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "rule_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/calendars/{calendarId}/acl/{ruleId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "ruleId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "acl"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "acl",
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
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "rule_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/calendars/{calendarId}/acl/{ruleId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "ruleId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "acl"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.scope`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "acl",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "calendar"
                    ]
                ]
            }
        },
        "calendar": {
            "fields": [
                {
                    "name": "allowedConferenceSolutionTypes",
                    "short": "The types of conference solutions that are supported for this calendar.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "conferenceProperties",
                    "short": "Conferencing properties for this calendar, for example what types of conferences are allowed.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "description",
                    "short": "Description of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "etag",
                    "short": "ETag of the resource.",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Identifier of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "kind",
                    "short": "Type of the resource (\"calendar#calendar\").",
                    "type": "`$STRING`"
                },
                {
                    "name": "location",
                    "short": "Geographic location of the calendar as free-form text.",
                    "type": "`$STRING`"
                },
                {
                    "name": "summary",
                    "short": "Title of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "timeZone",
                    "short": "The time zone of the calendar.",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "calendar",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/clear",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "clear"
                                }
                            ],
                            "select": {
                                "$action": "clear",
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{id}",
                                "clear"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars",
                            "segments": [
                                {
                                    "lit": "calendars"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.conferenceProperties`"
                            },
                            "parts": [
                                "calendars"
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
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.conferenceProperties`"
                            },
                            "parts": [
                                "calendars",
                                "{id}"
                            ]
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/calendars/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.conferenceProperties`"
                            },
                            "parts": [
                                "calendars",
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
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/calendars/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
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
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/calendars/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.conferenceProperties`"
                            },
                            "parts": [
                                "calendars",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "calendar_list": {
            "fields": [
                {
                    "name": "accessRole",
                    "short": "The effective access role that the authenticated user has on the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "backgroundColor",
                    "short": "The main color of the calendar in the hexadecimal format \"#0088aa\".",
                    "type": "`$STRING`"
                },
                {
                    "name": "colorId",
                    "short": "The color of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "conferenceProperties",
                    "short": "Conferencing properties for this calendar, for example what types of conferences are allowed.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "defaultReminders",
                    "short": "The default reminders that the authenticated user has for this calendar.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "deleted",
                    "short": "Whether this calendar list entry has been deleted from the calendar list.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "description",
                    "short": "Description of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "etag",
                    "short": "ETag of the resource.",
                    "type": "`$STRING`"
                },
                {
                    "name": "foregroundColor",
                    "short": "The foreground color of the calendar in the hexadecimal format \"#ffffff\".",
                    "type": "`$STRING`"
                },
                {
                    "name": "hidden",
                    "short": "Whether the calendar has been hidden from the list.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "id",
                    "short": "Identifier of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "kind",
                    "short": "Type of the resource (\"calendar#calendarListEntry\").",
                    "type": "`$STRING`"
                },
                {
                    "name": "location",
                    "short": "Geographic location of the calendar as free-form text.",
                    "type": "`$STRING`"
                },
                {
                    "name": "notificationSettings",
                    "short": "The notifications that the authenticated user is receiving for this calendar.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "primary",
                    "short": "Whether the calendar is the primary calendar of the authenticated user.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "selected",
                    "short": "Whether the calendar content shows up in the calendar UI.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "summary",
                    "short": "Title of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "summaryOverride",
                    "short": "The summary that the authenticated user has set for this calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "timeZone",
                    "short": "The time zone of the calendar.",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "calendar_list",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "min_access_role",
                                        "orig": "min_access_role",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_deleted",
                                        "orig": "show_deleted",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_hidden",
                                        "orig": "show_hidden",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/users/me/calendarList/watch",
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "calendarList"
                                },
                                {
                                    "lit": "watch"
                                }
                            ],
                            "select": {
                                "$action": "watch",
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "max_result",
                                    "min_access_role",
                                    "oauth_token",
                                    "page_token",
                                    "pretty_print",
                                    "quota_user",
                                    "show_deleted",
                                    "show_hidden",
                                    "sync_token",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.params`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "calendarList",
                                "watch"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "color_rgb_format",
                                        "orig": "color_rgb_format",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/users/me/calendarList",
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "calendarList"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "color_rgb_format",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "calendarList"
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
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "min_access_role",
                                        "orig": "min_access_role",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_deleted",
                                        "orig": "show_deleted",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_hidden",
                                        "orig": "show_hidden",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/users/me/calendarList",
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "calendarList"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "max_result",
                                    "min_access_role",
                                    "oauth_token",
                                    "page_token",
                                    "pretty_print",
                                    "quota_user",
                                    "show_deleted",
                                    "show_hidden",
                                    "sync_token",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "calendarList"
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
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/users/me/calendarList/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "calendarList"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "calendarList",
                                "{id}"
                            ]
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "color_rgb_format",
                                        "orig": "color_rgb_format",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/users/me/calendarList/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "calendarList"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "color_rgb_format",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "calendarList",
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
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/users/me/calendarList/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "calendarList"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "calendarList",
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
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "color_rgb_format",
                                        "orig": "color_rgb_format",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/users/me/calendarList/{calendarId}",
                            "rename": {
                                "param": {
                                    "calendarId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "calendarList"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "color_rgb_format",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "calendarList",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "channel": {
            "fields": [],
            "name": "channel",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/channels/stop",
                            "segments": [
                                {
                                    "lit": "channels"
                                },
                                {
                                    "lit": "stop"
                                }
                            ],
                            "select": {
                                "$action": "stop",
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "channels",
                                "stop"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "color": {
            "fields": [
                {
                    "name": "calendar",
                    "short": "A global palette of calendar colors, mapping from the color ID to its definition.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "event",
                    "short": "A global palette of event colors, mapping from the color ID to its definition.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "kind",
                    "short": "Type of the resource (\"calendar#colors\").",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "updated",
                    "short": "Last modification time of the color palette (as a RFC3339 timestamp).",
                    "type": "`$STRING`"
                }
            ],
            "name": "color",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/colors",
                            "segments": [
                                {
                                    "lit": "colors"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "colors"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "event": {
            "fields": [
                {
                    "name": "accessRole",
                    "short": "The user's access role for this calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "anyoneCanAddSelf",
                    "short": "Whether anyone can invite themselves to the event (deprecated).",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "attachments",
                    "short": "File attachments for the event.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "attendees",
                    "short": "The attendees of the event.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "attendeesOmitted",
                    "short": "Whether attendees may have been omitted from the event's representation.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "colorId",
                    "short": "The color of the event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "conferenceData",
                    "short": "The conference-related information, such as details of a Google Meet conference.",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "date-time",
                    "name": "created",
                    "short": "Creation time of the event (as a RFC3339 timestamp).",
                    "type": "`$STRING`"
                },
                {
                    "name": "creator",
                    "short": "The creator of the event.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "defaultReminders",
                    "short": "The default reminders on the calendar for the authenticated user.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "description",
                    "short": "Description of the event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "end",
                    "short": "The (exclusive) end time of the event.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "endTimeUnspecified",
                    "short": "Whether the end time is actually unspecified.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "etag",
                    "short": "ETag of the resource.",
                    "type": "`$STRING`"
                },
                {
                    "name": "eventType",
                    "short": "Specific type of the event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "extendedProperties",
                    "short": "Extended properties of the event.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "gadget",
                    "short": "A gadget that extends this event.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "guestsCanInviteOthers",
                    "short": "Whether attendees other than the organizer can invite others to the event.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "guestsCanModify",
                    "short": "Whether attendees other than the organizer can modify the event.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "guestsCanSeeOtherGuests",
                    "short": "Whether attendees other than the organizer can see who the event's attendees are.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "hangoutLink",
                    "short": "An absolute link to the Google Hangout associated with this event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "htmlLink",
                    "short": "An absolute link to this event in the Google Calendar Web UI.",
                    "type": "`$STRING`"
                },
                {
                    "name": "iCalUID",
                    "short": "Event unique identifier as defined in RFC5545.",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Opaque identifier of the event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "items",
                    "short": "List of events on the calendar.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "kind",
                    "short": "Type of the resource (\"calendar#event\").",
                    "type": "`$STRING`"
                },
                {
                    "name": "location",
                    "short": "Geographic location of the event as free-form text.",
                    "type": "`$STRING`"
                },
                {
                    "name": "locked",
                    "short": "Whether this is a locked event copy where no changes can be made to the main event fields \"summary\", \"description\", \"location\", \"start\", \"end\" or \"recurrence\".",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "nextPageToken",
                    "short": "Token used to access the next page of this result.",
                    "type": "`$STRING`"
                },
                {
                    "name": "nextSyncToken",
                    "short": "Token used at a later point in time to retrieve only the entries that have changed since this result was returned.",
                    "type": "`$STRING`"
                },
                {
                    "name": "organizer",
                    "short": "The organizer of the event.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "originalStartTime",
                    "short": "For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "privateCopy",
                    "short": "If set to True, Event propagation is disabled.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "recurrence",
                    "short": "List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "recurringEventId",
                    "short": "For an instance of a recurring event, this is the id of the recurring event to which this instance belongs.",
                    "type": "`$STRING`"
                },
                {
                    "name": "reminders",
                    "short": "Information about the event's reminders for the authenticated user.",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "int32",
                    "name": "sequence",
                    "short": "Sequence number as per iCalendar.",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "source",
                    "short": "Source from which the event was created.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "start",
                    "short": "The (inclusive) start time of the event.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "status",
                    "short": "Status of the event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "summary",
                    "short": "Title of the event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "timeZone",
                    "short": "The time zone of the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "name": "transparency",
                    "short": "Whether the event blocks time on the calendar.",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "updated",
                    "short": "Last modification time of the event (as a RFC3339 timestamp).",
                    "type": "`$STRING`"
                },
                {
                    "name": "visibility",
                    "short": "Visibility of the event.",
                    "type": "`$STRING`"
                },
                {
                    "name": "workingLocationProperties",
                    "short": "Developer Preview: Working Location event data.",
                    "type": "`$OBJECT`"
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
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "always_include_email",
                                        "orig": "always_include_email",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "event_type",
                                        "orig": "event_type",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "i_cal_uid",
                                        "orig": "i_cal_uid",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_attendee",
                                        "orig": "max_attendee",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "order_by",
                                        "orig": "order_by",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "private_extended_property",
                                        "orig": "private_extended_property",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "shared_extended_property",
                                        "orig": "shared_extended_property",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_deleted",
                                        "orig": "show_deleted",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_hidden_invitation",
                                        "orig": "show_hidden_invitation",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "single_event",
                                        "orig": "single_event",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_max",
                                        "orig": "time_max",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_min",
                                        "orig": "time_min",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_zone",
                                        "orig": "time_zone",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "updated_min",
                                        "orig": "updated_min",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/events/watch",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "lit": "watch"
                                }
                            ],
                            "select": {
                                "$action": "watch",
                                "exist": [
                                    "alt",
                                    "always_include_email",
                                    "calendar_id",
                                    "event_type",
                                    "field",
                                    "i_cal_uid",
                                    "key",
                                    "max_attendee",
                                    "max_result",
                                    "oauth_token",
                                    "order_by",
                                    "page_token",
                                    "pretty_print",
                                    "private_extended_property",
                                    "q",
                                    "quota_user",
                                    "shared_extended_property",
                                    "show_deleted",
                                    "show_hidden_invitation",
                                    "single_event",
                                    "sync_token",
                                    "time_max",
                                    "time_min",
                                    "time_zone",
                                    "updated_min",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.params`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events",
                                "watch"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "conference_data_version",
                                        "orig": "conference_data_version",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_attendee",
                                        "orig": "max_attendee",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_update",
                                        "orig": "send_update",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "supports_attachment",
                                        "orig": "supports_attachment",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/events",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "conference_data_version",
                                    "field",
                                    "key",
                                    "max_attendee",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "send_update",
                                    "supports_attachment",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "event_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "destination",
                                        "orig": "destination",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_update",
                                        "orig": "send_update",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/events/{eventId}/move",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "move"
                                }
                            ],
                            "select": {
                                "$action": "move",
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "destination",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "send_update",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events",
                                "{id}",
                                "move"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_update",
                                        "orig": "send_update",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "text",
                                        "orig": "text",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/events/quickAdd",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "lit": "quickAdd"
                                }
                            ],
                            "select": {
                                "$action": "quick_add",
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "send_update",
                                    "text",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events",
                                "quickAdd"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "conference_data_version",
                                        "orig": "conference_data_version",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "supports_attachment",
                                        "orig": "supports_attachment",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/calendars/{calendarId}/events/import",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "lit": "import"
                                }
                            ],
                            "select": {
                                "$action": "import",
                                "exist": [
                                    "alt",
                                    "calendar_id",
                                    "conference_data_version",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "supports_attachment",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events",
                                "import"
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
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "always_include_email",
                                        "orig": "always_include_email",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "event_type",
                                        "orig": "event_type",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "i_cal_uid",
                                        "orig": "i_cal_uid",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_attendee",
                                        "orig": "max_attendee",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "order_by",
                                        "orig": "order_by",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "private_extended_property",
                                        "orig": "private_extended_property",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "shared_extended_property",
                                        "orig": "shared_extended_property",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_deleted",
                                        "orig": "show_deleted",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_hidden_invitation",
                                        "orig": "show_hidden_invitation",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "single_event",
                                        "orig": "single_event",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_max",
                                        "orig": "time_max",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_min",
                                        "orig": "time_min",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_zone",
                                        "orig": "time_zone",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "updated_min",
                                        "orig": "updated_min",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/{calendarId}/events",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "always_include_email",
                                    "calendar_id",
                                    "event_type",
                                    "field",
                                    "i_cal_uid",
                                    "key",
                                    "max_attendee",
                                    "max_result",
                                    "oauth_token",
                                    "order_by",
                                    "page_token",
                                    "pretty_print",
                                    "private_extended_property",
                                    "q",
                                    "quota_user",
                                    "shared_extended_property",
                                    "show_deleted",
                                    "show_hidden_invitation",
                                    "single_event",
                                    "sync_token",
                                    "time_max",
                                    "time_min",
                                    "time_zone",
                                    "updated_min",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "event_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "always_include_email",
                                        "orig": "always_include_email",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_attendee",
                                        "orig": "max_attendee",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "original_start",
                                        "orig": "original_start",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "show_deleted",
                                        "orig": "show_deleted",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_max",
                                        "orig": "time_max",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_min",
                                        "orig": "time_min",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_zone",
                                        "orig": "time_zone",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/{calendarId}/events/{eventId}/instances",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "instances"
                                }
                            ],
                            "select": {
                                "$action": "instance",
                                "exist": [
                                    "alt",
                                    "always_include_email",
                                    "calendar_id",
                                    "field",
                                    "id",
                                    "key",
                                    "max_attendee",
                                    "max_result",
                                    "oauth_token",
                                    "original_start",
                                    "page_token",
                                    "pretty_print",
                                    "quota_user",
                                    "show_deleted",
                                    "time_max",
                                    "time_min",
                                    "time_zone",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events",
                                "{id}",
                                "instances"
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
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "event_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "always_include_email",
                                        "orig": "always_include_email",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_attendee",
                                        "orig": "max_attendee",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time_zone",
                                        "orig": "time_zone",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/calendars/{calendarId}/events/{eventId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
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
                                    "alt",
                                    "always_include_email",
                                    "calendar_id",
                                    "field",
                                    "id",
                                    "key",
                                    "max_attendee",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "time_zone",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events",
                                "{id}"
                            ]
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "event_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "always_include_email",
                                        "orig": "always_include_email",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "conference_data_version",
                                        "orig": "conference_data_version",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_attendee",
                                        "orig": "max_attendee",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_update",
                                        "orig": "send_update",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "supports_attachment",
                                        "orig": "supports_attachment",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/calendars/{calendarId}/events/{eventId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
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
                                    "alt",
                                    "always_include_email",
                                    "calendar_id",
                                    "conference_data_version",
                                    "field",
                                    "id",
                                    "key",
                                    "max_attendee",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "send_update",
                                    "supports_attachment",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
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
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "event_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_update",
                                        "orig": "send_update",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/calendars/{calendarId}/events/{eventId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
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
                                    "alt",
                                    "calendar_id",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "send_update",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
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
                                        "name": "calendar_id",
                                        "orig": "calendar_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "event_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "always_include_email",
                                        "orig": "always_include_email",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "conference_data_version",
                                        "orig": "conference_data_version",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_attendee",
                                        "orig": "max_attendee",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_notification",
                                        "orig": "send_notification",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "send_update",
                                        "orig": "send_update",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "supports_attachment",
                                        "orig": "supports_attachment",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/calendars/{calendarId}/events/{eventId}",
                            "rename": {
                                "param": {
                                    "calendarId": "calendar_id",
                                    "eventId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
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
                                    "alt",
                                    "always_include_email",
                                    "calendar_id",
                                    "conference_data_version",
                                    "field",
                                    "id",
                                    "key",
                                    "max_attendee",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "send_notification",
                                    "send_update",
                                    "supports_attachment",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "calendars",
                                "{calendar_id}",
                                "events",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "calendar"
                    ]
                ]
            }
        },
        "free_busy": {
            "fields": [
                {
                    "format": "int32",
                    "name": "calendarExpansionMax",
                    "short": "Maximal number of calendars for which FreeBusy information is to be provided.",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "calendars",
                    "short": "List of free/busy information for calendars.",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "int32",
                    "name": "groupExpansionMax",
                    "short": "Maximal number of calendar identifiers to be provided for a single group.",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "groups",
                    "short": "Expansion of groups.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "items",
                    "short": "List of calendars and/or groups to query.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "kind",
                    "short": "Type of the resource (\"calendar#freeBusy\").",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "timeMax",
                    "short": "The end of the interval.",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "timeMin",
                    "short": "The start of the interval.",
                    "type": "`$STRING`"
                },
                {
                    "name": "timeZone",
                    "short": "Time zone used in the response.",
                    "type": "`$STRING`"
                }
            ],
            "name": "free_busy",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/freeBusy",
                            "segments": [
                                {
                                    "lit": "freeBusy"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "freeBusy"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "import": {
            "fields": [],
            "name": "import",
            "op": {},
            "relations": {
                "ancestors": [
                    [
                        "calendar"
                    ]
                ]
            }
        },
        "quick_add": {
            "fields": [],
            "name": "quick_add",
            "op": {},
            "relations": {
                "ancestors": [
                    [
                        "calendar"
                    ]
                ]
            }
        },
        "setting": {
            "fields": [
                {
                    "name": "etag",
                    "short": "ETag of the resource.",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "The id of the user setting.",
                    "type": "`$STRING`"
                },
                {
                    "name": "kind",
                    "short": "Type of the resource (\"calendar#setting\").",
                    "type": "`$STRING`"
                },
                {
                    "name": "value",
                    "short": "Value of the user setting.",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "setting",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/users/me/settings/watch",
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "settings"
                                },
                                {
                                    "lit": "watch"
                                }
                            ],
                            "select": {
                                "$action": "watch",
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "max_result",
                                    "oauth_token",
                                    "page_token",
                                    "pretty_print",
                                    "quota_user",
                                    "sync_token",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.params`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "settings",
                                "watch"
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
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sync_token",
                                        "orig": "sync_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/users/me/settings",
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "settings"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "key",
                                    "max_result",
                                    "oauth_token",
                                    "page_token",
                                    "pretty_print",
                                    "quota_user",
                                    "sync_token",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "settings"
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
                                        "orig": "setting",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alt",
                                        "orig": "alt",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "oauth_token",
                                        "orig": "oauth_token",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty_print",
                                        "orig": "pretty_print",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "quota_user",
                                        "orig": "quota_user",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_ip",
                                        "orig": "user_ip",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/users/me/settings/{setting}",
                            "rename": {
                                "param": {
                                    "setting": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "me"
                                },
                                {
                                    "lit": "settings"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alt",
                                    "field",
                                    "id",
                                    "key",
                                    "oauth_token",
                                    "pretty_print",
                                    "quota_user",
                                    "user_ip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users",
                                "me",
                                "settings",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "stop": {
            "fields": [],
            "name": "stop",
            "op": {},
            "relations": {
                "ancestors": []
            }
        },
        "watch": {
            "fields": [],
            "name": "watch",
            "op": {},
            "relations": {
                "ancestors": [
                    [
                        "calendar"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map