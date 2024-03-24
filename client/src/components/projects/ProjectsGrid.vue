<template>
    <div class="projects-grid">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.item {
    background-color: red;
    margin: 10px;
    height: 200px;
}
.projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-grow: 1;
}
</style>
