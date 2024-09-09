import { ref } from 'vue';

interface Options {
    queryFn: () => Promise<unknown>;
    setIsLoading?: (newValue: boolean) => void;
}

export async function useAsyncData(options: Options) {
    const data = ref<unknown>(null);
    const error = ref<unknown>(null);
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
