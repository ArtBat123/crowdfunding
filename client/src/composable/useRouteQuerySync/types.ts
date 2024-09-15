import type { LocationQueryValue, LocationQueryValueRaw, useRoute, useRouter } from 'vue-router';

export type RouteQuerySyncMode = 'replace' | 'push';
export type TransformType = 'string' | 'number' | 'string[]' | 'number[]' | 'boolean';
export type RouteQueryValue = LocationQueryValue | LocationQueryValue[] | undefined;

export interface RouteQuerySyncOptions<T extends TransformType = 'string'> {
    mode?: RouteQuerySyncMode;
    route?: ReturnType<typeof useRoute>;
    router?: ReturnType<typeof useRouter>;
    transform?: T;
}

export interface RouteQuerySyncOptionsWithTransformFn<
    V = RouteQueryValue,
    R = LocationQueryValueRaw | LocationQueryValueRaw[],
> {
    mode?: RouteQuerySyncMode;
    route?: ReturnType<typeof useRoute>;
    router?: ReturnType<typeof useRouter>;
    transform?: (value: V | undefined) => R;
}
