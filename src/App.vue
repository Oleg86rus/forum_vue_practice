<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button style="margin: 15px 0;" @click="showDialog">Создать пользователя</my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form  @create="createPost"/>
    </my-dialog>
    <post-list v-if="!isPostLoading" :posts="posts" @remove="removePost" />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostList from './components/PostList.vue'
import PostForm from './components/PostForm.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: true
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPost() {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = res.data
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostLoading = false
      }
    }
  },
  mounted () {
    this.fetchPost()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}


</style>