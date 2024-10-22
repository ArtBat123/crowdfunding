<template>
    <div class="content-container">
        <section class="py-6">
            <h1 class="text-center text-3xl">Укажите основную информацию о проекте</h1>
            <h2 class="text-center text-lg font-normal">
                Дайте возможность потенциальному спонсору понять суть проекта
            </h2>
        </section>
        <form>
            <Divider class="mb-6" />
            <TitleInput />
            <Divider class="my-6" />
            <CategoryInput />
            <Divider class="my-6" />
            <ImageInput />
            <Divider class="my-6" />
            <FundingGoalInput />
            <Divider class="my-6" />
            <DeadlineInput />
            <ButtonsBar @update:fields-errors="(e) => (fieldsErrors = e)" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { useDictionariesStore } from '@/stores/dictionaries/dictionaries';
import { useBlockchainStore } from '@/stores/blockchain';
import TitleInput from './TitleInput.vue';
import CategoryInput from './CategoryInput.vue';
import FundingGoalInput from './FundingGoalInput.vue';
import DeadlineInput from './DeadlineInput.vue';
import ImageInput from './ImageInput.vue';
import ButtonsBar from './ButtonsBar.vue';
import { provide, readonly, ref } from 'vue';

const { getProjectCategories } = useDictionariesStore();
const { loadEthExchangeRate } = useBlockchainStore();

const fieldsErrors = ref<Set<string>>(new Set());
provide('errors', {
    fieldsErrors: readonly(fieldsErrors),
    removeError: (field: string) => fieldsErrors.value?.delete(field),
});

await getProjectCategories();
await loadEthExchangeRate();
</script>

<style scoped lang="scss">
:deep() {
    .input-field {
        display: flex;
        flex-direction: column;
        &-value {
            height: 40px;
        }
    }
}
:deep(.left-section-block) {
    width: 40%;
}
:deep(.right-section-block) {
    margin-left: 50px;
    width: 60%;
}
</style>
