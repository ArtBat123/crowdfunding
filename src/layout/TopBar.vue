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
                <RouterLink to="/auth">
                    <Button
                        label="Авторизоваться"
                        link
                    />
                </RouterLink>
                <RouterLink to="/auth">
                    <Button
                        label="Зарегистрироваться"
                        link
                    />
                </RouterLink>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import Divider from '@/components/ui/Divider.vue';
import { RouterLink } from 'vue-router';

const logoSrc = new URL('@/assets/svg/logo.svg', import.meta.url);
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
</style>
