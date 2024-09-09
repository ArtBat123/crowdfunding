<template>
    <div
        class="hover:bg-gray-50 p-2 cursor-pointer"
        @click="toggle"
    >
        <Avatar
            icon="pi pi-user"
            shape="circle"
        />
        <span class="pi pi-chevron-down text-gray-400 text-xs ml-2"></span>
    </div>
    <Menu
        ref="menu"
        :model="menuItems"
        popup
        :pt="{ icon: 'mr-2' }"
    ></Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import type Menu from 'primevue/menu';
import { useAuthStore } from '@/stores/auth';

const { logout } = useAuthStore();
const menuItems = ref<MenuItem[]>([{ label: 'Выйти', icon: 'pi pi-sign-out', command: logout }]);
const menu = ref<Menu>();

function toggle(event: Event) {
    menu.value?.toggle(event);
}
</script>
