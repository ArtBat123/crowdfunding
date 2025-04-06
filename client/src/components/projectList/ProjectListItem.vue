<template>
    <div class="project-card">
        <div class="project-card-image">
            <img
                :src="project.imageUrl || '/src/assets/image/project-image.jpg'"
                alt="Image"
                width="100%"
                height="100%"
            />
        </div>
        <div class="project-card-content">
            <div class="project-card-title">{{ project.title }}</div>
            <div class="project-card-subtitle">{{ project.subtitle }}</div>
            <div class="funding-progress">
                <div class="flex justify-content-between mb-2">
                    <div>
                        <span>Собрано: </span>
                        <span class="font-semibold"> {{ fundsRaised }} USDT </span>
                        <small class="text-gray-500">
                            ≈ {{ ethToRubles(Number(fundsRaised)) }}₽
                        </small>
                    </div>
                    <div>
                        <span class="pi pi-clock text-xs mr-1"></span>
                        <span>{{ deadlineDayCount }} дней до конца</span>
                    </div>
                </div>
                <ProgressBar :value="progressBarValue"></ProgressBar>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DateUtils from '@/helpers/DateUtils';
import { useBlockchainStore } from '@/stores/blockchain';
import { computed } from 'vue';

interface Props {
    project: Project;
}

const props = defineProps<Props>();
const { ethToRubles } = useBlockchainStore();

const deadlineDayCount = computed(() =>
    DateUtils.dateDiffInDays(new Date(), new Date(props.project.deadline))
);
const fundsRaised = computed(() => Number(props.project.fundsRaised) / 10 ** 6);
const progressBarValue = computed(() => {
    const percents = (Number(fundsRaised.value) / props.project.fundingGoal) * 100;
    return Math.round(percents);
});
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
        flex-grow: 1;
        display: flex;
        flex-direction: column;
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
    margin: auto 0 10px 0;
}
:deep(.p-progressbar) {
    height: 15px;
    .p-progressbar-label {
        line-height: 15px;
        font-size: x-small;
    }
}
</style>
