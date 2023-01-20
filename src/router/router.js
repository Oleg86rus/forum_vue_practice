import Main from '../pages/Main.vue'
import { createRouter, createWebHistory } from 'vue-router/dist/vue-router'
import PostPage from '../pages/PostPage.vue'
import About from '../pages/About.vue'
import CurrentPost from '../pages/CurrentPost.vue'

const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/posts',
		component: PostPage
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/posts/:id',
		component: CurrentPost
	}
]

export const router = createRouter({
	routes,
	history: createWebHistory()
})

