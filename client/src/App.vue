<template>
    <Suspense>
        <router-view />
        <template #fallback>
            <Loader class="m-auto" />
        </template>
    </Suspense>
    <Toast
        :pt="{
            text: { class: 'flex flex-column' },
            summary: { class: 'line-height-1' },
        }"
    />
</template>
<script setup lang="ts">
import Loader from './components/ui/Loader.vue';
</script>
