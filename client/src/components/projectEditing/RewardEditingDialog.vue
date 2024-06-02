<template>
    <Dialog :visible="visible">
        <div class="mb-5">
            <h1>Добавить награду</h1>
            <span>
                Предлагайте материальные или нематериальные вещи, которые приблизят спонсоров к
                вашему проекту.
            </span>
        </div>
        <div class="flex">
            <div class="form-panel">
                <div class="flex flex-column">
                    <label for="name">Название</label>
                    <InputText
                        id="name"
                        v-model="newReward.name"
                        class="input-field-value"
                    />
                </div>
                <div class="flex flex-column">
                    <label for="description">Описание</label>
                    <Textarea
                        id="description"
                        v-model="newReward.description"
                        auto-resize
                        class="input-field-value"
                    />
                </div>
                <div class="flex flex-column reward-image">
                    <span>Изображение, которое будет отображаться в карточке награды</span>
                    <ImageUploader
                        id="image"
                        class="h-full"
                        @upload="uploadFile"
                    />
                </div>
                <div class="flex flex-column">
                    <label for="price">Стоимость</label>
                    <InputGroup>
                        <InputGroupAddon><span class="pi pi-ethereum"></span></InputGroupAddon>
                        <InputNumber
                            v-model="newReward.price"
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
                <div class="flex flex-column">
                    <label for="quantity">Количество</label>
                    <InputNumber
                        v-model="newReward.limit"
                        input-id="quantity"
                        :use-grouping="false"
                    />
                </div>
                <div class="flex justify-content-end my-2">
                    <Button
                        label="Отменить"
                        @click="closeDialog"
                    />
                    <Button
                        label="Сохранить"
                        class="ml-2"
                        @click="saveReward"
                    />
                </div>
            </div>
            <div class="preview-panel"></div>
        </div>
    </Dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import ImageUploader from '../ui/ImageUploader.vue';
import api from '@/api/api';
import { useRoute } from 'vue-router';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { useBlockchainStore } from '@/stores/blockchain';

interface NewReward {
    name?: string;
    price?: number;
    imageUrl?: string;
    limit?: number;
    projectId?: number;
    description?: string;
}
interface Props {
    visible: boolean;
}

const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
}>();
const props = defineProps<Props>();
const newReward = ref<NewReward>({});
const route = useRoute();
const { loadRewardListByProjectId } = useProjectEditingStore();
const { ethExchangeRate, loadEthExchangeRate } = useBlockchainStore();
loadEthExchangeRate();

async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const { fileUrl } = await api.files.upload(formData);
    newReward.value.imageUrl = fileUrl;
}
async function saveReward() {
    newReward.value.projectId = Number(route.params.id);
    await api.projectReward.create(newReward.value);
    await loadRewardListByProjectId(newReward.value.projectId);
    closeDialog();
}
function closeDialog() {
    emit('update:visible', false);
}

const priceInRubles = computed(() => {
    const price = newReward.value.price ?? 0;
    return price * ethExchangeRate.value;
});
</script>
<style scoped>
.preview-panel {
    width: 40%;
}
.form-panel {
    width: 60%;
}
</style>
