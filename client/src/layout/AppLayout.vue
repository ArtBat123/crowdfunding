<template>
    <top-bar></top-bar>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import TopBar from '@/layout/TopBar.vue';
</script>
