import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface UserInfo {
    userId: number;
    nickname: string;
}

export const useAuthStore = defineStore('auth', () => {
    const userInfo = ref<UserInfo>();

    async function login(email: string, password: string) {
        try {
            const { token, ..._userInfo } = await api.auth.login({ email, password });
            userInfo.value = _userInfo;
            return true;
        } catch (e) {
            return false;
        }
    }
    async function registration(email: string, password: string, nickname: string) {
        try {
            const { token, ..._userInfo } = await api.auth.registration({
                email,
                password,
                nickname,
            });

            userInfo.value = _userInfo;
            return true;
        } catch (e) {
            return false;
        }
    }

    return { userInfo, login, registration };
});
