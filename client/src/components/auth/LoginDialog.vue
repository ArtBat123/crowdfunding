<template>
    <Dialog
        v-model:visible="isVisibleLogin"
        header="Вход"
        modal
        :style="{ width: '25rem' }"
        @hide="onHide"
    >
        <div>
            <InputText
                v-model="email"
                placeholder="Email"
                type="email"
                class="mb-3 w-full"
            />
            <Password
                v-model="password"
                toggle-mask
                :feedback="false"
                placeholder="Пароль"
                input-class="w-full"
                class="w-full relative"
            >
                <template #hideicon="{ toggleCallback }">
                    <span
                        class="pi pi-eye-slash password-toggle-mask"
                        @click="toggleCallback"
                    >
                    </span>
                </template>
                <template #showicon="{ toggleCallback }">
                    <span
                        class="pi pi-eye password-toggle-mask"
                        @click="toggleCallback"
                    ></span>
                </template>
            </Password>
            <small
                v-if="isLoginError"
                class="text-red-500"
            >
                Неверный логин/пароль
            </small>
            <Button
                label="Войти"
                type="submit"
                class="w-full mt-4"
                @click="onLogin"
            />
        </div>
    </Dialog>
</template>
<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Button from '../ui/Button.vue';
import { useAuthStore } from '@/stores/auth';

const layoutStore = useLayoutStore();
const { login } = useAuthStore();
const { isVisibleLogin, isLoading } = storeToRefs(layoutStore);

const email = ref('');
const password = ref('');
const isLoginError = ref(false);

async function onLogin() {
    isLoading.value = true;
    const response = await login(email.value, password.value);
    isLoading.value = false;

    isLoginError.value = !response;
    if (response) {
        isVisibleLogin.value = false;
    }
}
function onHide() {
    email.value = '';
    password.value = '';
    isLoginError.value = false;
}
</script>
<style lang="scss" scoped>
.password-toggle-mask {
    position: absolute;
    font-size: 18px;
    right: 14px;
    top: calc(50% - 9px);
    color: var(--text-color-secondary);
}
</style>
