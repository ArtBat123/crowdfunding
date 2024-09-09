import api from '@/api/api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface UserInfo {
    userId: number;
    nickname: string;
}

export const useAuthStore = defineStore('auth', () => {
    const userInfo = ref<UserInfo | null>();
    const accessToken = ref<string | null>();

    const isAuth = computed(() => !!accessToken.value);

    async function login(email: string, password: string) {
        const { accessToken: _accessToken, user } = await api.auth.login({ email, password });
        accessToken.value = _accessToken;
        userInfo.value = user;
    }
    async function registration(email: string, password: string, nickname: string) {
        const { accessToken: _accessToken, user } = await api.auth.registration({
            email,
            password,
            nickname,
        });

        accessToken.value = _accessToken;
        userInfo.value = user;
    }
    async function logout() {
        await api.auth.logout();
        accessToken.value = null;
        userInfo.value = null;
    }

    async function refreshTokens() {
        const response = await api.auth.refreshTokens();
        accessToken.value = response.accessToken;
        userInfo.value = response.user;
    }

    return { userInfo, accessToken, isAuth, login, registration, logout, refreshTokens };
});
