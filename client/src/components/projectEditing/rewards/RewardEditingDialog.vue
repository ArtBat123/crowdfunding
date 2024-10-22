<template>
    <Dialog
        v-model:visible="visible"
        style="min-width: 500px; max-width: 750px; width: 50%"
    >
        <div class="mb-5 flex flex-column">
            <h1 class="text-center">Редактор награды</h1>
            <span class="text-center">
                Предлагайте материальные или нематериальные вещи, которые приблизят спонсоров к
                вашему проекту.
            </span>
        </div>
        <div>
            <div class="flex flex-column mb-3">
                <label for="name">Название</label>
                <InputText
                    id="name"
                    v-model="editableReward.name"
                    class="input-field-value"
                />
            </div>
            <div class="flex flex-column mb-3">
                <label for="description">Описание</label>
                <Textarea
                    id="description"
                    v-model="editableReward.description"
                    auto-resize
                    class="input-field-value"
                />
            </div>
            <div class="flex flex-column mb-3">
                <span>Изображение, которое будет отображаться в карточке награды</span>
                <ImageUploader
                    id="image"
                    style="width: 100%; height: 250px"
                    :image-url="editableReward.imageUrl"
                    @upload="uploadFile"
                />
            </div>
            <div class="flex flex-column mb-3">
                <label for="price">Стоимость</label>
                <InputGroup>
                    <InputGroupAddon><span class="pi pi-ethereum"></span></InputGroupAddon>
                    <InputNumber
                        v-model="editableReward.price"
                        :min-fraction-digits="0"
                        :max-fraction-digits="10"
                        input-id="price"
                    />
                </InputGroup>
                <small
                    v-if="priceInRubles"
                    class="text-gray-500"
                >
                    ≈ {{ priceInRubles }}₽
                </small>
            </div>
            <div class="flex flex-column mb-4">
                <label for="quantity">Количество</label>
                <InputNumber
                    v-model="editableReward.limit"
                    input-id="quantity"
                    :use-grouping="false"
                />
            </div>
            <div class="flex justify-content-end align-items-center my-2">
                <div class="error-text mr-3">{{ errorText }}</div>
                <Button
                    label="Отменить"
                    @click="visible = false"
                />
                <Button
                    label="Сохранить"
                    :loading="isLoading"
                    class="ml-2 w-10rem"
                    @click="saveReward"
                />
            </div>
        </div>
    </Dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import ImageUploader from '@/components/ui/ImageUploader.vue';
import api from '@/api/api';
import { useRoute } from 'vue-router';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { useBlockchainStore } from '@/stores/blockchain';
import { FileUtils } from '@/helpers/FileUtils';
import { useAsyncData } from '@/composable/useAsyncData';
import { storeToRefs } from 'pinia';

const visible = defineModel<boolean>('visible');
const route = useRoute();
const projectEditingStore = useProjectEditingStore();
const blockchainStore = useBlockchainStore();
const { editableReward } = storeToRefs(projectEditingStore);

const isLoading = ref(false);
const errorText = ref<string>();

await blockchainStore.loadEthExchangeRate();

const priceInRubles = computed(() => blockchainStore.ethToRubles(editableReward.value.price ?? 0));

async function uploadFile(file: File) {
    const { fileUrl } = await FileUtils.upload(file);
    editableReward.value.imageUrl = fileUrl;
}
async function saveReward() {
    editableReward.value.projectId = Number(route.params.id);
    const { error } = await useAsyncData({
        queryFn: () => api.projectReward.create(editableReward.value),
        setIsLoading: (newValue) => (isLoading.value = newValue),
    });
    if (error.value) {
        errorText.value = error.value?.message;
    } else {
        visible.value = false;
        await projectEditingStore.loadRewardListByProjectId(editableReward.value.projectId);
    }
}
</script>
