<template>
    <Dialog
        v-model:visible="isVisibleRegistration"
        header="Регистрация"
        :style="{ width: '25rem' }"
    >
        <form>
            <InputText
                v-model="firstName"
                placeholder="Имя"
                autocomplete="given-name"
                class="mb-3 w-full"
            />
            <InputText
                v-model="lastName"
                placeholder="Фамилия"
                autocomplete="family-name"
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
            <Button
                label="Создать аккаунт"
                type="submit"
                class="w-full"
            />
        </form>
        <div class="question-has-account">
            <span>Уже есть аккаунт?</span><strong class="login">Войти</strong>
        </div>
    </Dialog>
</template>
<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Button from '../ui/Button.vue';

const layoutStore = useLayoutStore();
const { isVisibleRegistration } = storeToRefs(layoutStore);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
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
