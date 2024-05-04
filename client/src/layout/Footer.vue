<template>
    <div class="footer">
        <div class="footer-content content-container">
            <span class="pi pi-instagram"></span>
            <span class="pi pi-youtube"></span>
            <span class="pi pi-facebook"></span>
            <span class="pi pi-twitter"></span>
        </div>
    </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.footer {
    height: 80px;
    border-top: 1px solid var(--border-color);
}
.pi {
    font-size: 24px;
    margin: 0 8px;
    color: var(--surface-700);
    cursor: pointer;
    &:hover {
        color: var(--primary-500);
    }
}
.footer-content {
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
}
</style>
