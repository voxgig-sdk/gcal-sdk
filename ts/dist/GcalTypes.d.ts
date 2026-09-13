export interface Event {
    created?: string;
    description?: string;
    end?: Record<string, any>;
    htmlLink?: string;
    id?: string;
    location?: string;
    start?: Record<string, any>;
    status?: string;
    summary?: string;
    updated?: string;
}
export interface EventLoadMatch {
    id: string;
}
export interface EventListMatch {
    order_by?: string;
    single_event?: boolean;
}
export interface EventCreateData {
    created?: string;
    description?: string;
    end?: Record<string, any>;
    htmlLink?: string;
    id?: string;
    location?: string;
    start?: Record<string, any>;
    status?: string;
    summary?: string;
    updated?: string;
}
export interface EventUpdateData {
    id: string;
    created?: string;
    description?: string;
    end?: Record<string, any>;
    htmlLink?: string;
    location?: string;
    start?: Record<string, any>;
    status?: string;
    summary?: string;
    updated?: string;
}
export interface EventRemoveMatch {
    id: string;
}
