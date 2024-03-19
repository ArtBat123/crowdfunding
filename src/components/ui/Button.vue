<template>
    <PButton
        :link="link"
        :label="label"
    ></PButton>
</template>

<script setup lang="ts">
interface Props {
    link?: boolean;
    label?: string;
}

defineProps<Props>();
</script>
