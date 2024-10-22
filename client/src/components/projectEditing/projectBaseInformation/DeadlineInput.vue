<template>
    <section class="flex my-4">
        <div class="left-section-block">
            <h3 class="font-semibold mb-1">Длительность проекта</h3>
            <p>
                Установите длительность по времени для вашей кампании. Вы не сможете изменить это
                после запуска.
            </p>
        </div>
        <div class="right-section-block">
            <div
                :class="[
                    'project-duration-type',
                    'mb-2',
                    {
                        'error-text error-border':
                            fieldsErrors.has('numberDays') && fieldsErrors.has('expirationDate'),
                    },
                ]"
            >
                <div class="radio-button-container">
                    <RadioButton
                        v-model="projectData.projectDurationType"
                        input-id="numberDays"
                        name="projectDurationType"
                        :value="'number_days'"
                    />
                    <label
                        for="numberDays"
                        class="ml-2"
                    >
                        Фиксированное количество дней (1-60)
                    </label>
                </div>
                <div
                    v-if="projectData.projectDurationType === 'number_days'"
                    class="project-duration-input-panel"
                >
                    <label for="numberDays"> Введите количество дней</label>
                    <InputNumber
                        v-model="projectData.numberDays"
                        input-id="numberDays"
                        @update:model-value="removeError('numberDays')"
                    />
                </div>
            </div>
            <div
                :class="[
                    'project-duration-type',
                    {
                        'error-text error-border':
                            fieldsErrors.has('numberDays') && fieldsErrors.has('expirationDate'),
                    },
                ]"
            >
                <div class="radio-button-container">
                    <RadioButton
                        v-model="projectData.projectDurationType"
                        input-id="expirationDate"
                        name="projectDurationType"
                        :value="'expiration_date'"
                    />
                    <label
                        for="expirationDate"
                        class="ml-2"
                    >
                        Окончание в определенную дату и время
                    </label>
                </div>
                <div
                    v-if="projectData.projectDurationType === 'expiration_date'"
                    class="project-duration-input-panel"
                >
                    <label for="date">Дата окончания проекта</label>
                    <Calendar
                        v-model="projectData.expirationDate"
                        input-id="date"
                        show-icon
                        class="mb-2 w-30rem"
                        @update:model-value="removeError('expirationDate')"
                    />
                    <label for="time">Время окончания проекта</label>
                    <Calendar
                        v-model="projectData.expirationDate"
                        input-id="time"
                        time-only
                        show-icon
                        class="mb-2 w-30rem"
                        @update:model-value="removeError('expirationDate')"
                    >
                        <template #dropdownicon><span class="pi pi-stopwatch"></span></template>
                    </Calendar>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';

const { fieldsErrors, removeError } = inject<{
    fieldsErrors: Set<string>;
    removeError: (key: string) => void;
}>('errors', { fieldsErrors: new Set(), removeError: () => null });

const { projectData } = storeToRefs(useProjectEditingStore());
</script>
<style scoped>
.project-duration-type {
    border: 1px solid var(--surface-border);
}
.project-duration-input-panel {
    border-top: 1px solid var(--surface-border);
    padding: 16px;
    display: flex;
    flex-direction: column;
}
.radio-button-container {
    padding: 16px;
}
</style>
