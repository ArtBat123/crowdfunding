import { ref, shallowRef } from 'vue';

interface Options<T> {
    queryFn: () => Promise<T>;
    setIsLoading?: (newValue: boolean) => void;
}

// TODO
export async function useAsyncData<T>(options: Options<T>) {
    const data = shallowRef<T>();
    const error = ref<ServerError>();
    const isLoading = ref(true);

    const { queryFn, setIsLoading } = options;

    try {
        setIsLoading && setIsLoading?.(true);
        data.value = await queryFn();
    } catch (e: unknown) {
        error.value = e as ServerError;
    } finally {
        isLoading.value = false;
        setIsLoading && setIsLoading(false);
    }

    return { isLoading, error, data };
}
