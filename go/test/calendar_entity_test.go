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

func TestCalendarEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Calendar(nil)
		if ent == nil {
			t.Fatal("expected non-nil CalendarEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := calendarBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "calendar." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GCAL_TEST_CALENDAR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		calendarRef01Ent := client.Calendar(nil)
		calendarRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "calendar"}), "calendar_ref01"))

		calendarRef01DataResult, err := calendarRef01Ent.Create(calendarRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		calendarRef01Data = core.ToMapAny(entityData(calendarRef01DataResult))
		if calendarRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if calendarRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		calendarRef01DataUp0Up := map[string]any{
			"id": calendarRef01Data["id"],
		}

		calendarRef01MarkdefUp0Name := "description"
		calendarRef01MarkdefUp0Value := fmt.Sprintf("Mark01-calendar_ref01_%d", setup.now)
		calendarRef01DataUp0Up[calendarRef01MarkdefUp0Name] = calendarRef01MarkdefUp0Value

		calendarRef01ResdataUp0Result, err := calendarRef01Ent.Update(calendarRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		calendarRef01ResdataUp0 := core.ToMapAny(entityData(calendarRef01ResdataUp0Result))
		if calendarRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if calendarRef01ResdataUp0["id"] != calendarRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if calendarRef01ResdataUp0[calendarRef01MarkdefUp0Name] != calendarRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", calendarRef01MarkdefUp0Name, calendarRef01ResdataUp0[calendarRef01MarkdefUp0Name])
		}

		// LOAD
		calendarRef01MatchDt0 := map[string]any{
			"id": calendarRef01Data["id"],
		}
		calendarRef01DataDt0Loaded, err := calendarRef01Ent.Load(calendarRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		calendarRef01DataDt0LoadResult := core.ToMapAny(entityData(calendarRef01DataDt0Loaded))
		if calendarRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if calendarRef01DataDt0LoadResult["id"] != calendarRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		calendarRef01MatchRm0 := map[string]any{
			"id": calendarRef01Data["id"],
		}
		_, err = calendarRef01Ent.Remove(calendarRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func calendarBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "calendar", "CalendarTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read calendar test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse calendar test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"calendar01", "calendar02", "calendar03"},
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
	entidEnvRaw := os.Getenv("GCAL_TEST_CALENDAR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GCAL_TEST_CALENDAR_ENTID": idmap,
		"GCAL_TEST_LIVE":      "FALSE",
		"GCAL_TEST_EXPLAIN":   "FALSE",
		"GCAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GCAL_TEST_CALENDAR_ENTID"])
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
