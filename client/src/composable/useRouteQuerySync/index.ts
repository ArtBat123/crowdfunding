import { ref, watch, type Ref, type UnwrapRef } from 'vue';
import {
    useRoute,
    useRouter,
    type LocationQueryValueRaw,
    type LocationQueryValue,
} from 'vue-router';
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
>(queryName: string, options?: RouteQuerySyncOptionsWithTransformFn<V, R>): Ref<R>;

export function useRouteQuerySync<T extends TransformType>(
    queryName: string,
    options?: RouteQuerySyncOptions<T>
): Ref<ReturnType<(typeof transformations)[T]>>;

export function useRouteQuerySync<
    V extends RouteQueryValue,
    R extends LocationQueryValueRaw | LocationQueryValueRaw[],
    T extends TransformType,
>(
    queryName: string,
    options: RouteQuerySyncOptionsWithTransformFn<V, R> | RouteQuerySyncOptions<T> = {}
): Ref<R | ReturnType<(typeof transformations)[T]>> {
    const {
        mode = 'replace',
        route = useRoute(),
        router = useRouter(),
        transform = 'string',
    } = options;

    const transformFunction =
        typeof transform === 'function' ? transform : transformations[transform];
    const targetQuery = ref(transformFunction(route.query[queryName] as V));

    watch(targetQuery, (newValue, oldValue) => {
        if (newValue?.toString() === oldValue?.toString()) return;

        if (typeof newValue === 'boolean') newValue = newValue ? 'true' : undefined;

        _queryStore[queryName] = newValue;
        const query = { ...route.query, ..._queryStore };
        router[mode]({ query });
    });

    watch(
        () => route.query[queryName],
        (newValue, oldValue) => {
            if (newValue === oldValue) return;
            targetQuery.value = transformFunction(newValue as V) as
                | string
                | number
                | LocationQueryValue[]
                | number[]
                | UnwrapRef<R>;
        }
    );

    return targetQuery as Ref<R | ReturnType<(typeof transformations)[T]>>;
}
