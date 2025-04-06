<template>
    <div class="content-container relative">
        <div class="main-info">
            <div class="left-panel">
                <img
                    :src="currentProject?.imageUrl"
                    alt="image"
                    height="100%"
                    width="100%"
                    style="object-fit: contain"
                />
            </div>
            <div class="right-panel">
                <h1 class="title">{{ currentProject?.title }}</h1>
                <h2 class="subtitle">{{ currentProject?.subtitle }}</h2>
                <ProgressBar :value="progressBarValue" />
                <div class="flex justify-content-between align-items-center mt-3">
                    <div class="flex align-items-center">
                        <div class="invested-count">{{ fundsRaised }} USD</div>
                        <span class="text-gray-500 ml-2">
                            ≈{{ ethToRubles(Number(fundsRaised)) }}₽
                        </span>
                    </div>
                    <div class="backers-count">
                        {{ currentProject?.countContributions }} вкладчиков
                    </div>
                </div>
                <div class="funding-goal">
                    Финансовая цель: {{ currencyFormat(currentProject?.fundingGoal) }} USDT
                </div>
                <div class="deadline">
                    <span>Осталось {{ deadlineDayCount }} дней</span>
                    <span>Дата создания: {{ dateFormat(currentProject?.createdDate) }}</span>
                </div>
                <div class="flex justify-content-between align-items-center mt-3">
                    <RouterLink :to="{ name: 'rewardSelecting', params: { id: route.params.id } }">
                        <Button label="Поддержать проект" />
                    </RouterLink>
                    <Button
                        label="Следить"
                        icon="pi pi-bookmark"
                        icon-class="mr-2"
                        severity="secondary"
                        outlined
                    />
                </div>
            </div>
        </div>
        <TabMenu
            :model="tabs"
            :active-index="activeTabIndex"
            class="mb-4 sticky top-0"
        >
            <template #item="{ item, active }">
                <RouterLink :to="{ name: item.routeName }">
                    <div :class="['tab-menu-item', { 'active-tab': active }]">
                        {{ item.label }}
                    </div>
                </RouterLink>
            </template>
        </TabMenu>
        <Suspense>
            <RouterView />
            <template #fallback>
                <Loader class="mx-auto my-8" />
            </template>
        </Suspense>
    </div>
</template>
<script lang="ts">
import Loader from '@/components/ui/Loader.vue';
import { useFormatter } from '@/composable/formatter';
import { useBlockchainStore } from '@/stores/blockchain';
import { useProjectStore } from '@/stores/project';
import { ethers } from 'ethers';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    async beforeRouteEnter(to) {
        const projectId = Number(to.params.id);
        const projectStore = useProjectStore();
        await projectStore.loadProject(projectId);
        if (!projectStore.currentProject) return { name: 'notFound' };
    },
};
</script>
<script setup lang="ts">
const projectStore = useProjectStore();
const { currentProject } = storeToRefs(projectStore);
const { ethToRubles, loadUsdtExchangeRate } = useBlockchainStore();
const { currencyFormat, dateFormat } = useFormatter();
const route = useRoute();
await loadUsdtExchangeRate();
const tabs = [
    { label: 'О проекте', routeName: 'viewProjectStory' },
    { label: 'Вознаграждения', routeName: 'viewProjectRewards' },
    { label: 'Обновления', routeName: 'viewProjectUpdates' },
    { label: 'Комментарии', routeName: 'viewProjectComments' },
];

const activeTabIndex = computed(() => {
    return tabs.findIndex((item) => item.routeName === route.name);
});
const fundsRaised = computed(() => {
    return currentProject.value ? Number(currentProject.value.fundsRaised) / 10 ** 6 : null;
});
const deadlineDayCount = computed(() => {
    if (!currentProject.value) return null;
    const deadlineDate = new Date(currentProject.value.deadline);
    const result = (Number(deadlineDate) - Date.now()) / 1000 / 60 / 60 / 24;
    return Math.floor(result);
});
const progressBarValue = computed(() => {
    if (!currentProject.value) return 0;
    const percents = (Number(fundsRaised.value) / currentProject.value?.fundingGoal) * 100;
    return Math.round(percents);
});
</script>

<style scoped lang="scss">
.title {
    font-size: 38px;
    line-height: 100%;
    margin-bottom: 6px;
}
.subtitle {
    font-size: 25px;
    font-weight: normal;
    line-height: 100%;
    margin-bottom: 20px;
}
.main-info {
    margin: 60px 0;
    display: flex;
}
.left-panel {
    width: 60%;
}
.right-panel {
    width: 40%;
    margin-left: 40px;
}
.invested-count {
    font-size: 30px;
    font-weight: bold;
    color: var(--primary-500);
    line-height: 100%;
}
.backers-count {
    line-height: 100%;
    font-size: 25px;
    color: var(--gray-500);
}
.funding-goal {
    color: var(--gray-600);
    font-size: 16px;
    margin-top: 15px;
}
.deadline {
    display: flex;
    justify-content: space-between;
    color: var(--gray-600);
}
.tab-menu-item {
    padding: 12px 16px;
    height: 42px;
    &:hover {
        color: var(--primary-500);
    }
}
.active-tab {
    color: var(--primary-500);
    background-color: var(--primary-50);
}
</style>
