<template>
    <div class="finish-button">
        <span
            v-if="errorMessage"
            class="mr-3 error-text"
        >
            {{ errorMessage }}
        </span>
        <Button
            label="Сохранить"
            :loading="isLoading"
            class="w-10rem"
            @click="saveProject"
        ></Button>
    </div>
</template>
<script setup lang="ts">
import api from '@/api/api';
import { useAsyncData } from '@/composable/useAsyncData';
import type { EditableProject } from '@/models/EditableProject';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { projectData, isNewProject } = storeToRefs(useProjectEditingStore());

const emit = defineEmits<{
    (e: 'update:fieldsErrors', fieldsErrors: Set<string>): void;
}>();

const errorMessage = ref<string>();
const isLoading = ref(false);

function getErrorFields() {
    const excludeFields = ['expirationDate', 'numberDays'];
    let fields = Object.keys(projectData.value);
    fields = fields.filter((field) => !excludeFields.includes(field));

    const errorFields = fields.filter(
        (field) => !projectData.value[field as keyof EditableProject]
    );
    if (!projectData.value.expirationDate && !projectData.value.numberDays)
        errorFields.push('expirationDate', 'numberDays');

    return errorFields;
}

async function saveProject() {
    const errorFields = getErrorFields();

    if (errorFields.length) {
        emit('update:fieldsErrors', new Set(errorFields));
        toast.add({
            severity: 'error',
            summary: 'Ошибки заполнения полей',
            life: 3000,
        });
        return;
    }

    const payload = { ...projectData.value, id: Number(route.params.id) };
    const setIsLoading = (value: boolean) => (isLoading.value = value);
    const queryFn = isNewProject
        ? () => api.project.create(payload)
        : () => api.project.update(payload);

    const { error } = await useAsyncData({ queryFn, setIsLoading });
    errorMessage.value = error.value?.message;

    if (!error.value) router.push({ name: 'projectRewards' });
}
</script>
<style scoped>
.finish-button {
    display: flex;
    justify-content: end;
    padding-right: 32px;
    margin-bottom: 32px;
    align-items: center;
}
</style>
