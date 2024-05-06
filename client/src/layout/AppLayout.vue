<template>
    <div class="flex flex-column h-full">
        <TopBar />
        <div class="flex-grow-1">
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import TopBar from '@/layout/TopBar.vue';
import Footer from './Footer.vue';
</script>
