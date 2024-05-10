<template>
    <div class="project-card">
        <div class="project-card-image">
            <img
                :src="imageUrl || '/src/assets/image/project-image.jpg'"
                alt="Image"
                width="100%"
                height="100%"
            />
        </div>
        <div class="project-card-content">
            <div class="project-card-title">{{ title }}</div>
            <div class="project-card-subtitle">{{ subtitle }}</div>
            <div class="funding-progress">
                <div class="flex justify-content-between">
                    <div><span>Собрано:</span> <span class="font-semibold">₽22100</span></div>
                    <div><span class="pi pi-clock text-xs mr-1"></span>15 дней до конца</div>
                </div>
                <ProgressBar :value="50"></ProgressBar>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
    title: string;
    subtitle: string;
    imageUrl: string;
}

const { subtitle, title } = defineProps<Props>();
</script>

<style scoped lang="scss">
.project-card {
    border: 1px solid var(--surface-border);
    border-radius: var(--border-radius);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &-content {
        padding: 16px;
    }
    &-image {
        height: 200px;
    }
    &-title {
        font-size: large;
        font-weight: bold;
    }
    &-subtitle {
        font-size: small;
    }
    &:hover {
        box-shadow:
            0px 1px 10px rgba(0, 0, 0, 0.12),
            0px 4px 5px rgba(0, 0, 0, 0.14),
            0px 2px 4px -1px rgba(0, 0, 0, 0.2);
    }
}
.funding-progress {
    margin: 10px 0;
}
:deep(.p-progressbar) {
    height: 15px;
    .p-progressbar-label {
        line-height: 15px;
        font-size: x-small;
    }
}
</style>
