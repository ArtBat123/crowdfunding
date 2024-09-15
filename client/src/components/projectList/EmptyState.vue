<template>
    <div class="flex flex-column align-items-center mt-6">
        <img
            :src="imageSrc.toString()"
            alt="empty state"
            style="max-width: 300px; width: 100%"
        />
        <div class="text-2xl text-color-secondary">Нет данных</div>
    </div>
</template>
<script setup lang="ts">
const imageSrc = new URL('@/assets/image/empty-state.png', import.meta.url);
</script>
