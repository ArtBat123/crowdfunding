<template>
    <div :class="`diviner-${layout}`"></div>
</template>

<script setup lang="ts">
interface Props {
    layout?: 'horizontal' | 'vertical';
}

withDefaults(defineProps<Props>(), {
    layout: 'horizontal',
});
</script>

<style scoped>
.diviner-horizontal {
    width: 100%;
    border-top: 1px solid var(--color-border);
    padding: 8px 0;
}
.diviner-vertical {
    height: 100%;
    border-left: 1px solid var(--color-border);
    padding: 0 8px;
}
</style>
