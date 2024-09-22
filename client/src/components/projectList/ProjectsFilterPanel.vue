<template>
    <div class="filter-container">
        <div class="filter-title mb-2">Категории</div>
        <Tree
            :value="categoriesTree"
            :selection-keys="selectedCategoryKeys"
            selection-mode="checkbox"
            @update:selection-keys="onSelectCategory"
        >
            <template #togglericon="{ expanded }">
                <span :class="['pi', expanded ? 'pi-angle-up' : 'pi-angle-down']"></span>
            </template>
        </Tree>
        <div class="flex justify-content-between align-items-center my-2">
            <label
                for="visibleFinishedProject"
                class="filter-title filter-title_interactive"
            >
                Показывать закрытые проекты
            </label>
            <InputSwitch
                v-model="filters.visibleFinishedProject"
                input-id="visibleFinishedProject"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDictionariesStore } from '@/stores/dictionaries/dictionaries';
import { storeToRefs } from 'pinia';
import { treeToPrimeTree } from '@/helpers/tree';
import type { TreeNode } from 'primevue/treenode';
import { computed } from 'vue';
import type { TreeSelectionKeys } from 'primevue/tree';
import { useProjectListStore } from '@/stores/projectList';

const dictionariesStore = useDictionariesStore();

await dictionariesStore.getProjectCategories();
await dictionariesStore.getProjectSubcategories();

const { projectCategories, projectCategoriesMap, projectSubcategoriesMap } =
    storeToRefs(dictionariesStore);
const { filters } = useProjectListStore();

const categoriesTree = computed<TreeNode[]>(() =>
    treeToPrimeTree(projectCategories.value, {
        label: 'name',
        key: 'id',
        children: 'subcategoryList',
    })
);

const selectedCategoryKeys = computed<TreeSelectionKeys>(() => {
    const result: Record<string, object> = {};

    const selectAllSubcategories = (categoryId: number) => {
        const subcategoryList = projectCategoriesMap.value.get(categoryId)?.subcategoryList;
        subcategoryList?.forEach(
            ({ id }) => (result[categoryId + '-' + id] = { checked: true, partialChecked: false })
        );
    };
    filters.categoriesId.forEach((categoryId) => {
        result[categoryId] = { checked: true, partialChecked: false };
        selectAllSubcategories(categoryId);
    });

    filters.subcategoriesId.forEach((id) => {
        const categoryId = projectSubcategoriesMap.value.get(id)?.categoryId as number;
        const key = categoryId + '-' + id;
        result[key] = { checked: true, partialChecked: false };
        result[categoryId] = { checked: false, partialChecked: true };
    });

    return result;
});

async function onSelectCategory(selectionKeys: TreeSelectionKeys) {
    const _selectedSubcategories: number[] = [];
    const _selectedCategories: number[] = [];
    const keyList = Object.keys(selectionKeys);

    keyList.forEach((key) => {
        if (selectionKeys[key].checked) {
            const [category, subcategory] = key.split('-');

            if (subcategory && selectionKeys[category].partialChecked) {
                _selectedSubcategories.push(Number(subcategory));
            } else if (!subcategory) {
                _selectedCategories.push(Number(category));
            }
        }
    });

    filters.subcategoriesId = _selectedSubcategories;
    filters.categoriesId = _selectedCategories;
}
</script>

<style scoped lang="scss">
.filter-container {
    min-width: 350px;
    width: 1px;
}
.filter-title {
    color: var(--text-color);
    font-size: var(--text-xl);
    font-weight: 600;
    line-height: 100%;
    &_interactive {
        cursor: pointer;
        padding-bottom: 4px;
        &:hover {
            color: var(--hover-text-color);
        }
    }
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
        height: 16px;
        width: 16px;
        min-width: 16px;
        margin-right: 4px;
        .p-checkbox-box {
            height: 100%;
            width: 100%;
        }
    }
    .p-treenode-content {
        padding-left: 2px;
    }
}
</style>
