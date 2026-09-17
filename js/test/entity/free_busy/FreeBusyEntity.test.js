
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { GcalSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('FreeBusyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GCAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('GCAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GcalSDK.test()
    const ent = testsdk.FreeBusy()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"int32","name":"calendarExpansionMax","req":false,"short":"Maximal number of calendars for which FreeBusy information is to be provided.","type":"`$INTEGER`","index$":0},{"active":true,"name":"calendars","req":false,"short":"List of free/busy information for calendars.","type":"`$OBJECT`","index$":1},{"active":true,"format":"int32","name":"groupExpansionMax","req":false,"short":"Maximal number of calendar identifiers to be provided for a single group.","type":"`$INTEGER`","index$":2},{"active":true,"name":"groups","req":false,"short":"Expansion of groups.","type":"`$OBJECT`","index$":3},{"active":true,"name":"items","req":false,"short":"List of calendars and/or groups to query.","type":"`$ARRAY`","index$":4},{"active":true,"name":"kind","req":false,"short":"Type of the resource (\"calendar#freeBusy\").","type":"`$STRING`","index$":5},{"active":true,"format":"date-time","name":"timeMax","req":false,"short":"The end of the interval.","type":"`$STRING`","index$":6},{"active":true,"format":"date-time","name":"timeMin","req":false,"short":"The start of the interval.","type":"`$STRING`","index$":7},{"active":true,"name":"timeZone","req":false,"short":"Time zone used in the response.","type":"`$STRING`","index$":8}],"name":"free_busy","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"alt","orig":"alt","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"oauth_token","orig":"oauth_token","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"pretty_print","orig":"pretty_print","reqd":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"kind":"query","name":"quota_user","orig":"quota_user","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"user_ip","orig":"user_ip","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"POST /freeBusy","json":"{\"operationId\":\"calendar.freebusy.query\",\"parameters\":[{\"description\":\"Data format for the response.\",\"in\":\"query\",\"name\":\"alt\",\"schema\":{\"enum\":[\"json\"],\"type\":\"string\"}},{\"description\":\"Selector specifying which fields to include in a partial response.\",\"in\":\"query\",\"name\":\"fields\",\"schema\":{\"type\":\"string\"}},{\"description\":\"API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"description\":\"OAuth 2.0 token for the current user.\",\"in\":\"query\",\"name\":\"oauth_token\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Returns response with indentations and line breaks.\",\"in\":\"query\",\"name\":\"prettyPrint\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"An opaque string that represents a user for quota purposes. Must not exceed 40 characters.\",\"in\":\"query\",\"name\":\"quotaUser\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Deprecated. Please use quotaUser instead.\",\"in\":\"query\",\"name\":\"userIp\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"calendarExpansionMax\":{\"description\":\"Maximal number of calendars for which FreeBusy information is to be provided. Optional. Maximum value is 50.\",\"format\":\"int32\",\"type\":\"integer\"},\"groupExpansionMax\":{\"description\":\"Maximal number of calendar identifiers to be provided for a single group. Optional. An error is returned for a group with more members than this value. Maximum value is 100.\",\"format\":\"int32\",\"type\":\"integer\"},\"items\":{\"description\":\"List of calendars and/or groups to query.\",\"items\":{\"properties\":{\"id\":{\"description\":\"The identifier of a calendar or a group.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"timeMax\":{\"description\":\"The end of the interval for the query formatted as per RFC3339.\",\"format\":\"date-time\",\"type\":\"string\"},\"timeMin\":{\"description\":\"The start of the interval for the query formatted as per RFC3339.\",\"format\":\"date-time\",\"type\":\"string\"},\"timeZone\":{\"default\":\"UTC\",\"description\":\"Time zone used in the response. Optional. The default is UTC.\",\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"calendars\":{\"additionalProperties\":{\"description\":\"Free/busy expansions for a single calendar.\",\"properties\":{\"busy\":{\"description\":\"List of time ranges during which this calendar should be regarded as busy.\",\"items\":{\"properties\":{\"end\":{\"description\":\"The (exclusive) end of the time period.\",\"format\":\"date-time\",\"type\":\"string\"},\"start\":{\"description\":\"The (inclusive) start of the time period.\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"errors\":{\"description\":\"Optional error(s) (if computation for the calendar failed).\",\"items\":{\"properties\":{\"domain\":{\"description\":\"Domain, or broad category, of the error.\",\"type\":\"string\"},\"reason\":{\"description\":\"Specific reason for the error. Some of the possible values are:  \\n- \\\"groupTooBig\\\" - The group of users requested is too large for a single query. \\n- \\\"tooManyCalendarsRequested\\\" - The number of calendars requested is too large for a single query. \\n- \\\"notFound\\\" - The requested resource was not found. \\n- \\\"internalError\\\" - The API service has encountered an internal error.  Additional error types may be added in the future, so clients should gracefully handle additional error statuses not included in this list.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"description\":\"List of free/busy information for calendars.\",\"type\":\"object\"},\"groups\":{\"additionalProperties\":{\"description\":\"List of calendars that are members of this group.\",\"properties\":{\"calendars\":{\"description\":\"List of calendars' identifiers within a group.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"errors\":{\"description\":\"Optional error(s) (if computation for the group failed).\",\"items\":{\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/calendars/additionalProperties/properties/errors/items/properties\"},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"description\":\"Expansion of groups.\",\"type\":\"object\"},\"kind\":{\"default\":\"calendar#freeBusy\",\"description\":\"Type of the resource (\\\"calendar#freeBusy\\\").\",\"type\":\"string\"},\"timeMax\":{\"description\":\"The end of the interval.\",\"format\":\"date-time\",\"type\":\"string\"},\"timeMin\":{\"description\":\"The start of the interval.\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar\"]},{\"Oauth2\":[\"https://www.googleapis.com/auth/calendar.readonly\"],\"Oauth2c\":[\"https://www.googleapis.com/auth/calendar.readonly\"]}],\"securitySchemes\":{\"Oauth2\":{\"description\":\"Oauth 2.0 implicit authentication\",\"flows\":{\"implicit\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"}}},\"type\":\"oauth2\"},\"Oauth2c\":{\"description\":\"Oauth 2.0 authorizationCode authentication\",\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"https://www.googleapis.com/auth/calendar\":\"See, edit, share, and permanently delete all the calendars you can access using Google Calendar\",\"https://www.googleapis.com/auth/calendar.events\":\"View and edit events on all your calendars\",\"https://www.googleapis.com/auth/calendar.events.readonly\":\"View events on all your calendars\",\"https://www.googleapis.com/auth/calendar.readonly\":\"See and download any calendar you can access using your Google Calendar\",\"https://www.googleapis.com/auth/calendar.settings.readonly\":\"View your Calendar settings\"},\"tokenUrl\":\"https://accounts.google.com/o/oauth2/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/freeBusy","segments":[{"lit":"freeBusy"}],"select":{"exist":["alt","field","key","oauth_token","pretty_print","quota_user","user_ip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"free_busy","name__orig":"free_busy","Name":"FreeBusy","name_":"free_busy","name-":"free-busy","NAME":"FREE_BUSY","index$":6}, {"active":true,"entity":"free_busy","key$":"BasicFreeBusyFlow","kind":"basic","name":"BasicFreeBusyFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"free_busy_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'FreeBusy')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const free_busy_ref01_ent = client.FreeBusy()
    let free_busy_ref01_data = setup.data.new.free_busy['free_busy_ref01']

    free_busy_ref01_data = (await free_busy_ref01_ent.create(free_busy_ref01_data)).data()
    assert(null != free_busy_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/free_busy/FreeBusyTestData.json')

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
    ['free_busy01','free_busy02','free_busy03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GCAL_TEST_FREE_BUSY_ENTID': idmap,
    'GCAL_TEST_LIVE': 'FALSE',
    'GCAL_TEST_EXPLAIN': 'FALSE',
    'GCAL_APIKEY': '',
  })

  idmap = env['GCAL_TEST_FREE_BUSY_ENTID']

  const live = 'TRUE' === env.GCAL_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GCAL_TEST_FREE_BUSY_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
