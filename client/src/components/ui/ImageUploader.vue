<template>
    <div>
        <input
            id="file-upload"
            ref="fileInputEl"
            name="file-upload"
            type="file"
            accept=".jpg,.png"
            @change="onImgSelect"
        />
        <div
            v-show="selectedImg"
            class="selected-image-card"
        >
            <img
                ref="selectedImgEl"
                alt="d"
                class="selected-image"
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
            v-if="!selectedImg"
            class="image-uploader-container"
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
import AddImageIcon from '@/components/icons/AddImageIcon.vue';
import { ref } from 'vue';

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
}
function callFileInput() {
    fileInputEl.value?.click();
}
function clear() {
    selectedImg.value = null;
}
</script>

<style scoped lang="scss">
#file-upload {
    width: 0;
    height: 0;
    visibility: hidden;
    position: absolute;
}
.selected-image {
    width: 100%;
    height: 100%;
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
