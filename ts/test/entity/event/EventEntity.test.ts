

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


describe('EventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GCAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('GCAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GcalSDK.test()
    const ent = testsdk.Event()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GCAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"created","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"end","op":{"create":{"req":true,"type":"`$OBJECT`"},"update":{"req":true,"type":"`$OBJECT`"}},"req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"htmlLink","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"location","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"start","op":{"create":{"req":true,"type":"`$OBJECT`"},"update":{"req":true,"type":"`$OBJECT`"}},"req":false,"type":"`$OBJECT`","index$":6},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"summary","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"updated","req":false,"type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"event","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /calendars/primary/events","json":"{\"operationId\":\"createEvent\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"type\":\"string\"},\"end\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"location\":{\"type\":\"string\"},\"start\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"summary\":{\"type\":\"string\"}},\"required\":[\"summary\",\"start\",\"end\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"end\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"htmlLink\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"start\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"summary\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The created event\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/calendars/primary/events","segments":[{"lit":"calendars"},{"lit":"primary"},{"lit":"events"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"order_by","orig":"order_by","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"single_event","orig":"single_event","reqd":false,"type":"`$BOOLEAN`","index$":1}]},"contract":{"id":"GET /calendars/primary/events","json":"{\"operationId\":\"listEvents\",\"parameters\":[{\"in\":\"query\",\"name\":\"singleEvents\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"in\":\"query\",\"name\":\"orderBy\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"created\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"end\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"htmlLink\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"start\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"summary\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"A page of events\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/calendars/primary/events","segments":[{"lit":"calendars"},{"lit":"primary"},{"lit":"events"}],"select":{"exist":["order_by","single_event"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"event_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /calendars/primary/events/{eventId}","json":"{\"operationId\":\"getEvent\",\"parameters\":[{\"in\":\"path\",\"name\":\"eventId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"end\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"htmlLink\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"start\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"summary\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The requested event\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/calendars/primary/events/{eventId}","rename":{"param":{"eventId":"id"}},"segments":[{"lit":"calendars"},{"lit":"primary"},{"lit":"events"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"event_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /calendars/primary/events/{eventId}","json":"{\"operationId\":\"deleteEvent\",\"parameters\":[{\"in\":\"path\",\"name\":\"eventId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Deleted\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/calendars/primary/events/{eventId}","rename":{"param":{"eventId":"id"}},"segments":[{"lit":"calendars"},{"lit":"primary"},{"lit":"events"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"event_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PATCH /calendars/primary/events/{eventId}","json":"{\"operationId\":\"updateEvent\",\"parameters\":[{\"in\":\"path\",\"name\":\"eventId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"type\":\"string\"},\"end\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"location\":{\"type\":\"string\"},\"start\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"summary\":{\"type\":\"string\"}},\"required\":[\"summary\",\"start\",\"end\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"end\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"htmlLink\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"start\":{\"properties\":{\"dateTime\":{\"type\":\"string\"},\"timeZone\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"summary\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The updated event\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/calendars/primary/events/{eventId}","rename":{"param":{"eventId":"id"}},"segments":[{"lit":"calendars"},{"lit":"primary"},{"lit":"events"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"event","name__orig":"event","Name":"Event","name_":"event","name-":"event","NAME":"EVENT","index$":0}, {"active":true,"entity":"event","key$":"BasicEventFlow","kind":"basic","name":"BasicEventFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"event_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"event_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"event_ref01","srcdatavar":"event_ref01_data","suffix":"_up0","textfield":"created"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"event_ref01","srcdatavar":"event_ref01_data","suffix":"_dt0"},"match":{"id":"event01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"event_ref01","suffix":"_rm0"},"match":{"id":"event01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"event_ref01"}}],"index$":5}]}, 'Event')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const event_ref01_ent = client.Event()
    let event_ref01_data = setup.data.new.event['event_ref01']

    event_ref01_data = (await event_ref01_ent.create(event_ref01_data)).data()
    assert(null != event_ref01_data.id)


    // LIST
    const event_ref01_match: any = {}

    const event_ref01_list = (await event_ref01_ent.list(event_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(event_ref01_list, { id: event_ref01_data.id })))


    // UPDATE
    const event_ref01_data_up0: any = {}
    event_ref01_data_up0.id = event_ref01_data.id

    const event_ref01_markdef_up0 = { name: 'created', value: 'Mark01-event_ref01_' + setup.now }
    ;(event_ref01_data_up0 as any)[event_ref01_markdef_up0.name] = event_ref01_markdef_up0.value

    const event_ref01_resdata_up0 = (await event_ref01_ent.update(event_ref01_data_up0)).data()
    assert(event_ref01_resdata_up0.id === event_ref01_data_up0.id)

    assert((event_ref01_resdata_up0 as any)[event_ref01_markdef_up0.name] === event_ref01_markdef_up0.value)


    // LOAD
    const event_ref01_match_dt0: any = {}
    event_ref01_match_dt0.id = event_ref01_data.id
    const event_ref01_data_dt0 = (await event_ref01_ent.load(event_ref01_match_dt0)).data()
    assert(event_ref01_data_dt0.id === event_ref01_data.id)


    // REMOVE
    const event_ref01_match_rm0: any = { id: event_ref01_data.id }
    await event_ref01_ent.remove(event_ref01_match_rm0)
  

    // LIST
    const event_ref01_match_rt0: any = {}

    const event_ref01_list_rt0 = (await event_ref01_ent.list(event_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(event_ref01_list_rt0, { id: event_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/event/EventTestData.json')

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
    ['event01','event02','event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GCAL_TEST_EVENT_ENTID': idmap,
    'GCAL_TEST_LIVE': 'FALSE',
    'GCAL_TEST_EXPLAIN': 'FALSE',
    'GCAL_APIKEY': '',
  })

  idmap = env['GCAL_TEST_EVENT_ENTID']

  const live = 'TRUE' === env.GCAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GCAL_TEST_EVENT_ENTID']
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
  
