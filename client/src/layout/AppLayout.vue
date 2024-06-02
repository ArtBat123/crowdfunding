<template>
    <div class="flex flex-column h-full">
        <TopBar />
        <div class="flex-grow-1">
            <router-view></router-view>
        </div>
        <Footer />
        <LoadingMask v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import TopBar from '@/layout/TopBar.vue';
import Footer from './Footer.vue';
import LoadingMask from './LoadingMask.vue';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/stores/layout';

const { isLoading } = storeToRefs(useLayoutStore());
</script>
