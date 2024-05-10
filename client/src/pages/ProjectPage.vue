<template>
    <div class="content-container relative">
        <div class="main-info">
            <div class="left-panel">
                <img
                    :src="currentProject?.imageUrl"
                    alt="image"
                    height="100%"
                    width="100%"
                />
            </div>
            <div class="right-panel">
                <h1 class="title">{{ currentProject?.title }}</h1>
                <h2 class="subtitle">{{ currentProject?.subtitle }}</h2>
                <ProgressBar :value="50" />
                <div class="flex justify-content-between align-items-center mt-3">
                    <div class="invested-count">1111 ₽</div>
                    <div class="backers-count">1111 вкладчиков</div>
                </div>
                <div class="funding-goal">
                    Финансовая цель: {{ currencyFormat(currentProject?.fundingGoal) }} ₽
                </div>
                <div class="deadline">
                    <span>Осталось {{ currentProject?.deadline }} дней</span>
                    <span>Дата создания: {{ dateFormat(currentProject?.createdDate) }}</span>
                </div>
                <div class="flex justify-content-between align-items-center mt-3">
                    <Button label="Поддержать проект" />
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
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import { Suspense, computed } from 'vue';
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
const { currencyFormat, dateFormat } = useFormatter();
const route = useRoute();

const tabs = [
    { label: 'О проекте', routeName: 'viewProjectStory' },
    { label: 'Вознаграждения', routeName: 'viewProjectRewards' },
    { label: 'Обновления', routeName: 'viewProjectUpdates' },
    { label: 'Комментарии', routeName: 'viewProjectComments' },
];

const activeTabIndex = computed(() => {
    return tabs.findIndex((item) => item.routeName === route.name);
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
    height: 450px;
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
    &:hover {
        color: var(--primary-500);
    }
}
.active-tab {
    color: var(--primary-500);
    background-color: var(--primary-50);
}
</style>
