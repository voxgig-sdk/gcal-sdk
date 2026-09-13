

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


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
      if (maybeSkipControl(t, 'entityOp', 'event.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set GCAL_TEST_EVENT_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['GCAL_TEST_EVENT_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'GCAL_TEST_EVENT_ENTID': idmap,
    'GCAL_TEST_LIVE': 'FALSE',
    'GCAL_TEST_EXPLAIN': 'FALSE',
    'GCAL_APIKEY': '',
  })

  idmap = env['GCAL_TEST_EVENT_ENTID']

  const live = 'TRUE' === env.GCAL_TEST_LIVE

  if (live) {
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
      extra || {}
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
