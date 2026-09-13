package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/gcal-sdk/go"
	"github.com/voxgig-sdk/gcal-sdk/go/core"

	vs "github.com/voxgig-sdk/gcal-sdk/go/utility/struct"
)

func TestEventEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Event(nil)
		if ent == nil {
			t.Fatal("expected non-nil EventEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"event": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Event(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Event(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := eventBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "event." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GCAL_TEST_EVENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		eventRef01Ent := client.Event(nil)
		eventRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "event"}), "event_ref01"))

		eventRef01DataResult, err := eventRef01Ent.Create(eventRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		eventRef01Data = core.ToMapAny(entityData(eventRef01DataResult))
		if eventRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if eventRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		eventRef01Match := map[string]any{}

		eventRef01ListResult, err := eventRef01Ent.List(eventRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		eventRef01List, eventRef01ListOk := eventRef01ListResult.([]any)
		if !eventRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", eventRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(eventRef01List), map[string]any{"id": eventRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		eventRef01DataUp0Up := map[string]any{
			"id": eventRef01Data["id"],
		}

		eventRef01MarkdefUp0Name := "created"
		eventRef01MarkdefUp0Value := fmt.Sprintf("Mark01-event_ref01_%d", setup.now)
		eventRef01DataUp0Up[eventRef01MarkdefUp0Name] = eventRef01MarkdefUp0Value

		eventRef01ResdataUp0Result, err := eventRef01Ent.Update(eventRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		eventRef01ResdataUp0 := core.ToMapAny(entityData(eventRef01ResdataUp0Result))
		if eventRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if eventRef01ResdataUp0["id"] != eventRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if eventRef01ResdataUp0[eventRef01MarkdefUp0Name] != eventRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", eventRef01MarkdefUp0Name, eventRef01ResdataUp0[eventRef01MarkdefUp0Name])
		}

		// LOAD
		eventRef01MatchDt0 := map[string]any{
			"id": eventRef01Data["id"],
		}
		eventRef01DataDt0Loaded, err := eventRef01Ent.Load(eventRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		eventRef01DataDt0LoadResult := core.ToMapAny(entityData(eventRef01DataDt0Loaded))
		if eventRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if eventRef01DataDt0LoadResult["id"] != eventRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		eventRef01MatchRm0 := map[string]any{
			"id": eventRef01Data["id"],
		}
		_, err = eventRef01Ent.Remove(eventRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		eventRef01MatchRt0 := map[string]any{}

		eventRef01ListRt0Result, err := eventRef01Ent.List(eventRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		eventRef01ListRt0, eventRef01ListRt0Ok := eventRef01ListRt0Result.([]any)
		if !eventRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", eventRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(eventRef01ListRt0), map[string]any{"id": eventRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func eventBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "event", "EventTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read event test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse event test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"event01", "event02", "event03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GCAL_TEST_EVENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GCAL_TEST_EVENT_ENTID": idmap,
		"GCAL_TEST_LIVE":      "FALSE",
		"GCAL_TEST_EXPLAIN":   "FALSE",
		"GCAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GCAL_TEST_EVENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GCAL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["GCAL_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewGcalSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GCAL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GCAL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
