<template>
    <div
        ref="loadingMask"
        v-focustrap
        tabindex="0"
        class="loading-mask"
        @focusout="catchFocus"
    >
        <ProgressSpinner stroke-width="3" />
    </div>
</template>
<script setup lang="ts">
type Overflow = 'hidden' | 'auto';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const loadingMask = ref<HTMLDivElement>();
const lastFocusedElement = ref<HTMLElement | null>();

function setBodyOverflow(value: Overflow) {
    document.body.style.overflow = value;
}
function catchFocus() {
    loadingMask.value?.focus();
}
onMounted(() => {
    lastFocusedElement.value = document.activeElement as HTMLElement;
    catchFocus();
    setBodyOverflow('hidden');
});
onBeforeUnmount(() => {
    lastFocusedElement.value?.focus();
    setBodyOverflow('auto');
});
</script>
<style scoped>
.loading-mask {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 111111;
    height: 100vh;
    width: 100vw;
    background-color: var(--mask-color);
}
:deep(.p-progress-spinner-circle) {
    stroke: var(--primary-600) !important;
}
</style>
