<?php
declare(strict_types=1);

// Setting entity test

require_once __DIR__ . '/../gcal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SettingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GcalSDK::test(null, null);
        $ent = $testsdk->Setting(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "setting" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = GcalSDK::test($seed, null);
        $seen = iterator_to_array($base->Setting(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = GcalConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = GcalSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Setting(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = setting_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "setting." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GCAL_TEST_SETTING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $setting_ref01_ent = $client->Setting(null);
        $setting_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.setting"), "setting_ref01"));

        $setting_ref01_data_result = $setting_ref01_ent->create($setting_ref01_data, null);
        $setting_ref01_data = Helpers::to_map(is_object($setting_ref01_data_result) && method_exists($setting_ref01_data_result, 'data_get') ? $setting_ref01_data_result->data_get() : $setting_ref01_data_result);
        $this->assertNotNull($setting_ref01_data);
        $this->assertNotNull($setting_ref01_data["id"]);

        // LIST
        $setting_ref01_match = [];

        $setting_ref01_list_result = $setting_ref01_ent->list($setting_ref01_match, null);
        $this->assertIsArray($setting_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($setting_ref01_list_result),
            ["id" => $setting_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $setting_ref01_match_dt0 = [
            "id" => $setting_ref01_data["id"],
        ];
        $setting_ref01_data_dt0_loaded = $setting_ref01_ent->load($setting_ref01_match_dt0, null);
        $setting_ref01_data_dt0_load_result = Helpers::to_map(is_object($setting_ref01_data_dt0_loaded) && method_exists($setting_ref01_data_dt0_loaded, 'data_get') ? $setting_ref01_data_dt0_loaded->data_get() : $setting_ref01_data_dt0_loaded);
        $this->assertNotNull($setting_ref01_data_dt0_load_result);
        $this->assertEquals($setting_ref01_data_dt0_load_result["id"], $setting_ref01_data["id"]);

    }
}

function setting_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/setting/SettingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GcalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["setting01", "setting02", "setting03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GCAL_TEST_SETTING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GCAL_TEST_SETTING_ENTID" => $idmap,
        "GCAL_TEST_LIVE" => "FALSE",
        "GCAL_TEST_EXPLAIN" => "FALSE",
        "GCAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GCAL_TEST_SETTING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GCAL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["GCAL_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new GcalSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["GCAL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GCAL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
