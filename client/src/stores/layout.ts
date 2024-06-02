import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
    const isVisibleRegistration = ref(false);
    const isVisibleLogin = ref(false);
    const isLoading = ref(false);

    return { isVisibleRegistration, isVisibleLogin, isLoading };
});
