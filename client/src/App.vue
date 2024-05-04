<template>
    <Suspense>
        <router-view />
        <template #fallback>
            <div class="w-full py-6">
                <Loader class="mx-auto" />
            </div>
        </template>
    </Suspense>
</template>
<script setup lang="ts">
import Loader from './components/ui/Loader.vue';
</script>
