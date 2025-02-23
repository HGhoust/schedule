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
		path: '/Register',
		name: 'register',
		component: () => import('@/views/Auth/Register.vue'),
	},
	{
		path: '/Login',
		name: 'login',
		component: () => import('@/views/Auth/Login.vue'),
	},
	{
		path: '/ResetPassword',
		name: 'reset-password',
		component: () => import('@/views/Auth/ResetPassword.vue'),
	},
	{
		path: '/Teachers',
		name: 'teachers',
		component: () => import('@/views/Teachers.vue'),
	},
	{
		path: '/teachers-lesson/:id?',
		name: 'teachers-lesson',
		component: () => import('@/views/TeachersLesson.vue'),
	},
	{
		path: '/Users',
		name: 'users',
		component: () => import('@/views/Users.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach(async (to, from, next) => {
	const publicPages = ['/Login', '/Register', '/ResetPassword']
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
			return next('/Login')
		}
	}
	next()
})

export default router
