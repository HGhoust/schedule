import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/Main.vue'),
	},
	{
		path: '/Auth',
		name: 'auth',
		component: () => import('@/components/pages/auth/PageAuth.vue'),
	},
	{
		path: '/Add-Schedule',
		name: 'add-schedule',
		component: () => import('@/components/pages/addSchedule/addSchedule.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
