<template>
    <div class="content-container flex flex-column align-items-center mt-4">
        <h1 class="text-center">Любой успешный проект имеет свое начало</h1>
        <p class="text-center mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias velit officia quasi quia
            incidunt vitae! Delectus corrupti harum deleniti commodi saepe dignissimos quo non
            porro, sint culpa, accusamus, praesentium provident?
        </p>
        <Button
            label="Начать создание проекта"
            class="w-20rem mt-3"
            @click="createProject"
        />
    </div>
</template>

<script setup lang="ts">
import api from '@/api/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const id = await api.project.getNextId();

function createProject() {
    router.push({
        name: 'projectEditing',
        params: { id },
        state: { isNewProject: true },
    });
}
</script>
