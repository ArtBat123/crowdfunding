import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/assets/css/main.scss';

import App from './App.vue';
import router from './router';
import regPrimeVue from '@/vendor/primevue';
import { useAppSettingsStore } from './stores/appSettings';
import { useAuthStore } from './stores/auth';
import api from './api/api';
import setupDayjs from './vendor/setupDayjs';

(async () => {
    const app = createApp(App);
    setupDayjs();

    app.use(createPinia());
    app.use(router);
    regPrimeVue(app);

    const { isAuth } = await api.auth.checkAuth();
    if (isAuth) await useAuthStore().refreshTokens();
    await useAppSettingsStore().loadContractAddress();

    app.mount('#app');
})();
