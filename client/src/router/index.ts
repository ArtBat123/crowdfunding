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
                    path: '/:pathMatch(.*)',
                    redirect: { name: 'notFound' },
                },
                {
                    path: '/not-found',
                    name: 'notFound',
                    component: () => import('@/pages/NotFoundPage.vue'),
                },
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
                    path: '/projects/:id',
                    name: 'projectsCard',
                    component: () => import('@/pages/ProjectPage.vue'),
                    children: [
                        {
                            path: 'story',
                            name: 'viewProjectStory',
                            component: () => import('@/components/projectCard/ProjectStory.vue'),
                        },
                        {
                            path: 'rewards',
                            name: 'viewProjectRewards',
                            component: () => import('@/components/projectCard/ProjectRewards.vue'),
                        },
                        {
                            path: 'updates',
                            name: 'viewProjectUpdates',
                            component: () => import('@/components/projectCard/ProjectUpdates.vue'),
                        },
                        {
                            path: 'comments',
                            name: 'viewProjectComments',
                            component: () => import('@/components/projectCard/ProjectComments.vue'),
                        },
                    ],
                },
                {
                    path: '/start-project-information',
                    name: 'startProjectInformation',
                    component: () => import('@/pages/PreCreateProjectInformationPage.vue'),
                },
                {
                    path: '/projects/:id/edit',
                    name: 'projectEditing',
                    redirect: { name: 'projectBaseInfoEditing' },
                    component: () => import('@/pages/ProjectEditingPage.vue'),
                    children: [
                        {
                            path: 'base',
                            name: 'projectBaseInfoEditing',
                            component: () =>
                                import(
                                    '@/components/projectEditing/baseInformation/ProjectBaseInfo.vue'
                                ),
                        },
                        {
                            path: 'rewards',
                            name: 'projectRewards',
                            component: () =>
                                import('@/components/projectEditing/rewards/ProjectRewards.vue'),
                        },
                        {
                            path: 'about',
                            name: 'aboutProject',
                            component: () => import('@/components/projectEditing/AboutProject.vue'),
                        },
                        {
                            path: 'payment',
                            name: 'payment',
                            component: () =>
                                import('@/components/projectEditing/ProjectPaymentInfo.vue'),
                        },
                    ],
                },
                {
                    path: '/projects/:id/reward-selecting',
                    name: 'rewardSelecting',
                    component: () => import('@/pages/RewardSelectingPage.vue'),
                },
                {
                    path: '/my-projects',
                    name: 'userProjects',
                    component: () => import('@/pages/UserProjects.vue'),
                },
            ],
        },
    ],
});

export default router;
