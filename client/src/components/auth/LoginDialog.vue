<template>
    <Dialog
        v-model:visible="isVisibleLoginDialog"
        header="Вход"
        modal
        :style="{ width: '25rem' }"
        @hide="clearForm"
        @show="onShow"
    >
        <form>
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
                v-if="errorMessage"
                class="error-text"
            >
                {{ errorMessage }}
            </small>
            <div
                ref="captchaContainerEl"
                class="smart-captcha mt-4"
                :data-sitekey="CAPTCHA_SITE_KEY"
            ></div>

            <Button
                label="Войти"
                type="submit"
                class="w-full mt-4"
                :loading="isLoading"
                :disabled="!successCaptcha || !password || !email"
                @click.prevent="onLogin"
            />
        </form>
    </Dialog>
</template>
<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAsyncData } from '@/composable/useAsyncData';
import { isObject } from '@/helpers/typesHelper';
import { CAPTCHA_SITE_KEY } from '@/consts/env';

const layoutStore = useLayoutStore();
const { login } = useAuthStore();
const { isVisibleLoginDialog } = storeToRefs(layoutStore);

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const captchaContainerEl = ref();
const successCaptcha = ref(false);

function onShow() {
    if (captchaContainerEl.value) {
        window.smartCaptcha.render(captchaContainerEl.value, {
            sitekey: CAPTCHA_SITE_KEY,
            test: true,
            callback: (token) => (successCaptcha.value = !!token),
        });
    }
}
async function onLogin() {
    const { error } = await useAsyncData({
        queryFn: () => login(email.value, password.value),
        setIsLoading: (newValue) => (isLoading.value = newValue),
    });

    if (error.value && isObject(error.value) && 'message' in error.value) {
        errorMessage.value = error.value.message as string;
    } else if (!error.value) {
        clearForm();
        isVisibleLoginDialog.value = false;
    }
}
function clearForm() {
    email.value = '';
    password.value = '';
    errorMessage.value = null;
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
