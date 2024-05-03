<template>
    <div class="top-bar">
        <div class="logo">
            <RouterLink to="/">
                <img
                    :src="logoSrc.toString()"
                    alt="logo"
                    height="50"
                    width="50"
                />
            </RouterLink>
        </div>
        <nav class="navigation">
            <div class="left">
                <RouterLink to="/projects">
                    <Button
                        label="Проекты"
                        link
                    />
                </RouterLink>
                <RouterLink to="/about">
                    <Button
                        label="О нас"
                        link
                    />
                </RouterLink>
            </div>
            <div class="right py-2">
                <Divider layout="vertical" />
                <div
                    v-if="user"
                    class="flex align-items-center h-full"
                >
                    <RouterLink to="/projects/edit/base">
                        <Button
                            label="Создать проект"
                            outlined
                            class="mr-4"
                        />
                    </RouterLink>
                    <span class="pi pi-user user-icon"></span>
                </div>
                <div
                    v-else
                    class="flex align-items-center h-full"
                >
                    <Button
                        label="Вход"
                        link
                        @click="onLoginClick"
                    />
                    <Button
                        label="Регистрация"
                        link
                        @click="onRegistrationClick"
                    />
                </div>
            </div>
        </nav>
    </div>
    <RegistrationDialog />
</template>

<script setup lang="ts">
import RegistrationDialog from '@/components/auth/RegistrationDialog.vue';
import Button from '@/components/ui/Button.vue';
import Divider from '@/components/ui/Divider.vue';
import { useLayoutStore } from '@/stores/layout';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const { isVisibleRegistration, isVisibleLogin } = storeToRefs(layoutStore);
const { user } = storeToRefs(authStore);

const logoSrc = new URL('@/assets/svg/logo.svg', import.meta.url);

function onRegistrationClick() {
    isVisibleRegistration.value = true;
}
function onLoginClick() {
    isVisibleLogin.value = true;
}
</script>

<style scoped>
.top-bar {
    display: flex;
    width: 100%;
    padding: 0 1rem;
    height: var(--top-bar-menu-height);
    border-bottom: 1px solid var(--color-border);
    box-shadow: 0 4px 2px -3px var(--color-border);
}
.navigation {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.left,
.right {
    height: 100%;
    display: flex;
    align-items: center;
}
.user-icon {
    font-size: 25px;
}
</style>
