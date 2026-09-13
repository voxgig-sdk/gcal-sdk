# Typed models for the Gcal SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Event(TypedDict, total=False):
    created: str
    description: str
    end: dict
    htmlLink: str
    id: str
    location: str
    start: dict
    status: str
    summary: str
    updated: str


class EventLoadMatch(TypedDict):
    id: str


class EventListMatch(TypedDict, total=False):
    order_by: str
    single_event: bool


class EventCreateData(TypedDict, total=False):
    created: str
    description: str
    end: dict
    htmlLink: str
    id: str
    location: str
    start: dict
    status: str
    summary: str
    updated: str


class EventUpdateDataRequired(TypedDict):
    id: str


class EventUpdateData(EventUpdateDataRequired, total=False):
    created: str
    description: str
    end: dict
    htmlLink: str
    location: str
    start: dict
    status: str
    summary: str
    updated: str


class EventRemoveMatch(TypedDict):
    id: str
