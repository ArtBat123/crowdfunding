<template>
    <div>
        <input
            :id="id"
            ref="fileInputEl"
            name="file-upload"
            type="file"
            accept=".jpg,.png"
            class="file-uploader"
            @change="onImgSelect"
        />
        <div
            v-show="selectedImg || imageUrl"
            class="selected-image-card"
        >
            <img
                ref="selectedImgEl"
                alt="image"
                class="selected-image"
                :style="{ objectFit: props.objectFit }"
            />
            <div class="buttons-bar">
                <Button
                    icon="pi pi-sync"
                    severity="secondary"
                    class="mr-2"
                    @click="callFileInput"
                />
                <Button
                    icon="pi pi-trash"
                    severity="secondary"
                    @click="clear"
                />
            </div>
        </div>
        <div
            v-if="!(selectedImg || imageUrl)"
            :class="['image-uploader-container', { 'error-border': invalid }]"
            tabindex="0"
            @click.self="onClickOfContainer"
        >
            <AddImageIcon
                width="60px"
                height="60px"
            />
            <div>Выберите изображение</div>
        </div>
    </div>
</template>
<script setup lang="ts">
// TODO
import AddImageIcon from '@/components/icons/AddImageIcon.vue';
import { onMounted, ref } from 'vue';

interface Props {
    id: string;
    imageUrl?: string;
    invalid?: boolean;
    objectFit?: 'fill' | 'contain';
}

const props = withDefaults(defineProps<Props>(), { objectFit: 'fill' });
const emit = defineEmits<{
    (e: 'upload', file: File): void;
}>();

const fileInputEl = ref<HTMLInputElement>();
const selectedImgEl = ref<HTMLImageElement>();
const selectedImg = ref<File | null>(null);

function onClickOfContainer() {
    callFileInput();
}
function onImgSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || !target.files.length || !selectedImgEl.value) return;

    const file = target.files[0];
    selectedImg.value = file;
    selectedImgEl.value.src = URL.createObjectURL(file);
    emit('upload', file);
}
function callFileInput() {
    fileInputEl.value?.click();
}
function clear() {
    selectedImg.value = null;
}

onMounted(() => {
    if (props.imageUrl && selectedImgEl.value) selectedImgEl.value.src = props.imageUrl;
});
</script>

<style scoped lang="scss">
.file-uploader {
    width: 0;
    height: 0;
    visibility: hidden;
    position: absolute;
}
.selected-image {
    width: 100%;
    height: calc(100% - 38px);
    object-fit: cover;

    &-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 8px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
    }
}
.buttons-bar {
    height: 38px;
    margin-top: 6px;
    display: flex;
    justify-content: start;
}
.image-uploader-container {
    height: 100%;
    padding: 8px;
    border: 2px dashed var(--gray-300);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    outline: none;
    position: relative;
    cursor: pointer;
    &:focus,
    &:hover {
        background-color: var(--hover-color-block);
        border: 2px dashed var(--gray-400);
    }
}
:deep(.p-button-secondary) {
    background-color: var(--gray-100);
}
</style>
