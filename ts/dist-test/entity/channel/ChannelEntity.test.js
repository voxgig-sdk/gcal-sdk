"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ChannelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GCAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GCAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GcalSDK.test();
        const ent = testsdk.Channel();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GCAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'channel.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "channel", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "alt", "orig": "alt", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "field", "orig": "field", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "oauth_token", "orig": "oauth_token", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "pretty_print", "orig": "pretty_print", "reqd": false, "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "kind": "query", "name": "quota_user", "orig": "quota_user", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "user_ip", "orig": "user_ip", "reqd": false, "type": "`$STRING`", "index$": 6 }] }, "contract": { "id": "POST /channels/stop", "json": "{\"operationId\":\"calendar.channels.stop\",\"parameters\":[{\"description\":\"Data format for the response.\",\"in\":\"query\",\"name\":\"alt\",\"schema\":{\"enum\":[\"json\"],\"type\":\"string\"}},{\"description\":\"Selector specifying which fields to include in a partial response.\",\"in\":\"query\",\"name\":\"fields\",\"schema\":{\"type\":\"string\"}},{\"description\":\"API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"description\":\"OAuth 2.0 token for the current user.\",\"in\":\"query\",\"name\":\"oauth_token\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Returns response with indentations and line breaks.\",\"in\":\"query\",\"name\":\"prettyPrint\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"An opaque string that represents a user for quota purposes. Must not exceed 40 characters.\",\"in\":\"query\",\"name\":\"quotaUser\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Deprecated. Please use quotaUser instead.\",\"in\":\"query\",\"name\":\"userIp\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"description\":\"The address where notifications are delivered for this channel.\",\"type\":\"string\"},\"expiration\":{\"description\":\"Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional.\",\"format\":\"int64\",\"type\":\"string\"},\"id\":{\"description\":\"A UUID or similar unique string that identifies this channel.\",\"type\":\"string\"},\"kind\":{\"default\":\"api#channel\",\"description\":\"Identifies this as a notification channel used to watch for changes to a resource, which is \\\"api#channel\\\".\",\"type\":\"string\"},\"params\":{\"additionalProperties\":{\"description\":\"Declares a new parameter by name.\",\"type\":\"string\"},\"description\":\"Additional parameters controlling delivery channel behavior. Optional.\",\"type\":\"object\"},\"payload\":{\"description\":\"A Boolean value to indicate whether payload is wanted. Optional.\",\"type\":\"boolean\"},\"resourceId\":{\"description\":\"An opaque ID that identifies the resource being watched on this channel. Stable across different API versions.\",\"type\":\"string\"},\"resourceUri\":{\"description\":\"A version-specific identifier for the watched resource.\",\"type\":\"string\"},\"token\":{\"description\":\"An arbitrary string delivered to the target address with each notification delivered over this channel. Optional.\",\"type\":\"string\"},\"type\":{\"description\":\"The type of delivery mechanism used for this channel. Valid values are \\\"web_hook\\\" (or \\\"webhook\\\"). Both values refer to a channel where Http requests are used to deliver messages.\",\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.events\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.events\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.events.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.events.readonly\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.readonly\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"]}],\"securitySchemes\":{\"Oauth2\":{\"description\":\"Oauth 2.0 implicit authentication\",\"flows\":{\"implicit\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"}}},\"type\":\"oauth2\"},\"Oauth2c\":{\"description\":\"Oauth 2.0 authorizationCode authentication\",\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"},\"tokenUrl\":\"https://accounts.google.com/o/oauth2/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/channels/stop", "segments": [{ "lit": "channels" }, { "lit": "stop" }], "select": { "$action": "stop", "exist": ["alt", "field", "key", "oauth_token", "pretty_print", "quota_user", "user_ip"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "channel", "name__orig": "channel", "Name": "Channel", "name_": "channel", "name-": "channel", "NAME": "CHANNEL", "index$": 3 }, { "active": true, "entity": "channel", "key$": "BasicChannelFlow", "kind": "basic", "name": "BasicChannelFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "channel_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Channel');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const channel_ref01_ent = client.Channel();
        let channel_ref01_data = setup.data.new.channel['channel_ref01'];
        channel_ref01_data = (await channel_ref01_ent.create(channel_ref01_data)).data();
        (0, node_assert_1.default)(null != channel_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/channel/ChannelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GcalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['channel01', 'channel02', 'channel03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GCAL_TEST_CHANNEL_ENTID': idmap,
        'GCAL_TEST_LIVE': 'FALSE',
        'GCAL_TEST_EXPLAIN': 'FALSE',
        'GCAL_APIKEY': '',
    });
    idmap = env['GCAL_TEST_CHANNEL_ENTID'];
    const live = 'TRUE' === env.GCAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GCAL_TEST_CHANNEL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GcalSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.GCAL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GCAL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ChannelEntity.test.js.map