# Gcal SDK feature factory

from gcal_sdk.feature.base_feature import GcalBaseFeature
from gcal_sdk.feature.debug_feature import GcalDebugFeature
from gcal_sdk.feature.idempotency_feature import GcalIdempotencyFeature
from gcal_sdk.feature.metrics_feature import GcalMetricsFeature
from gcal_sdk.feature.paging_feature import GcalPagingFeature
from gcal_sdk.feature.ratelimit_feature import GcalRatelimitFeature
from gcal_sdk.feature.retry_feature import GcalRetryFeature
from gcal_sdk.feature.test_feature import GcalTestFeature
from gcal_sdk.feature.timeout_feature import GcalTimeoutFeature


_FEATURES = {
    "base": lambda: GcalBaseFeature(),
    "debug": lambda: GcalDebugFeature(),
    "idempotency": lambda: GcalIdempotencyFeature(),
    "metrics": lambda: GcalMetricsFeature(),
    "paging": lambda: GcalPagingFeature(),
    "ratelimit": lambda: GcalRatelimitFeature(),
    "retry": lambda: GcalRetryFeature(),
    "test": lambda: GcalTestFeature(),
    "timeout": lambda: GcalTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
