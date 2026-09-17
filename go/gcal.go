package voxgiggcalsdk

import (
	"github.com/voxgig-sdk/gcal-sdk/go/core"
	"github.com/voxgig-sdk/gcal-sdk/go/entity"
	"github.com/voxgig-sdk/gcal-sdk/go/feature"
	_ "github.com/voxgig-sdk/gcal-sdk/go/utility"
)

// Type aliases preserve external API.
type GcalSDK = core.GcalSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GcalEntity = core.GcalEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GcalError = core.GcalError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAclEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewAclEntity(client, entopts)
	}
	core.NewCalendarEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewCalendarEntity(client, entopts)
	}
	core.NewCalendarListEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewCalendarListEntity(client, entopts)
	}
	core.NewChannelEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewChannelEntity(client, entopts)
	}
	core.NewColorEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewColorEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewFreeBusyEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewFreeBusyEntity(client, entopts)
	}
	core.NewImportEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewImportEntity(client, entopts)
	}
	core.NewQuickAddEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewQuickAddEntity(client, entopts)
	}
	core.NewSettingEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewSettingEntity(client, entopts)
	}
	core.NewStopEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewStopEntity(client, entopts)
	}
	core.NewWatchEntityFunc = func(client *core.GcalSDK, entopts map[string]any) core.GcalEntity {
		return entity.NewWatchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGcalSDK = core.NewGcalSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGcalSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GcalSDK  { return NewGcalSDK(nil) }
func Test() *GcalSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
