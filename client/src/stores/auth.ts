import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        firstName: 'Artem',
        lastName: 'Batrak',
        accountName: 'artbat',
    });

    return { user };
});
