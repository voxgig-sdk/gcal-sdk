package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAclEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewCalendarEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewCalendarListEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewChannelEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewColorEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewEventEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewFreeBusyEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewImportEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewQuickAddEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewSettingEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewStopEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

var NewWatchEntityFunc func(client *GcalSDK, entopts map[string]any) GcalEntity

