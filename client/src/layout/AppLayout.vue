<template>
    <TopBar />
    <div>
        <router-view></router-view>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import TopBar from '@/layout/TopBar.vue';
import Footer from './Footer.vue';
</script>
