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

func TestAclEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Acl(nil)
		if ent == nil {
			t.Fatal("expected non-nil AclEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"acl": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Acl(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Acl(nil).Stream("list", nil, nil) {
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
		setup := aclBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "acl." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GCAL_TEST_ACL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		aclRef01Ent := client.Acl(nil)
		aclRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "acl"}), "acl_ref01"))
		aclRef01Data["calendar_id"] = setup.idmap["calendar01"]

		aclRef01DataResult, err := aclRef01Ent.Create(aclRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		aclRef01Data = core.ToMapAny(entityData(aclRef01DataResult))
		if aclRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if aclRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		aclRef01Match := map[string]any{
			"calendar_id": setup.idmap["calendar01"],
		}

		aclRef01ListResult, err := aclRef01Ent.List(aclRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		aclRef01List, aclRef01ListOk := aclRef01ListResult.([]any)
		if !aclRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", aclRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(aclRef01List), map[string]any{"id": aclRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		aclRef01DataUp0Up := map[string]any{
			"id": aclRef01Data["id"],
			"calendar_id": setup.idmap["calendar_id"],
		}

		aclRef01MarkdefUp0Name := "etag"
		aclRef01MarkdefUp0Value := fmt.Sprintf("Mark01-acl_ref01_%d", setup.now)
		aclRef01DataUp0Up[aclRef01MarkdefUp0Name] = aclRef01MarkdefUp0Value

		aclRef01ResdataUp0Result, err := aclRef01Ent.Update(aclRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		aclRef01ResdataUp0 := core.ToMapAny(entityData(aclRef01ResdataUp0Result))
		if aclRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if aclRef01ResdataUp0["id"] != aclRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if aclRef01ResdataUp0[aclRef01MarkdefUp0Name] != aclRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", aclRef01MarkdefUp0Name, aclRef01ResdataUp0[aclRef01MarkdefUp0Name])
		}

		// LOAD
		aclRef01MatchDt0 := map[string]any{
			"id": aclRef01Data["id"],
		}
		aclRef01DataDt0Loaded, err := aclRef01Ent.Load(aclRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		aclRef01DataDt0LoadResult := core.ToMapAny(entityData(aclRef01DataDt0Loaded))
		if aclRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if aclRef01DataDt0LoadResult["id"] != aclRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		aclRef01MatchRm0 := map[string]any{
			"id": aclRef01Data["id"],
		}
		_, err = aclRef01Ent.Remove(aclRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		aclRef01MatchRt0 := map[string]any{
			"calendar_id": setup.idmap["calendar01"],
		}

		aclRef01ListRt0Result, err := aclRef01Ent.List(aclRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		aclRef01ListRt0, aclRef01ListRt0Ok := aclRef01ListRt0Result.([]any)
		if !aclRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", aclRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(aclRef01ListRt0), map[string]any{"id": aclRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func aclBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "acl", "AclTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read acl test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse acl test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"acl01", "acl02", "acl03", "calendar01", "calendar02", "calendar03"},
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
	entidEnvRaw := os.Getenv("GCAL_TEST_ACL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GCAL_TEST_ACL_ENTID": idmap,
		"GCAL_TEST_LIVE":      "FALSE",
		"GCAL_TEST_EXPLAIN":   "FALSE",
		"GCAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GCAL_TEST_ACL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add calendar_id alias for update test.
	if idmapResolved["calendar_id"] == nil {
		idmapResolved["calendar_id"] = idmapResolved["calendar01"]
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
