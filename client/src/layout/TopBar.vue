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
            </div>
            <div class="right py-2">
                <Divider layout="vertical" />
                <div
                    v-if="isAuth && userInfo"
                    class="flex align-items-center h-full"
                >
                    <RouterLink to="/start-project-information">
                        <Button
                            label="Создать проект"
                            outlined
                            class="mr-4"
                        />
                    </RouterLink>
                    <RouterLink :to="`/my-projects`">
                        <Button
                            label="Мои проекты"
                            outlined
                            class="mr-4"
                        />
                    </RouterLink>
                    <UserProfilePanel></UserProfilePanel>
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
    <LoginDialog />
</template>

<script setup lang="ts">
import RegistrationDialog from '@/components/auth/RegistrationDialog.vue';
import Divider from '@/components/ui/Divider.vue';
import { useLayoutStore } from '@/stores/layout';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import LoginDialog from '@/components/auth/LoginDialog.vue';
import UserProfilePanel from './UserProfilePanel.vue';

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const { isVisibleRegistrationDialog, isVisibleLoginDialog } = storeToRefs(layoutStore);
const { userInfo, isAuth } = storeToRefs(authStore);

const logoSrc = new URL('@/assets/svg/logo.png', import.meta.url);

function onRegistrationClick() {
    isVisibleRegistrationDialog.value = true;
}
function onLoginClick() {
    isVisibleLoginDialog.value = true;
}
</script>

<style scoped>
.top-bar {
    display: flex;
    width: 100%;
    padding: 0 1rem;
    height: var(--top-bar-menu-height);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 4px 2px -3px var(--border-color);
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
