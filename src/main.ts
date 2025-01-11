import './assets/styles/global.sass'
import './assets/styles/variables.sass'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { initializeApp } from 'firebase/app'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
	apiKey: 'AIzaSyASfaALWrSyFC0jSLt2S77ex3rxXPYgdbU',
	authDomain: 'schedule-gh.firebaseapp.com',
	databaseURL: 'https://schedule-gh-default-rtdb.firebaseio.com',
	projectId: 'schedule-gh',
	storageBucket: 'schedule-gh.firebasestorage.app',
	messagingSenderId: '659790189644',
	appId: '1:659790189644:web:9868bd56e802dcaa8ed0e9',
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
