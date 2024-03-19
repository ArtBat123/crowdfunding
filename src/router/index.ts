import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/HomeView.vue';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/pages/HomeView.vue'),
                },
                {
                    path: '/projects',
                    name: 'projects',
                    component: () => import('@/pages/ProjectsPage.vue'),
                },
            ],
        },
    ],
});

export default router;
