<template>
    <div>
        <h3>Категории</h3>
        <div class="categories-tree">
            <PTree :value="categories"></PTree>
        </div>
    </div>
</template>

<script setup lang="ts">
const categories = [
    {
        key: '0',
        label: 'Documents',
        children: [
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
        ],
    },
    {
        key: '0',
        label: 'Documents',
        children: [
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
            {
                key: '0-0',
                label: 'Work',
            },
            {
                key: '0-1',
                label: 'Home',
            },
        ],
    },
];
</script>

<style scoped></style>
