import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/assets/main.css';

import App from './App.vue';
import router from './router';
import regPrimeVue from '@/vendor/primevue';
import { useAppSettingsStore } from './stores/appSettings';

(async () => {
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);
    regPrimeVue(app);

    await useAppSettingsStore().loadContractAddress();

    app.mount('#app');
})();
