<?php
declare(strict_types=1);

// Gcal SDK configuration

class GcalConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Gcal",
                "slug" => "gcal",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://www.googleapis.com/calendar/v3",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "event" => [],
                ],
            ],
            "entity" => [
        'event' => [
          'fields' => [
            [
              'name' => 'created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'end',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
                'update' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
              ],
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'htmlLink',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'start',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
                'update' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
              ],
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'summary',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
                'update' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updated',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'event',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/calendars/primary/events',
                  'segments' => [
                    [
                      'lit' => 'calendars',
                    ],
                    [
                      'lit' => 'primary',
                    ],
                    [
                      'lit' => 'events',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'calendars',
                    'primary',
                    'events',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'order_by',
                        'orig' => 'order_by',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'single_event',
                        'orig' => 'single_event',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/calendars/primary/events',
                  'segments' => [
                    [
                      'lit' => 'calendars',
                    ],
                    [
                      'lit' => 'primary',
                    ],
                    [
                      'lit' => 'events',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'order_by',
                      'single_event',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.items`',
                  ],
                  'parts' => [
                    'calendars',
                    'primary',
                    'events',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'event_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/calendars/primary/events/{eventId}',
                  'rename' => [
                    'param' => [
                      'eventId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'calendars',
                    ],
                    [
                      'lit' => 'primary',
                    ],
                    [
                      'lit' => 'events',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'calendars',
                    'primary',
                    'events',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'event_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/calendars/primary/events/{eventId}',
                  'rename' => [
                    'param' => [
                      'eventId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'calendars',
                    ],
                    [
                      'lit' => 'primary',
                    ],
                    [
                      'lit' => 'events',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'calendars',
                    'primary',
                    'events',
                    '{id}',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'event_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/calendars/primary/events/{eventId}',
                  'rename' => [
                    'param' => [
                      'eventId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'calendars',
                    ],
                    [
                      'lit' => 'primary',
                    ],
                    [
                      'lit' => 'events',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'calendars',
                    'primary',
                    'events',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GcalFeatures::make_feature($name);
    }
}
