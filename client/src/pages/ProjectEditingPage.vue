<template>
    <TabMenu
        :active-index="activeTabIndex"
        :model="tabItems"
        style="height: 51px"
        @tab-change="onTabChange"
    />
    <RouterView />
</template>
<script setup lang="ts">
import type { TabMenuChangeEvent } from 'primevue/tabmenu';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const tabItems = [
    { label: 'Основное', icon: 'pi pi-home', routeName: 'projectBaseInfoEditing' },
    { label: 'Награды', icon: 'pi pi-home', routeName: 'projectRewards' },
    { label: 'О проекте', icon: 'pi pi-home', routeName: 'aboutProject' },
];
const activeTabIndex = computed(() => {
    return tabItems.findIndex((item) => item.routeName === route.name);
});

function onTabChange(event: TabMenuChangeEvent) {
    const tabRouteName = tabItems[event.index].routeName;
    router.push({ name: tabRouteName, params: { id: route.params.id } });
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
