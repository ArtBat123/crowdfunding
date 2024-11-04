<template>
    <div>
        <div class="mb-4 flex flex-column">
            <Textarea
                v-model="commentText"
                auto-resize
                placeholder="Напишите свой комментарий"
                class="w-full"
            />
            <div class="w-full flex">
                <span
                    v-if="createErrorText"
                    class="error-text"
                >
                    {{ createErrorText }}
                </span>
                <Button
                    label="Отправить"
                    :loading="isLoadingCreate"
                    class="ml-auto w-10rem mt-2"
                    @click="onCreateCommentClick"
                />
            </div>
        </div>
        <CommentList
            :comments-list="commentList"
            :loading="isLoadingComments"
            :error-text="loadCommentsErrorText"
        />
    </div>
</template>
<script setup lang="ts">
import api from '@/api/api';
import { useAsyncData } from '@/composable/useAsyncData';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import { ref } from 'vue';
import CommentList from './CommentList.vue';

const { currentProject } = storeToRefs(useProjectStore());
const commentList = ref<ProjectComment[]>([]);
const commentText = ref<string | null>();
const isLoadingComments = ref(false);
const isLoadingCreate = ref(false);
const createErrorText = ref<string | null>(null);
const loadCommentsErrorText = ref<string | null>(null);

await getComments();

async function onCreateCommentClick() {
    const projectId = currentProject.value?.id;
    const text = commentText.value;
    if (!projectId || !text) return;

    const { error } = await useAsyncData({
        queryFn: () => api.project.createComment(projectId, text, null),
        setIsLoading: (newValue) => (isLoadingCreate.value = newValue),
    });
    createErrorText.value = error.value?.message ?? null;

    if (!error.value) {
        createErrorText.value = null;
        commentText.value = null;
        getComments();
    }
}

async function getComments() {
    if (currentProject.value) {
        const projectId = currentProject.value.id;

        const { data, error } = await useAsyncData({
            queryFn: () => api.project.getComments(projectId),
            setIsLoading: (newValue) => (isLoadingComments.value = newValue),
        });

        commentList.value = data.value ?? [];
        loadCommentsErrorText.value = error.value?.message ?? null;
    }
}
</script>
