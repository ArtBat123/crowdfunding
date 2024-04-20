<template>
    <TabView>
        <TabPanel header="Основное">
            <ProjectCreationBase />
        </TabPanel>
        <TabPanel header="Награды"></TabPanel>
        <TabPanel header="О проекте"></TabPanel>
    </TabView>
</template>
<script setup lang="ts">
import ProjectCreationBase from '@/components/projectCreation/ProjectCreationBase.vue';
import type { TabMenuChangeEvent } from 'primevue/tabmenu';
import { useRouter } from 'vue-router';

const router = useRouter();
const tabItems = [
    { label: 'Основное', icon: 'pi pi-home', route: 'base' },
    { label: 'Награды', icon: 'pi pi-home', route: 'rewards' },
    { label: 'О проекте', icon: 'pi pi-home', route: 'about' },
];

function onTabChange(event: TabMenuChangeEvent) {
    const tabRoute = tabItems[event.index].route;
    router.push(tabRoute);
}
</script>
<style scoped lang="scss">
.container {
    max-width: var(--max-content-width);
    margin: 0 auto;
}
.navigation {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
    background-color: var(--surface-overlay);

    &-menu {
        max-width: var(--max-content-width);
        margin: 0 auto;
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
    }
    .p-tabmenu-ink-bar {
        height: 3px;
    }
}
</style>
