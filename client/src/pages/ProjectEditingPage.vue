<template>
    <TabMenu
        :active-index="activeTabIndex"
        :model="tabItems"
        @tab-change="onTabChange"
    />
    <RouterView />
</template>
<script setup lang="ts">
import { EditableProject } from '@/models/EditableProject';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import type { TabMenuChangeEvent } from 'primevue/tabmenu';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const tabItems = [
    { label: 'Основное', icon: 'pi pi-pen-to-square', routeName: 'projectBaseInfoEditing' },
    { label: 'Награды', icon: 'pi pi-gift', routeName: 'projectRewards' },
    { label: 'О проекте', icon: 'pi pi-book', routeName: 'aboutProject' },
    { label: 'Оплата', icon: 'pi pi-wallet', routeName: 'payment' },
];

const router = useRouter();
const route = useRoute();
const projectEditingStore = useProjectEditingStore();
const { isNewProject } = storeToRefs(projectEditingStore);

projectEditingStore.setIsNewProject(!!router.options.history.state.isNewProject);
if (!isNewProject) {
    await projectEditingStore.loadProjectById(Number(route.params.id));
} else {
    projectEditingStore.projectData = new EditableProject();
}

const activeTabIndex = computed(() => tabItems.findIndex((item) => item.routeName === route.name));

function onTabChange(event: TabMenuChangeEvent) {
    const tabRouteName = tabItems[event.index].routeName;
    router.push({ name: tabRouteName, params: { id: route.params.id } });
}
</script>
<style scoped lang="scss">
@layer {
    .p-tabmenu {
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
        overflow-x: visible;
    }
}
:deep(.p-tabmenu-nav) {
    display: flex;
    border: none;

    .p-tabmenuitem {
        flex-grow: 1;
    }
    .p-menuitem-link {
        border: none;
        display: flex;
        justify-content: center;
    }
    .p-tabmenu-ink-bar {
        height: 3px;
    }
    .p-menuitem-icon {
        margin-right: 8px;
    }
}
</style>
