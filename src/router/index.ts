import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
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

router.beforeEach(async (to, from, next) => {
	const publicPages = ['/Auth']
	const authRequired = !publicPages.includes(to.path)

	if (authRequired) {
		const auth = getAuth()
		const user = await new Promise(resolve => {
			const unsubscribe = onAuthStateChanged(auth, user => {
				resolve(user)
				unsubscribe()
			})
		})

		if (!user) {
			return next('/Auth')
		}
	}
	next()
})

export default router
