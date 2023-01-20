import Main from '../pages/Main.vue'
import { createRouter, createWebHistory } from 'vue-router/dist/vue-router'
import PostPage from '../pages/PostPage.vue'
import About from '../pages/About.vue'
import CurrentPost from '../pages/CurrentPost.vue'
import PostPageWithStore from '../pages/PostPageWithStore.vue'
import PostPageCompositionAPI from '../pages/PostPageCompositionAPI.vue'

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
	},
	{
		path: '/store',
		component: PostPageWithStore
	},
	{
		path: '/composition',
		component: PostPageCompositionAPI
	}
]

export const router = createRouter({
	routes,
	history: createWebHistory()
})

