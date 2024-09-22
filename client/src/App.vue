<template>
    <Suspense>
        <router-view />
        <template #fallback>
            <Loader class="m-auto" />
        </template>
    </Suspense>
</template>
<script setup lang="ts">
import Loader from './components/ui/Loader.vue';
</script>
