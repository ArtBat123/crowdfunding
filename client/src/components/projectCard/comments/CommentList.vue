<template>
    <div class="mb-5">
        <div v-if="!errorText && commentsList.length">
            <div
                v-for="comment in commentsList"
                :key="comment.id"
                class="p-3 border-1 border-300 mb-2"
            >
                <div class="mb-2">
                    <Avatar
                        :label="comment.user.nickname[0].toUpperCase()"
                        class="mr-2"
                    />
                    <span class="mr-2 font-semibold">{{ comment.user.nickname }}</span>
                    <span
                        :title="dayjs(comment.createdDate).format()"
                        class="text-sm text-color-secondary cursor-pointer"
                    >
                        {{ dayjs(comment.createdDate).fromNow() }}
                    </span>
                </div>
                <div>{{ comment.text }}</div>
            </div>
        </div>

        <div
            v-else-if="!errorText"
            class="flex flex-column align-items-center"
        >
            <img
                :src="imageSrc.toString()"
                alt="empty state"
                style="max-width: 300px; width: 100%"
            />
            <div class="text-color-secondary">Комментариев пока нет, но вы можете быть первым</div>
        </div>
        <div
            v-else
            class="error-text"
        >
            {{ errorText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const imageSrc = new URL('@/assets/image/empty-state.png', import.meta.url);
const { commentsList, loading, errorText } = defineProps<{
    commentsList: ProjectComment[];
    loading: boolean;
    errorText: string | null;
}>();

function getDate(date: string) {
    return dayjs(date).format('DD.MM.YYYY');
}
</script>

<style lang="scss" scoped></style>
