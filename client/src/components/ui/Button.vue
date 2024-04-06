<template>
    <Button
        :link="link"
        :label="label"
        :outlined="outlined"
    ></Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

interface Props {
    link?: boolean;
    label?: string;
    outlined?: boolean;
}

defineProps<Props>();
</script>
