<template>
    <div class="filter-container">
        <h3>Категории</h3>
        <div class="categories-tree">
            <Tree
                :selection-keys="selectedCategories"
                :value="categories"
                selection-mode="checkbox"
                @update:selection-keys="onSelectItem"
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { TreeSelectionKeys } from 'primevue/tree';
import { useProjectListStore } from '@/stores/projectList';

const router = useRouter();
const dictionariesStore = useDictionariesStore();
const projectsStore = useProjectListStore();
const { projectCategories } = storeToRefs(dictionariesStore);
const { queryParams } = storeToRefs(projectsStore);
// TODO
const selectedCategories = computed(() => {
    const result: TreeSelectionKeys = {};
    if (queryParams.value.subcategoryId) {
        projectCategories.value.forEach((category) => {
            let selectedSubcategoryCount = 0;
            category.subcategoryList.forEach((subcategory) => {
                if (queryParams.value.subcategoryId?.includes(subcategory.id.toString())) {
                    const key = category.id + '-' + subcategory.id;
                    result[key] = { checked: true, partialChecked: false };
                    selectedSubcategoryCount++;
                }
            });
            const key = category.id.toString();
            if (selectedSubcategoryCount > 0) {
                const partialChecked = selectedSubcategoryCount !== category.subcategoryList.length;
                result[key] = {
                    checked: !partialChecked,
                    partialChecked: partialChecked,
                };
            }
        });
    }
    return result;
});

dictionariesStore.getProjectCategories();

const categories = computed<TreeNode[]>(() =>
    treeToPrimeTree(projectCategories.value, {
        label: 'name',
        key: 'id',
        children: 'subcategoryList',
    })
);

function onSelectItem(value: TreeSelectionKeys) {
    const keys = Object.keys(value);
    const subcategoryIdList: string[] = [];
    keys.forEach((item) => {
        if (item.includes('-')) subcategoryIdList.push(item.split('-')[1]);
    });
    queryParams.value.subcategoryId = subcategoryIdList;
    router.push({ query: queryParams.value });
}
</script>

<style scoped lang="scss">
.filter-container {
    min-width: 400px;
    width: 1px;
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
