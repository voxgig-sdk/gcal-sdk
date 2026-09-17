package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Gcal",
			"slug": "gcal",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://www.googleapis.com/calendar/v3",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"acl": map[string]any{},
				"calendar": map[string]any{},
				"calendar_list": map[string]any{},
				"channel": map[string]any{},
				"color": map[string]any{},
				"event": map[string]any{},
				"free_busy": map[string]any{},
				"import": map[string]any{},
				"quick_add": map[string]any{},
				"setting": map[string]any{},
				"stop": map[string]any{},
				"watch": map[string]any{},
			},
		},
		"entity": map[string]any{
			"acl": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "etag",
						"short": "ETag of the resource.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Identifier of the Access Control List (ACL) rule.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"short": "Type of the resource (\"calendar#aclRule\").",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"short": "The role assigned to the scope.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scope",
						"short": "The extent to which calendar access is granted by this ACL rule.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"short": "The type of the scope.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "The email address of a user or group, or the name of a domain, depending on the scope type.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "acl",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_deleted",
											"orig": "show_deleted",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/acl/watch",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "acl",
									},
									map[string]any{
										"lit": "watch",
									},
								},
								"select": map[string]any{
									"$action": "watch",
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.params`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"acl",
									"watch",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/acl",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "acl",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"calendar_id",
										"field",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"send_notification",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.scope`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"acl",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_deleted",
											"orig": "show_deleted",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/calendars/{calendarId}/acl",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "acl",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"acl",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rule_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/calendars/{calendarId}/acl/{ruleId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"ruleId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "acl",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"calendar_id",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.scope`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"acl",
									"{id}",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rule_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/calendars/{calendarId}/acl/{ruleId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"ruleId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "acl",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"calendar_id",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"send_notification",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.scope`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"acl",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rule_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/calendars/{calendarId}/acl/{ruleId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"ruleId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "acl",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"calendar_id",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"acl",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rule_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/calendars/{calendarId}/acl/{ruleId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"ruleId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "acl",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"calendar_id",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"send_notification",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.scope`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"acl",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"calendar",
						},
					},
				},
			},
			"calendar": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "allowedConferenceSolutionTypes",
						"short": "The types of conference solutions that are supported for this calendar.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "conferenceProperties",
						"short": "Conferencing properties for this calendar, for example what types of conferences are allowed.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "etag",
						"short": "ETag of the resource.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Identifier of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"short": "Type of the resource (\"calendar#calendar\").",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Geographic location of the calendar as free-form text.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"short": "Title of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timeZone",
						"short": "The time zone of the calendar.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "calendar",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/clear",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "clear",
									},
								},
								"select": map[string]any{
									"$action": "clear",
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{id}",
									"clear",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars",
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.conferenceProperties`",
								},
								"parts": []any{
									"calendars",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/calendars/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.conferenceProperties`",
								},
								"parts": []any{
									"calendars",
									"{id}",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/calendars/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.conferenceProperties`",
								},
								"parts": []any{
									"calendars",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/calendars/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/calendars/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.conferenceProperties`",
								},
								"parts": []any{
									"calendars",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"calendar_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accessRole",
						"short": "The effective access role that the authenticated user has on the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "backgroundColor",
						"short": "The main color of the calendar in the hexadecimal format \"#0088aa\".",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "colorId",
						"short": "The color of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "conferenceProperties",
						"short": "Conferencing properties for this calendar, for example what types of conferences are allowed.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "defaultReminders",
						"short": "The default reminders that the authenticated user has for this calendar.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "deleted",
						"short": "Whether this calendar list entry has been deleted from the calendar list.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "etag",
						"short": "ETag of the resource.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "foregroundColor",
						"short": "The foreground color of the calendar in the hexadecimal format \"#ffffff\".",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hidden",
						"short": "Whether the calendar has been hidden from the list.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"short": "Identifier of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"short": "Type of the resource (\"calendar#calendarListEntry\").",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Geographic location of the calendar as free-form text.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "notificationSettings",
						"short": "The notifications that the authenticated user is receiving for this calendar.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "primary",
						"short": "Whether the calendar is the primary calendar of the authenticated user.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "selected",
						"short": "Whether the calendar content shows up in the calendar UI.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "summary",
						"short": "Title of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summaryOverride",
						"short": "The summary that the authenticated user has set for this calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timeZone",
						"short": "The time zone of the calendar.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "calendar_list",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "min_access_role",
											"orig": "min_access_role",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_deleted",
											"orig": "show_deleted",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_hidden",
											"orig": "show_hidden",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/users/me/calendarList/watch",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "calendarList",
									},
									map[string]any{
										"lit": "watch",
									},
								},
								"select": map[string]any{
									"$action": "watch",
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.params`",
								},
								"parts": []any{
									"users",
									"me",
									"calendarList",
									"watch",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "color_rgb_format",
											"orig": "color_rgb_format",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/users/me/calendarList",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "calendarList",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"color_rgb_format",
										"field",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"me",
									"calendarList",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "min_access_role",
											"orig": "min_access_role",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_deleted",
											"orig": "show_deleted",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_hidden",
											"orig": "show_hidden",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/me/calendarList",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "calendarList",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"users",
									"me",
									"calendarList",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/me/calendarList/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "calendarList",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"me",
									"calendarList",
									"{id}",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "color_rgb_format",
											"orig": "color_rgb_format",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/users/me/calendarList/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "calendarList",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"color_rgb_format",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"me",
									"calendarList",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/me/calendarList/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "calendarList",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"me",
									"calendarList",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "color_rgb_format",
											"orig": "color_rgb_format",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/users/me/calendarList/{calendarId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "calendarList",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"color_rgb_format",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"me",
									"calendarList",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"channel": map[string]any{
				"fields": []any{},
				"name": "channel",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/channels/stop",
								"segments": []any{
									map[string]any{
										"lit": "channels",
									},
									map[string]any{
										"lit": "stop",
									},
								},
								"select": map[string]any{
									"$action": "stop",
									"exist": []any{
										"alt",
										"field",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"channels",
									"stop",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"color": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "calendar",
						"short": "A global palette of calendar colors, mapping from the color ID to its definition.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "event",
						"short": "A global palette of event colors, mapping from the color ID to its definition.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "kind",
						"short": "Type of the resource (\"calendar#colors\").",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated",
						"short": "Last modification time of the color palette (as a RFC3339 timestamp).",
						"type": "`$STRING`",
					},
				},
				"name": "color",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/colors",
								"segments": []any{
									map[string]any{
										"lit": "colors",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"colors",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accessRole",
						"short": "The user's access role for this calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "anyoneCanAddSelf",
						"short": "Whether anyone can invite themselves to the event (deprecated).",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "attachments",
						"short": "File attachments for the event.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "attendees",
						"short": "The attendees of the event.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "attendeesOmitted",
						"short": "Whether attendees may have been omitted from the event's representation.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "colorId",
						"short": "The color of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "conferenceData",
						"short": "The conference-related information, such as details of a Google Meet conference.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created",
						"short": "Creation time of the event (as a RFC3339 timestamp).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creator",
						"short": "The creator of the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "defaultReminders",
						"short": "The default reminders on the calendar for the authenticated user.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "end",
						"short": "The (exclusive) end time of the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "endTimeUnspecified",
						"short": "Whether the end time is actually unspecified.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "etag",
						"short": "ETag of the resource.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eventType",
						"short": "Specific type of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "extendedProperties",
						"short": "Extended properties of the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "gadget",
						"short": "A gadget that extends this event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "guestsCanInviteOthers",
						"short": "Whether attendees other than the organizer can invite others to the event.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "guestsCanModify",
						"short": "Whether attendees other than the organizer can modify the event.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "guestsCanSeeOtherGuests",
						"short": "Whether attendees other than the organizer can see who the event's attendees are.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "hangoutLink",
						"short": "An absolute link to the Google Hangout associated with this event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "htmlLink",
						"short": "An absolute link to this event in the Google Calendar Web UI.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iCalUID",
						"short": "Event unique identifier as defined in RFC5545.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Opaque identifier of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "items",
						"short": "List of events on the calendar.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "kind",
						"short": "Type of the resource (\"calendar#event\").",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Geographic location of the event as free-form text.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "locked",
						"short": "Whether this is a locked event copy where no changes can be made to the main event fields \"summary\", \"description\", \"location\", \"start\", \"end\" or \"recurrence\".",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "nextPageToken",
						"short": "Token used to access the next page of this result.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nextSyncToken",
						"short": "Token used at a later point in time to retrieve only the entries that have changed since this result was returned.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "organizer",
						"short": "The organizer of the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "originalStartTime",
						"short": "For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "privateCopy",
						"short": "If set to True, Event propagation is disabled.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "recurrence",
						"short": "List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "recurringEventId",
						"short": "For an instance of a recurring event, this is the id of the recurring event to which this instance belongs.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reminders",
						"short": "Information about the event's reminders for the authenticated user.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "int32",
						"name": "sequence",
						"short": "Sequence number as per iCalendar.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "source",
						"short": "Source from which the event was created.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start",
						"short": "The (inclusive) start time of the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"short": "Status of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"short": "Title of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timeZone",
						"short": "The time zone of the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "transparency",
						"short": "Whether the event blocks time on the calendar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated",
						"short": "Last modification time of the event (as a RFC3339 timestamp).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visibility",
						"short": "Visibility of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "workingLocationProperties",
						"short": "Developer Preview: Working Location event data.",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "event",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "always_include_email",
											"orig": "always_include_email",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_type",
											"orig": "event_type",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "i_cal_uid",
											"orig": "i_cal_uid",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_attendee",
											"orig": "max_attendee",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "order_by",
											"orig": "order_by",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "private_extended_property",
											"orig": "private_extended_property",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "shared_extended_property",
											"orig": "shared_extended_property",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_deleted",
											"orig": "show_deleted",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_hidden_invitation",
											"orig": "show_hidden_invitation",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "single_event",
											"orig": "single_event",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_max",
											"orig": "time_max",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_min",
											"orig": "time_min",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "updated_min",
											"orig": "updated_min",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/events/watch",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "watch",
									},
								},
								"select": map[string]any{
									"$action": "watch",
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.params`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"watch",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "conference_data_version",
											"orig": "conference_data_version",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_attendee",
											"orig": "max_attendee",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_update",
											"orig": "send_update",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "supports_attachment",
											"orig": "supports_attachment",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/events",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "destination",
											"orig": "destination",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_update",
											"orig": "send_update",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/events/{eventId}/move",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"eventId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "move",
									},
								},
								"select": map[string]any{
									"$action": "move",
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"{id}",
									"move",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_update",
											"orig": "send_update",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "text",
											"orig": "text",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/events/quickAdd",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "quickAdd",
									},
								},
								"select": map[string]any{
									"$action": "quick_add",
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"quickAdd",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "conference_data_version",
											"orig": "conference_data_version",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "supports_attachment",
											"orig": "supports_attachment",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/calendars/{calendarId}/events/import",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "import",
									},
								},
								"select": map[string]any{
									"$action": "import",
									"exist": []any{
										"alt",
										"calendar_id",
										"conference_data_version",
										"field",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"supports_attachment",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"import",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "always_include_email",
											"orig": "always_include_email",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_type",
											"orig": "event_type",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "i_cal_uid",
											"orig": "i_cal_uid",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_attendee",
											"orig": "max_attendee",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "order_by",
											"orig": "order_by",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "private_extended_property",
											"orig": "private_extended_property",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "shared_extended_property",
											"orig": "shared_extended_property",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_deleted",
											"orig": "show_deleted",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_hidden_invitation",
											"orig": "show_hidden_invitation",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "single_event",
											"orig": "single_event",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_max",
											"orig": "time_max",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_min",
											"orig": "time_min",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "updated_min",
											"orig": "updated_min",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/calendars/{calendarId}/events",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "always_include_email",
											"orig": "always_include_email",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_attendee",
											"orig": "max_attendee",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "original_start",
											"orig": "original_start",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "show_deleted",
											"orig": "show_deleted",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_max",
											"orig": "time_max",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_min",
											"orig": "time_min",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/calendars/{calendarId}/events/{eventId}/instances",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"eventId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "instances",
									},
								},
								"select": map[string]any{
									"$action": "instance",
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"{id}",
									"instances",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "always_include_email",
											"orig": "always_include_email",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_attendee",
											"orig": "max_attendee",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/calendars/{calendarId}/events/{eventId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"eventId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"{id}",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "always_include_email",
											"orig": "always_include_email",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "conference_data_version",
											"orig": "conference_data_version",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_attendee",
											"orig": "max_attendee",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_update",
											"orig": "send_update",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "supports_attachment",
											"orig": "supports_attachment",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/calendars/{calendarId}/events/{eventId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"eventId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_update",
											"orig": "send_update",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/calendars/{calendarId}/events/{eventId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"eventId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "calendar_id",
											"orig": "calendar_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "always_include_email",
											"orig": "always_include_email",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "conference_data_version",
											"orig": "conference_data_version",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_attendee",
											"orig": "max_attendee",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_notification",
											"orig": "send_notification",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "send_update",
											"orig": "send_update",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "supports_attachment",
											"orig": "supports_attachment",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/calendars/{calendarId}/events/{eventId}",
								"rename": map[string]any{
									"param": map[string]any{
										"calendarId": "calendar_id",
										"eventId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "calendars",
									},
									map[string]any{
										"var": "calendar_id",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"calendars",
									"{calendar_id}",
									"events",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"calendar",
						},
					},
				},
			},
			"free_busy": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "int32",
						"name": "calendarExpansionMax",
						"short": "Maximal number of calendars for which FreeBusy information is to be provided.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "calendars",
						"short": "List of free/busy information for calendars.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "int32",
						"name": "groupExpansionMax",
						"short": "Maximal number of calendar identifiers to be provided for a single group.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "groups",
						"short": "Expansion of groups.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "items",
						"short": "List of calendars and/or groups to query.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "kind",
						"short": "Type of the resource (\"calendar#freeBusy\").",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "timeMax",
						"short": "The end of the interval.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "timeMin",
						"short": "The start of the interval.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timeZone",
						"short": "Time zone used in the response.",
						"type": "`$STRING`",
					},
				},
				"name": "free_busy",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/freeBusy",
								"segments": []any{
									map[string]any{
										"lit": "freeBusy",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"freeBusy",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"import": map[string]any{
				"fields": []any{},
				"name": "import",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"calendar",
						},
					},
				},
			},
			"quick_add": map[string]any{
				"fields": []any{},
				"name": "quick_add",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"calendar",
						},
					},
				},
			},
			"setting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "etag",
						"short": "ETag of the resource.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The id of the user setting.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"short": "Type of the resource (\"calendar#setting\").",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "Value of the user setting.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "setting",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/users/me/settings/watch",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "settings",
									},
									map[string]any{
										"lit": "watch",
									},
								},
								"select": map[string]any{
									"$action": "watch",
									"exist": []any{
										"alt",
										"field",
										"key",
										"max_result",
										"oauth_token",
										"page_token",
										"pretty_print",
										"quota_user",
										"sync_token",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.params`",
								},
								"parts": []any{
									"users",
									"me",
									"settings",
									"watch",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sync_token",
											"orig": "sync_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/me/settings",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"key",
										"max_result",
										"oauth_token",
										"page_token",
										"pretty_print",
										"quota_user",
										"sync_token",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"users",
									"me",
									"settings",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "setting",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alt",
											"orig": "alt",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "oauth_token",
											"orig": "oauth_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty_print",
											"orig": "pretty_print",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "quota_user",
											"orig": "quota_user",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_ip",
											"orig": "user_ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/me/settings/{setting}",
								"rename": map[string]any{
									"param": map[string]any{
										"setting": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "settings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alt",
										"field",
										"id",
										"key",
										"oauth_token",
										"pretty_print",
										"quota_user",
										"user_ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"me",
									"settings",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"stop": map[string]any{
				"fields": []any{},
				"name": "stop",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"watch": map[string]any{
				"fields": []any{},
				"name": "watch",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"calendar",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
