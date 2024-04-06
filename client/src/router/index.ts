import { createRouter, createWebHistory } from 'vue-router';
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
                {
                    path: '/create-project',
                    name: 'createProject',
                    component: () => import('@/pages/ProjectCreationPage.vue'),
                    children: [
                        {
                            path: 'base',
                            name: 'createProjectBase',
                            component: () =>
                                import('@/components/projectCreation/ProjectCreationBase.vue'),
                        },
                    ],
                },
            ],
        },
    ],
});

export default router;
