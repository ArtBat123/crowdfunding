<template>
    <Dialog
        v-model:visible="isVisibleRegistrationDialog"
        header="Регистрация"
        modal
        :style="{ width: '25rem' }"
        @hide="clearForm"
    >
        <form>
            <InputText
                v-model="nickname"
                placeholder="Никнейм"
                autocomplete="nickname"
                class="mb-3 w-full"
            />
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
                class="mb-3 w-full relative"
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
                class="text-red-500"
            >
                {{ errorMessage }}
            </small>
            <Button
                label="Создать аккаунт"
                type="submit"
                class="w-full mt-4"
                :loading="isLoading"
                @click.prevent="onRegistration"
            />
        </form>
        <div class="question-has-account">
            <span>Уже есть аккаунт?</span>
            <strong
                class="login"
                @click="openLoginDialog"
            >
                Войти
            </strong>
        </div>
    </Dialog>
</template>
<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAsyncData } from '@/composable/useAsyncData';
import { isObject } from '@/helpers/typesHelper';

const { registration } = useAuthStore();
const layoutStore = useLayoutStore();
const { isVisibleRegistrationDialog, isVisibleLoginDialog } = storeToRefs(layoutStore);

const nickname = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref<string | null>(null);
const isLoading = ref(false);

async function onRegistration() {
    const { error } = await useAsyncData({
        queryFn: () => registration(email.value, password.value, nickname.value),
        setIsLoading: (newValue) => (isLoading.value = newValue),
    });

    if (error.value && isObject(error.value) && 'message' in error.value) {
        errorMessage.value = error.value.message as string;
    } else if (!error.value) {
        clearForm();
        isVisibleRegistrationDialog.value = false;
    }
}
function openLoginDialog() {
    isVisibleRegistrationDialog.value = false;
    isVisibleLoginDialog.value = true;
}
function clearForm() {
    nickname.value = '';
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
.question-has-account {
    font-size: small;
    text-align: center;
    margin-top: 8px;
    .login {
        color: var(--primary-color);
        margin-left: 4px;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
