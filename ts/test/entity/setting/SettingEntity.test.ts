

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GcalSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GCAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('GCAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GcalSDK.test()
    const ent = testsdk.Setting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GCAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'setting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"etag","req":false,"short":"ETag of the resource.","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"The id of the user setting.","type":"`$STRING`","index$":1},{"active":true,"name":"kind","req":false,"short":"Type of the resource (\"calendar#setting\").","type":"`$STRING`","index$":2},{"active":true,"name":"value","req":false,"short":"Value of the user setting.","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"setting","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"alt","orig":"alt","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"max_result","orig":"max_result","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"oauth_token","orig":"oauth_token","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"page_token","orig":"page_token","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"pretty_print","orig":"pretty_print","reqd":false,"type":"`$BOOLEAN`","index$":6},{"active":true,"kind":"query","name":"quota_user","orig":"quota_user","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"kind":"query","name":"sync_token","orig":"sync_token","reqd":false,"type":"`$STRING`","index$":8},{"active":true,"kind":"query","name":"user_ip","orig":"user_ip","reqd":false,"type":"`$STRING`","index$":9}]},"contract":{"id":"POST /users/me/settings/watch","json":"{\"operationId\":\"calendar.settings.watch\",\"parameters\":[{\"description\":\"Data format for the response.\",\"in\":\"query\",\"name\":\"alt\",\"schema\":{\"enum\":[\"json\"],\"type\":\"string\"}},{\"description\":\"Selector specifying which fields to include in a partial response.\",\"in\":\"query\",\"name\":\"fields\",\"schema\":{\"type\":\"string\"}},{\"description\":\"API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"description\":\"OAuth 2.0 token for the current user.\",\"in\":\"query\",\"name\":\"oauth_token\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Returns response with indentations and line breaks.\",\"in\":\"query\",\"name\":\"prettyPrint\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"An opaque string that represents a user for quota purposes. Must not exceed 40 characters.\",\"in\":\"query\",\"name\":\"quotaUser\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Deprecated. Please use quotaUser instead.\",\"in\":\"query\",\"name\":\"userIp\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.\",\"in\":\"query\",\"name\":\"maxResults\",\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Token specifying which result page to return. Optional.\",\"in\":\"query\",\"name\":\"pageToken\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then.\\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\\nLearn more about incremental synchronization.\\nOptional. The default is to return all entries.\",\"in\":\"query\",\"name\":\"syncToken\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"description\":\"The address where notifications are delivered for this channel.\",\"type\":\"string\"},\"expiration\":{\"description\":\"Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional.\",\"format\":\"int64\",\"type\":\"string\"},\"id\":{\"description\":\"A UUID or similar unique string that identifies this channel.\",\"type\":\"string\"},\"kind\":{\"default\":\"api#channel\",\"description\":\"Identifies this as a notification channel used to watch for changes to a resource, which is \\\"api#channel\\\".\",\"type\":\"string\"},\"params\":{\"additionalProperties\":{\"description\":\"Declares a new parameter by name.\",\"type\":\"string\"},\"description\":\"Additional parameters controlling delivery channel behavior. Optional.\",\"type\":\"object\"},\"payload\":{\"description\":\"A Boolean value to indicate whether payload is wanted. Optional.\",\"type\":\"boolean\"},\"resourceId\":{\"description\":\"An opaque ID that identifies the resource being watched on this channel. Stable across different API versions.\",\"type\":\"string\"},\"resourceUri\":{\"description\":\"A version-specific identifier for the watched resource.\",\"type\":\"string\"},\"token\":{\"description\":\"An arbitrary string delivered to the target address with each notification delivered over this channel. Optional.\",\"type\":\"string\"},\"type\":{\"description\":\"The type of delivery mechanism used for this channel. Valid values are \\\"web_hook\\\" (or \\\"webhook\\\"). Both values refer to a channel where Http requests are used to deliver messages.\",\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"description\":\"The address where notifications are delivered for this channel.\",\"type\":\"string\"},\"expiration\":{\"description\":\"Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional.\",\"format\":\"int64\",\"type\":\"string\"},\"id\":{\"description\":\"A UUID or similar unique string that identifies this channel.\",\"type\":\"string\"},\"kind\":{\"default\":\"api#channel\",\"description\":\"Identifies this as a notification channel used to watch for changes to a resource, which is \\\"api#channel\\\".\",\"type\":\"string\"},\"params\":{\"additionalProperties\":{\"description\":\"Declares a new parameter by name.\",\"type\":\"string\"},\"description\":\"Additional parameters controlling delivery channel behavior. Optional.\",\"type\":\"object\"},\"payload\":{\"description\":\"A Boolean value to indicate whether payload is wanted. Optional.\",\"type\":\"boolean\"},\"resourceId\":{\"description\":\"An opaque ID that identifies the resource being watched on this channel. Stable across different API versions.\",\"type\":\"string\"},\"resourceUri\":{\"description\":\"A version-specific identifier for the watched resource.\",\"type\":\"string\"},\"token\":{\"description\":\"An arbitrary string delivered to the target address with each notification delivered over this channel. Optional.\",\"type\":\"string\"},\"type\":{\"description\":\"The type of delivery mechanism used for this channel. Valid values are \\\"web_hook\\\" (or \\\"webhook\\\"). Both values refer to a channel where Http requests are used to deliver messages.\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.readonly\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"]}],\"securitySchemes\":{\"Oauth2\":{\"description\":\"Oauth 2.0 implicit authentication\",\"flows\":{\"implicit\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"}}},\"type\":\"oauth2\"},\"Oauth2c\":{\"description\":\"Oauth 2.0 authorizationCode authentication\",\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"},\"tokenUrl\":\"https://accounts.google.com/o/oauth2/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/users/me/settings/watch","segments":[{"lit":"users"},{"lit":"me"},{"lit":"settings"},{"lit":"watch"}],"select":{"$action":"watch","exist":["alt","field","key","max_result","oauth_token","page_token","pretty_print","quota_user","sync_token","user_ip"]},"transform":{"req":"`reqdata`","res":"`body.params`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"alt","orig":"alt","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"max_result","orig":"max_result","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"oauth_token","orig":"oauth_token","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"page_token","orig":"page_token","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"pretty_print","orig":"pretty_print","reqd":false,"type":"`$BOOLEAN`","index$":6},{"active":true,"kind":"query","name":"quota_user","orig":"quota_user","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"kind":"query","name":"sync_token","orig":"sync_token","reqd":false,"type":"`$STRING`","index$":8},{"active":true,"kind":"query","name":"user_ip","orig":"user_ip","reqd":false,"type":"`$STRING`","index$":9}]},"contract":{"id":"GET /users/me/settings","json":"{\"operationId\":\"calendar.settings.list\",\"parameters\":[{\"description\":\"Data format for the response.\",\"in\":\"query\",\"name\":\"alt\",\"schema\":{\"enum\":[\"json\"],\"type\":\"string\"}},{\"description\":\"Selector specifying which fields to include in a partial response.\",\"in\":\"query\",\"name\":\"fields\",\"schema\":{\"type\":\"string\"}},{\"description\":\"API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"description\":\"OAuth 2.0 token for the current user.\",\"in\":\"query\",\"name\":\"oauth_token\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Returns response with indentations and line breaks.\",\"in\":\"query\",\"name\":\"prettyPrint\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"An opaque string that represents a user for quota purposes. Must not exceed 40 characters.\",\"in\":\"query\",\"name\":\"quotaUser\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Deprecated. Please use quotaUser instead.\",\"in\":\"query\",\"name\":\"userIp\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.\",\"in\":\"query\",\"name\":\"maxResults\",\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Token specifying which result page to return. Optional.\",\"in\":\"query\",\"name\":\"pageToken\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then.\\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\\nLearn more about incremental synchronization.\\nOptional. The default is to return all entries.\",\"in\":\"query\",\"name\":\"syncToken\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"etag\":{\"description\":\"Etag of the collection.\",\"type\":\"string\"},\"items\":{\"description\":\"List of user settings.\",\"items\":{\"properties\":{\"etag\":{\"description\":\"ETag of the resource.\",\"type\":\"string\"},\"id\":{\"description\":\"The id of the user setting.\",\"type\":\"string\"},\"kind\":{\"default\":\"calendar#setting\",\"description\":\"Type of the resource (\\\"calendar#setting\\\").\",\"type\":\"string\"},\"value\":{\"description\":\"Value of the user setting. The format of the value depends on the ID of the setting. It must always be a UTF-8 string of length up to 1024 characters.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"kind\":{\"default\":\"calendar#settings\",\"description\":\"Type of the collection (\\\"calendar#settings\\\").\",\"type\":\"string\"},\"nextPageToken\":{\"description\":\"Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided.\",\"type\":\"string\"},\"nextSyncToken\":{\"description\":\"Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided.\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.readonly\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"]}],\"securitySchemes\":{\"Oauth2\":{\"description\":\"Oauth 2.0 implicit authentication\",\"flows\":{\"implicit\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"}}},\"type\":\"oauth2\"},\"Oauth2c\":{\"description\":\"Oauth 2.0 authorizationCode authentication\",\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"},\"tokenUrl\":\"https://accounts.google.com/o/oauth2/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/users/me/settings","segments":[{"lit":"users"},{"lit":"me"},{"lit":"settings"}],"select":{"exist":["alt","field","key","max_result","oauth_token","page_token","pretty_print","quota_user","sync_token","user_ip"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"setting","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"alt","orig":"alt","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"oauth_token","orig":"oauth_token","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"pretty_print","orig":"pretty_print","reqd":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"kind":"query","name":"quota_user","orig":"quota_user","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"user_ip","orig":"user_ip","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /users/me/settings/{setting}","json":"{\"operationId\":\"calendar.settings.get\",\"parameters\":[{\"description\":\"Data format for the response.\",\"in\":\"query\",\"name\":\"alt\",\"schema\":{\"enum\":[\"json\"],\"type\":\"string\"}},{\"description\":\"Selector specifying which fields to include in a partial response.\",\"in\":\"query\",\"name\":\"fields\",\"schema\":{\"type\":\"string\"}},{\"description\":\"API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"description\":\"OAuth 2.0 token for the current user.\",\"in\":\"query\",\"name\":\"oauth_token\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Returns response with indentations and line breaks.\",\"in\":\"query\",\"name\":\"prettyPrint\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"An opaque string that represents a user for quota purposes. Must not exceed 40 characters.\",\"in\":\"query\",\"name\":\"quotaUser\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Deprecated. Please use quotaUser instead.\",\"in\":\"query\",\"name\":\"userIp\",\"schema\":{\"type\":\"string\"}},{\"description\":\"The id of the user setting.\",\"in\":\"path\",\"name\":\"setting\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"etag\":{\"description\":\"ETag of the resource.\",\"type\":\"string\"},\"id\":{\"description\":\"The id of the user setting.\",\"type\":\"string\"},\"kind\":{\"default\":\"calendar#setting\",\"description\":\"Type of the resource (\\\"calendar#setting\\\").\",\"type\":\"string\"},\"value\":{\"description\":\"Value of the user setting. The format of the value depends on the ID of the setting. It must always be a UTF-8 string of length up to 1024 characters.\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.readonly\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.settings.readonly\"]}],\"securitySchemes\":{\"Oauth2\":{\"description\":\"Oauth 2.0 implicit authentication\",\"flows\":{\"implicit\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"}}},\"type\":\"oauth2\"},\"Oauth2c\":{\"description\":\"Oauth 2.0 authorizationCode authentication\",\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"},\"tokenUrl\":\"https://accounts.google.com/o/oauth2/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/users/me/settings/{setting}","rename":{"param":{"setting":"id"}},"segments":[{"lit":"users"},{"lit":"me"},{"lit":"settings"},{"var":"id"}],"select":{"exist":["alt","field","id","key","oauth_token","pretty_print","quota_user","user_ip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"setting","name__orig":"setting","Name":"Setting","name_":"setting","name-":"setting","NAME":"SETTING","index$":9}, {"active":true,"entity":"setting","key$":"BasicSettingFlow","kind":"basic","name":"BasicSettingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"setting_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"setting_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"setting_ref01","srcdatavar":"setting_ref01_data","suffix":"_dt0"},"match":{"id":"setting01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-setting_ref01"}}],"index$":2}]}, 'Setting')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const setting_ref01_ent = client.Setting()
    let setting_ref01_data = setup.data.new.setting['setting_ref01']

    setting_ref01_data = (await setting_ref01_ent.create(setting_ref01_data)).data()
    assert(null != setting_ref01_data.id)


    // LIST
    const setting_ref01_match: any = {}

    const setting_ref01_list = (await setting_ref01_ent.list(setting_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(setting_ref01_list, { id: setting_ref01_data.id })))


    // LOAD
    const setting_ref01_match_dt0: any = {}
    setting_ref01_match_dt0.id = setting_ref01_data.id
    const setting_ref01_data_dt0 = (await setting_ref01_ent.load(setting_ref01_match_dt0)).data()
    assert(setting_ref01_data_dt0.id === setting_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/setting/SettingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GcalSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['setting01','setting02','setting03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GCAL_TEST_SETTING_ENTID': idmap,
    'GCAL_TEST_LIVE': 'FALSE',
    'GCAL_TEST_EXPLAIN': 'FALSE',
    'GCAL_APIKEY': '',
  })

  idmap = env['GCAL_TEST_SETTING_ENTID']

  const live = 'TRUE' === env.GCAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GCAL_TEST_SETTING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GcalSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
