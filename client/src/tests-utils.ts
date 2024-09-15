import type { RouteLocationNormalizedLoaded } from 'vue-router';

export function useTestRoute(
    init: Partial<RouteLocationNormalizedLoaded> = {}
): RouteLocationNormalizedLoaded {
    const {
        query = {},
        fullPath = '',
        hash = '',
        matched = [],
        meta = {},
        name = '',
        params = {},
        path = '',
        redirectedFrom = undefined,
    } = init;
    return {
        query,
        fullPath,
        hash,
        matched,
        meta,
        name,
        params,
        path,
        redirectedFrom,
    };
}
