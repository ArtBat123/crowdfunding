import { expect, test } from 'vitest';
import { useRouteQuerySync } from '.';
import { useTestRoute } from '@/tests-utils';

test('Проверка при пустом route', () => {
    const route = useTestRoute();
    const page = useRouteQuerySync('page', { route });

    expect(page.value).toBe(undefined);
});

test('Проверка при заданном page в route', () => {
    const route = useTestRoute({ query: { page: '5' } });
    const page = useRouteQuerySync('page', { route });

    expect(page.value).toBe('5');
});

test('Проверка обновления route', () => {
    const route = useTestRoute({ query: { page: '5' } });
    const router = { replace: (r: any) => (route = r) };
    const page = useRouteQuerySync('page', { route });

    page.value = '10';
    expect(route.query.page).toBe('10');
});
