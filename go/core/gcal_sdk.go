package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/gcal-sdk/go/utility/struct"
)

type GcalSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewGcalSDK(options map[string]any) *GcalSDK {
	sdk := &GcalSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *GcalSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *GcalSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *GcalSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *GcalSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *GcalSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *GcalSDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *GcalSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("GcalSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *GcalSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// Raw GraphQL access: the pressure valve that makes the generated surface's
// deliberate omissions (per-call selection sets, typed filter builders,
// batching, subscriptions) livable — the whole schema stays reachable.
//
// Thin wrapper over the same prepare/fetch path Direct uses, with the one
// thing raw Direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
// as a top-level `errors` array, so status alone would report a failed query
// as ok.
//
// NOTE: like Direct, this bypasses the feature pipeline — no retry,
// ratelimit or paging features apply.
func (sdk *GcalSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("GcalSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Acl returns a Acl entity bound to this client.
// Idiomatic usage: client.Acl(nil).List(nil, nil) or
// client.Acl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Acl(data map[string]any) GcalEntity {
	return NewAclEntityFunc(sdk, data)
}


// Calendar returns a Calendar entity bound to this client.
// Idiomatic usage: client.Calendar(nil).List(nil, nil) or
// client.Calendar(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Calendar(data map[string]any) GcalEntity {
	return NewCalendarEntityFunc(sdk, data)
}


// CalendarList returns a CalendarList entity bound to this client.
// Idiomatic usage: client.CalendarList(nil).List(nil, nil) or
// client.CalendarList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) CalendarList(data map[string]any) GcalEntity {
	return NewCalendarListEntityFunc(sdk, data)
}


// Channel returns a Channel entity bound to this client.
// Idiomatic usage: client.Channel(nil).List(nil, nil) or
// client.Channel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Channel(data map[string]any) GcalEntity {
	return NewChannelEntityFunc(sdk, data)
}


// Color returns a Color entity bound to this client.
// Idiomatic usage: client.Color(nil).List(nil, nil) or
// client.Color(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Color(data map[string]any) GcalEntity {
	return NewColorEntityFunc(sdk, data)
}


// Event returns a Event entity bound to this client.
// Idiomatic usage: client.Event(nil).List(nil, nil) or
// client.Event(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Event(data map[string]any) GcalEntity {
	return NewEventEntityFunc(sdk, data)
}


// FreeBusy returns a FreeBusy entity bound to this client.
// Idiomatic usage: client.FreeBusy(nil).List(nil, nil) or
// client.FreeBusy(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) FreeBusy(data map[string]any) GcalEntity {
	return NewFreeBusyEntityFunc(sdk, data)
}


// Import returns a Import entity bound to this client.
// Idiomatic usage: client.Import(nil).List(nil, nil) or
// client.Import(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Import(data map[string]any) GcalEntity {
	return NewImportEntityFunc(sdk, data)
}


// QuickAdd returns a QuickAdd entity bound to this client.
// Idiomatic usage: client.QuickAdd(nil).List(nil, nil) or
// client.QuickAdd(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) QuickAdd(data map[string]any) GcalEntity {
	return NewQuickAddEntityFunc(sdk, data)
}


// Setting returns a Setting entity bound to this client.
// Idiomatic usage: client.Setting(nil).List(nil, nil) or
// client.Setting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Setting(data map[string]any) GcalEntity {
	return NewSettingEntityFunc(sdk, data)
}


// Stop returns a Stop entity bound to this client.
// Idiomatic usage: client.Stop(nil).List(nil, nil) or
// client.Stop(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Stop(data map[string]any) GcalEntity {
	return NewStopEntityFunc(sdk, data)
}


// Watch returns a Watch entity bound to this client.
// Idiomatic usage: client.Watch(nil).List(nil, nil) or
// client.Watch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GcalSDK) Watch(data map[string]any) GcalEntity {
	return NewWatchEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *GcalSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewGcalSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
