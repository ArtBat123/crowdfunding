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
                    component: () => import('@/pages/ProjectListPage.vue'),
                },
                {
                    path: '/projects/:id?/edit',
                    name: 'projectEditing',
                    redirect: { name: 'projectBaseInfoEditing' },
                    component: () => import('@/pages/ProjectEditingPage.vue'),
                    children: [
                        {
                            path: 'base',
                            name: 'projectBaseInfoEditing',
                            component: () =>
                                import('@/components/projectEditing/ProjectBaseInfo.vue'),
                        },
                        {
                            path: 'rewards',
                            name: 'projectRewards',
                            component: () =>
                                import('@/components/projectEditing/ProjectRewards.vue'),
                        },
                        {
                            path: 'about',
                            name: 'aboutProject',
                            component: () =>
                                import('@/components/projectEditing/AboutProject.vue'),
                        },
                    ],
                },
            ],
        },
    ],
});

export default router;
