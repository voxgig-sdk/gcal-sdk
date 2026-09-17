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

func TestCalendarListEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CalendarList(nil)
		if ent == nil {
			t.Fatal("expected non-nil CalendarListEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"calendar_list": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.CalendarList(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.CalendarList(nil).Stream("list", nil, nil) {
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
		setup := calendar_listBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "calendar_list." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GCAL_TEST_CALENDAR_LIST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		calendarListRef01Ent := client.CalendarList(nil)
		calendarListRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "calendar_list"}), "calendar_list_ref01"))

		calendarListRef01DataResult, err := calendarListRef01Ent.Create(calendarListRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		calendarListRef01Data = core.ToMapAny(entityData(calendarListRef01DataResult))
		if calendarListRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if calendarListRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		calendarListRef01Match := map[string]any{}

		calendarListRef01ListResult, err := calendarListRef01Ent.List(calendarListRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		calendarListRef01List, calendarListRef01ListOk := calendarListRef01ListResult.([]any)
		if !calendarListRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", calendarListRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(calendarListRef01List), map[string]any{"id": calendarListRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		calendarListRef01DataUp0Up := map[string]any{
			"id": calendarListRef01Data["id"],
		}

		calendarListRef01MarkdefUp0Name := "accessRole"
		calendarListRef01MarkdefUp0Value := fmt.Sprintf("Mark01-calendar_list_ref01_%d", setup.now)
		calendarListRef01DataUp0Up[calendarListRef01MarkdefUp0Name] = calendarListRef01MarkdefUp0Value

		calendarListRef01ResdataUp0Result, err := calendarListRef01Ent.Update(calendarListRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		calendarListRef01ResdataUp0 := core.ToMapAny(entityData(calendarListRef01ResdataUp0Result))
		if calendarListRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if calendarListRef01ResdataUp0["id"] != calendarListRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if calendarListRef01ResdataUp0[calendarListRef01MarkdefUp0Name] != calendarListRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", calendarListRef01MarkdefUp0Name, calendarListRef01ResdataUp0[calendarListRef01MarkdefUp0Name])
		}

		// LOAD
		calendarListRef01MatchDt0 := map[string]any{
			"id": calendarListRef01Data["id"],
		}
		calendarListRef01DataDt0Loaded, err := calendarListRef01Ent.Load(calendarListRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		calendarListRef01DataDt0LoadResult := core.ToMapAny(entityData(calendarListRef01DataDt0Loaded))
		if calendarListRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if calendarListRef01DataDt0LoadResult["id"] != calendarListRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		calendarListRef01MatchRm0 := map[string]any{
			"id": calendarListRef01Data["id"],
		}
		_, err = calendarListRef01Ent.Remove(calendarListRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		calendarListRef01MatchRt0 := map[string]any{}

		calendarListRef01ListRt0Result, err := calendarListRef01Ent.List(calendarListRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		calendarListRef01ListRt0, calendarListRef01ListRt0Ok := calendarListRef01ListRt0Result.([]any)
		if !calendarListRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", calendarListRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(calendarListRef01ListRt0), map[string]any{"id": calendarListRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func calendar_listBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "calendar_list", "CalendarListTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read calendar_list test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse calendar_list test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"calendar_list01", "calendar_list02", "calendar_list03"},
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
	entidEnvRaw := os.Getenv("GCAL_TEST_CALENDAR_LIST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GCAL_TEST_CALENDAR_LIST_ENTID": idmap,
		"GCAL_TEST_LIVE":      "FALSE",
		"GCAL_TEST_EXPLAIN":   "FALSE",
		"GCAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GCAL_TEST_CALENDAR_LIST_ENTID"])
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
