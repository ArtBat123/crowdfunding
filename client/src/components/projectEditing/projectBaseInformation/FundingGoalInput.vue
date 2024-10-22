<template>
    <section class="flex my-4">
        <div class="left-section-block">
            <h3 class="font-semibold mb-1">Необходимая сумма для проекта</h3>
            <p>Укажите сумму, которая необходима для завершения проекта.</p>
            <p>
                Финансирование осуществляется по принципу «все или ничего». Если вы не достигнете
                своей цели, вы не получите никаких денег.
            </p>
        </div>
        <div class="right-section-block">
            <div class="flex flex-column">
                <label
                    for="fundingGoal"
                    :class="{ 'error-text': fieldsErrors.has('fundingGoal') }"
                >
                    Необходимая сумма
                </label>
                <InputGroup>
                    <InputGroupAddon><span class="pi pi-ethereum"></span></InputGroupAddon>
                    <InputNumber
                        v-model="projectData.fundingGoal"
                        :min-fraction-digits="0"
                        :max-fraction-digits="10"
                        input-id="fundingGoal"
                        :invalid="fieldsErrors.has('fundingGoal')"
                        @update:model-value="removeError('fundingGoal')"
                    />
                </InputGroup>
                <small
                    v-if="projectData.fundingGoal"
                    class="text-gray-500"
                >
                    ≈ {{ ethToRubles(projectData.fundingGoal) }}₽
                </small>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useBlockchainStore } from '@/stores/blockchain';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';

const { projectData } = storeToRefs(useProjectEditingStore());
const { ethToRubles } = useBlockchainStore();

const { fieldsErrors, removeError } = inject<{
    fieldsErrors: Set<string>;
    removeError: (key: string) => void;
}>('errors', { fieldsErrors: new Set(), removeError: () => null });
</script>
