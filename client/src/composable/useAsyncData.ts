import { ref, shallowRef } from 'vue';

interface Options<T> {
    queryFn: () => Promise<T>;
    setIsLoading?: (newValue: boolean) => void;
}

export async function useAsyncData<T>(options: Options<T>) {
    const data = shallowRef<T>();
    const error = ref<unknown>();
    const isLoading = ref(true);

    const { queryFn, setIsLoading } = options;

    try {
        setIsLoading && setIsLoading?.(true);
        data.value = await queryFn();
    } catch (e: unknown) {
        error.value = e;
    } finally {
        isLoading.value = false;
        setIsLoading && setIsLoading(false);
    }

    return { isLoading, error, data };
}
