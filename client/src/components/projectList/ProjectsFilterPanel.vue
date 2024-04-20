<template>
    <div class="filter-container">
        <h3>Категории</h3>
        <div class="categories-tree">
            <Tree
                v-model:selectionKeys="selectedCategories"
                :value="categories"
                selection-mode="checkbox"
            >
                <template #togglericon="{ expanded }">
                    <span :class="['pi', expanded ? 'pi-angle-up' : 'pi-angle-down']"></span>
                </template>
            </Tree>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDictionariesStore } from '@/stores/dictionaries/dictionaries';
import { storeToRefs } from 'pinia';
import { treeToPrimeTree } from '@/helpers/tree';
import type { TreeNode } from 'primevue/treenode';
import { computed, ref } from 'vue';

const dictionariesStore = useDictionariesStore();
const { projectCategories } = storeToRefs(dictionariesStore);
const categories = computed<TreeNode[]>(() =>
    treeToPrimeTree(projectCategories.value, {
        label: 'name',
        key: 'id',
        children: 'subcategoryList',
    })
);
dictionariesStore.getProjectCategories();

const selectedCategories = ref({});
</script>

<style scoped lang="scss">
.filter-container {
    min-width: 400px;
}
:deep(.p-tree) {
    padding: 0;

    .p-tree-toggler {
        order: 1;
    }
    .p-treenode-children {
        padding-left: 32px;
    }
    .p-checkbox {
        min-height: 16px;
        height: 16px;
        min-width: 16px;
        width: 16px;
        margin-right: 4px;
        .p-checkbox-box {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
