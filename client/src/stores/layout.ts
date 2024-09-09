import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
    const isVisibleRegistrationDialog = ref(false);
    const isVisibleLoginDialog = ref(false);
    const isLoading = ref(false);

    return { isVisibleRegistrationDialog, isVisibleLoginDialog, isLoading };
});
