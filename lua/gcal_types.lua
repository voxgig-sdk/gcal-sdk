-- Typed models for the Gcal SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Event
---@field created? string
---@field description? string
---@field end? table
---@field htmlLink? string
---@field id? string
---@field location? string
---@field start? table
---@field status? string
---@field summary? string
---@field updated? string

---@class EventLoadMatch
---@field id string

---@class EventListMatch
---@field order_by? string
---@field single_event? boolean

---@class EventCreateData
---@field created? string
---@field description? string
---@field end? table
---@field htmlLink? string
---@field id? string
---@field location? string
---@field start? table
---@field status? string
---@field summary? string
---@field updated? string

---@class EventUpdateData
---@field id string
---@field created? string
---@field description? string
---@field end? table
---@field htmlLink? string
---@field location? string
---@field start? table
---@field status? string
---@field summary? string
---@field updated? string

---@class EventRemoveMatch
---@field id string

local M = {}

return M
