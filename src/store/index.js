import { createStore } from 'vuex'
import postModule from './postModule'
export default createStore({
	state: {
		isAuth: false
	},
	modules: {
		post: postModule
	},
	setters: {
		showDialog() {
			state.dialogVisible = !state.dialogVisible
		}
	}
})