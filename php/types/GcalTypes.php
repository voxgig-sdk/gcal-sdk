<?php
declare(strict_types=1);

// Typed models for the Gcal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Event entity data model. */
class Event
{
    public ?string $created = null;
    public ?string $description = null;
    public ?array $end = null;
    public ?string $htmlLink = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?array $start = null;
    public ?string $status = null;
    public ?string $summary = null;
    public ?string $updated = null;
}

/** Request payload for Event#load. */
class EventLoadMatch
{
    public string $id;
}

/** Request payload for Event#list. */
class EventListMatch
{
    public ?string $order_by = null;
    public ?bool $single_event = null;
}

/** Request payload for Event#create. */
class EventCreateData
{
    public ?string $created = null;
    public ?string $description = null;
    public ?array $end = null;
    public ?string $htmlLink = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?array $start = null;
    public ?string $status = null;
    public ?string $summary = null;
    public ?string $updated = null;
}

/** Request payload for Event#update. */
class EventUpdateData
{
    public string $id;
    public ?string $created = null;
    public ?string $description = null;
    public ?array $end = null;
    public ?string $htmlLink = null;
    public ?string $location = null;
    public ?array $start = null;
    public ?string $status = null;
    public ?string $summary = null;
    public ?string $updated = null;
}

/** Request payload for Event#remove. */
class EventRemoveMatch
{
    public string $id;
}

