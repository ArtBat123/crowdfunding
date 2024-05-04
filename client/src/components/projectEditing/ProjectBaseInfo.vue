<template>
    <div class="content-container">
        <section class="py-6">
            <h1 class="title">Укажите основную информацию о проекте</h1>
            <h2 class="subtitle">Дайте возможность потенциальному спонсору понять суть проекта</h2>
        </section>
        <Divider />
        <section class="flex my-4">
            <div class="left-section-block">
                <h3>Название проекта</h3>
                <p>
                    Напишите заголовок и подзаголовок, чтобы люди могли быстро понять о чем ваш
                    проект. Оба заголовка будут отображаться на карточке проекта, а также в
                    поисковых выдачах и email письмах.
                </p>
            </div>
            <div class="right-section-block">
                <div class="input-field">
                    <label for="title">Заголовок</label>
                    <InputText
                        id="title"
                        v-model="projectBasicData.title"
                        class="input-field-value"
                    />
                </div>
                <div class="input-field">
                    <label for="subtitle">Подзаголовок</label>
                    <InputText
                        id="subtitle"
                        v-model="projectBasicData.subtitle"
                        class="input-field-value"
                    />
                </div>
            </div>
        </section>
        <Divider />
        <section class="flex my-4">
            <div class="left-section-block">
                <h3>Категория проекта</h3>
                <p>
                    Выберите основную категорию и подкатегорию, чтобы люди могли найти ваш проект.
                </p>
            </div>
            <div class="right-section-block">
                <div class="input-field">
                    <label>Категория</label>
                    <Dropdown
                        v-model="projectBasicData.category"
                        :options="projectCategories"
                        option-label="name"
                        class="input-field-value"
                    />
                </div>
                <div class="input-field">
                    <label>Подкатегория</label>
                    <Dropdown
                        v-model="projectBasicData.subcategory"
                        :options="projectBasicData.category?.subcategoryList"
                        option-label="name"
                        class="input-field-value"
                    />
                </div>
            </div>
        </section>
        <Divider />
        <section class="flex my-4">
            <div class="left-section-block">
                <h3>Изображение для проекта</h3>
                <p>
                    Добавьте изображение, которое представляет ваш проект, оно появится на странице
                    вашего проекта.
                </p>
            </div>
            <div class="right-section-block image-input">
                <ImageUploader
                    id="image"
                    class="h-full"
                    @upload="uploadFile"
                />
            </div>
        </section>
        <Divider />
        <section class="flex my-4">
            <div class="left-section-block">
                <h3>Необходимая сумма для проекта</h3>
                <p>Укажите сумму, которая необходима для завершения проекта.</p>
                <p>
                    Финансирование осуществляется по принципу «все или ничего». Если вы не
                    достигнете своей цели, вы не получите никаких денег.
                </p>
            </div>
            <div class="right-section-block">
                <div class="flex flex-column">
                    <label for="fundingGoal">Необходимая сумма</label>
                    <InputGroup>
                        <InputGroupAddon>₽</InputGroupAddon>
                        <InputNumber
                            v-model="projectBasicData.fundingGoal"
                            input-id="fundingGoal"
                        />
                    </InputGroup>
                </div>
            </div>
        </section>
        <Divider />
        <section class="flex my-4">
            <div class="left-section-block">
                <h3>Длительность проекта</h3>
                <p>
                    Установите длительность по времени для вашей кампании. Вы не сможете изменить
                    это после запуска.
                </p>
            </div>
            <div class="right-section-block">
                <div class="project-duration-type mb-2">
                    <div class="radio-button-container">
                        <RadioButton
                            v-model="projectBasicData.projectDurationType"
                            input-id="numberDays"
                            name="projectDurationType"
                            :value="ProjectDurationType.NumberDays"
                        />
                        <label
                            for="numberDays"
                            class="ml-2"
                        >
                            Фиксированное количество дней (1-60)
                        </label>
                    </div>
                    <div
                        v-if="
                            projectBasicData.projectDurationType === ProjectDurationType.NumberDays
                        "
                        class="project-duration-input-panel"
                    >
                        <label for="numberDays"> Введите количество дней</label>
                        <InputNumber
                            v-model="projectBasicData.numberDays"
                            input-id="numberDays"
                        />
                    </div>
                </div>
                <div class="project-duration-type">
                    <div class="radio-button-container">
                        <RadioButton
                            v-model="projectBasicData.projectDurationType"
                            input-id="expirationDate"
                            name="projectDurationType"
                            :value="ProjectDurationType.ExpirationDate"
                        />
                        <label
                            for="expirationDate"
                            class="ml-2"
                        >
                            Окончание в определенную дату и время
                        </label>
                    </div>
                    <div
                        v-if="
                            projectBasicData.projectDurationType ===
                            ProjectDurationType.ExpirationDate
                        "
                        class="project-duration-input-panel"
                    >
                        <label for="date">Дата окончания проекта</label>
                        <Calendar
                            v-model="projectBasicData.expirationDate"
                            input-id="date"
                            show-icon
                            class="mb-2 w-30rem"
                        />
                        <label for="time">Время окончания проекта</label>
                        <Calendar
                            v-model="projectBasicData.expirationTime"
                            input-id="time"
                            time-only
                            show-icon
                            class="mb-2 w-30rem"
                        >
                            <template #dropdownicon><span class="pi pi-stopwatch"></span></template>
                        </Calendar>
                    </div>
                </div>
            </div>
        </section>
        <div class="finish-button">
            <Button
                label="Сохранить"
                @click="saveProject"
            ></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Divider from '../ui/Divider.vue';
import ImageUploader from '@/components/ui/ImageUploader.vue';
import { useDictionariesStore } from '@/stores/dictionaries/dictionaries';
import { storeToRefs } from 'pinia';
import api from '@/api/api';
import { useRouter } from 'vue-router';

enum ProjectDurationType {
    ExpirationDate = 'expiration_date',
    NumberDays = 'number_days',
}
interface ProjectBasicData {
    title?: string;
    subtitle?: string;
    category?: ProjectCategory;
    subcategory?: ProjectSubcategory;
    imageUrl?: string;
    fundingGoal?: number;
    projectDurationType?: ProjectDurationType;
    expirationDate?: Date;
    expirationTime?: Date;
    numberDays?: number;
}

const router = useRouter();
const dictionariesStore = useDictionariesStore();
const { projectCategories } = storeToRefs(dictionariesStore);
const { getProjectCategories } = dictionariesStore;

const projectBasicData = ref<ProjectBasicData>({});

getProjectCategories();

async function saveProject() {
    const payload = {
        title: projectBasicData.value.title,
        subtitle: projectBasicData.value.subtitle,
        fundingGoal: projectBasicData.value.fundingGoal,
        projectDurationType: projectBasicData.value.projectDurationType,
        expirationDate: projectBasicData.value.expirationDate,
        numberDays: projectBasicData.value.numberDays,
        imageUrl: projectBasicData.value.imageUrl,
        categoryId: projectBasicData.value.category?.id,
        subcategoryId: projectBasicData.value.subcategory?.id,
    };
    const project = await api.project.create(payload);
    router.replace({ params: { id: project.id } });
}
async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const { fileUrl } = await api.files.upload(formData);
    projectBasicData.value.imageUrl = fileUrl;
}
</script>

<style scoped lang="scss">
.image-input {
    height: 250px;
}
h3 {
    font-weight: 500;
}
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
.input-field {
    display: flex;
    flex-direction: column;
    &-value {
        height: 40px;
    }
}
.left-section-block {
    width: 40%;
}
.right-section-block {
    margin-left: 50px;
    width: 60%;
}
.title {
    text-align: center;
    font-size: xx-large;
}
.subtitle {
    text-align: center;
    font-size: large;
    font-weight: normal;
}
.finish-button {
    display: flex;
    justify-content: end;
    padding-right: 32px;
    margin-bottom: 32px;
}
</style>
