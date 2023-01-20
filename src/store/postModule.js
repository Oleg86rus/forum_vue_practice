import axios from 'axios'

export default {
	state: () => ({
		posts: [],
		dialogVisible: false,
		isPostLoading: false,
		selectedSort: '',
		searchQuery: '',
		page: 1,
		limit: 10,
		totalPages: 0,
		sortOptions: [
			{
				value: 'title',
				name: 'По названию'
			},
			{
				value: 'body',
				name: 'По Содержимому'
			},
			{
				value: 'id',
				name: 'По id'
			}
		]
	}),
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((post1, post2) => {
				if (state.selectedSort === 'id') return  post1[state.selectedSort] - post2[state.selectedSort]
				return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
			})
		},
		sortedAndSearchedPosts(state, getters) {
			return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
		}
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts
		},
		setLoading(state, bool) {
			state.isPostLoading = bool
		},
		setPage(state, page) {
			state.page = page
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort
		},
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery
		},
	},
	actions: {
		async fetchPost({state, commit}) {
			try {
				commit('setLoading', true)
				const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit
					}
				})
				commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
				commit('setPosts', res.data)
			} catch (e) {
				console.log(e.message)
			} finally {
				commit('setLoading', false)
			}
		},
		async loadMorePosts({state, commit}) {
			try {
				commit('setPage', state.page + 1)
				const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit
					}
				})
				commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
				commit('setPosts', [...state.posts, ...res.data])
			} catch (e) {
				console.log(e.message)
			}
		},
	},
	namespaced: true
}