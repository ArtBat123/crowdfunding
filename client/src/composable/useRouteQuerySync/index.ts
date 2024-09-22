import { computed, type WritableComputedRef } from 'vue';
import { useRoute, useRouter, type LocationQueryValueRaw } from 'vue-router';
import type {
    RouteQuerySyncOptions,
    RouteQuerySyncOptionsWithTransformFn,
    RouteQueryValue,
    TransformType,
} from './types';

const _queryStore: Record<string, LocationQueryValueRaw | LocationQueryValueRaw[]> = {};
const transformations = {
    string: (queryValue: RouteQueryValue) => (queryValue ? String(queryValue) : undefined),
    number: (queryValue: RouteQueryValue) => (queryValue ? Number(queryValue) : undefined),
    boolean: (queryValue: RouteQueryValue) => (queryValue === 'true' ? true : false),
    'number[]': (queryValue: RouteQueryValue) => {
        if (Array.isArray(queryValue)) return queryValue.map((item) => Number(item));
        return queryValue ? [Number(queryValue)] : [];
    },
    'string[]': (queryValue: RouteQueryValue) => {
        if (Array.isArray(queryValue)) return queryValue.map((item) => item);
        return queryValue ? [queryValue] : [];
    },
};

export function useRouteQuerySync<
    V extends RouteQueryValue,
    R extends LocationQueryValueRaw | LocationQueryValueRaw[],
>(queryName: string, options?: RouteQuerySyncOptionsWithTransformFn<V, R>): WritableComputedRef<R>;

export function useRouteQuerySync<T extends TransformType>(
    queryName: string,
    options?: RouteQuerySyncOptions<T>
): WritableComputedRef<ReturnType<(typeof transformations)[T]>>;

export function useRouteQuerySync<
    V extends RouteQueryValue,
    R extends LocationQueryValueRaw | LocationQueryValueRaw[],
    T extends TransformType,
>(
    queryName: string,
    options: RouteQuerySyncOptionsWithTransformFn<V, R> | RouteQuerySyncOptions<T> = {}
) {
    const {
        mode = 'push',
        route = useRoute(),
        router = useRouter(),
        transform = 'string',
    } = options;

    const transformFunction =
        typeof transform === 'function' ? transform : transformations[transform];

    const targetValue = computed({
        get() {
            return transformFunction(route.query[queryName] as V);
        },
        async set(newValue) {
            if (typeof newValue === 'boolean') newValue = newValue ? 'true' : undefined;

            _queryStore[queryName] = newValue;
            const query = { ...route.query, ..._queryStore };
            await router[mode]({ query });
        },
    });

    return targetValue;
}
