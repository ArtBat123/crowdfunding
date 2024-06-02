<template>
    <div class="flex align-items-start">
        <nav class="left-panel">
            <h3 class="text-gray-700 mb-3">Доступные вознаграждения</h3>
            <ul>
                <li
                    v-for="reward in rewardList"
                    :key="reward.id"
                    :class="['left-panel-reward', { active: navActiveId === reward.id }]"
                >
                    <a :href="'#' + reward.id">
                        <div class="line-height-1 font-bold text-gray-700 mb-1">
                            {{ reward.name }}
                        </div>
                        <div class="reward-price">{{ currencyFormat(reward.price) }} ETH</div>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="right-panel">
            <RewardCard
                v-for="reward in rewardList"
                :key="reward.id"
                :reward="reward"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useFormatter } from '@/composable/formatter';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import RewardCard from './RewardCard.vue';

const projectStore = useProjectStore();
const { currencyFormat } = useFormatter();
const route = useRoute();
const { rewardList } = storeToRefs(projectStore);
const navActiveId = ref<number>();

await projectStore.loadProjectRewards(Number(route.params.id));

const observer = new IntersectionObserver(
    (entries) => {
        const visibleElements = entries.filter((el) => el.isIntersecting);
        if (visibleElements.length) {
            const id = visibleElements[visibleElements.length - 1].target.id;
            navActiveId.value = Number(id);
        }
    },
    { threshold: 1 }
);
onMounted(() => {
    const elements = document.querySelectorAll('.reward-card');
    elements.forEach((el) => observer.observe(el));
});
onUnmounted(() => observer.disconnect());
</script>

<style scoped lang="scss">
.left-panel {
    min-width: 300px;
    position: sticky;
    top: 75px;
    &-reward {
        margin-bottom: 16px;
        padding-left: 8px;
        border-left: 3px solid transparent;
        cursor: pointer;
    }
}
.left-panel-reward.active {
    border-left-color: var(--primary-500) !important;
}
.right-panel {
    width: 100%;
    margin-left: 30px;
    scroll-behavior: smooth;
}
.reward-name {
    font-weight: bold;
    font-size: 20px;
    line-height: 100%;
    color: var(--gray-700);
}
</style>
