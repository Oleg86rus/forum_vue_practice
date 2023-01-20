import axios from 'axios'
import { onMounted, ref } from 'vue'

export function usePosts(limit) {
	const posts = ref([])
	const totalPage = ref(0)
	const isPostsLoading = ref(true)
	const fetching = async () => {
		try {
			const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
				params: {
					_page: 1,
					_limit: limit
				}
			})
			totalPage.value = Math.ceil(res.headers['x-total-count'] / limit)
			posts.value = res.data
		} catch (e) {
			console.log(e.message)
		} finally {
			isPostsLoading.value = false
		}
	}
	
	onMounted(fetching)
	
	return {
		posts, isPostsLoading, totalPage
	}
	
}