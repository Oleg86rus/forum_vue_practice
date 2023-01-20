<template>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button @click="showDialog">Создать Пост</my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form  @create="createPost"/>
    </my-dialog>
    <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import MyInput from '../components/UI/MyInput.vue'
import PostList from '../components/PostList.vue'
import PostForm from '../components/PostForm.vue'
import MySelect from '../components/UI/MySelect.vue'

export default {
  name: 'App',
  components: { MyInput, PostList, PostForm, MySelect},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPost'
    }),
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
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  watch: {

  }
}
</script>

<style>


.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
/* пагинация
/*.page__wrapper {*/
/*  display: flex;*/
/*  margin-top: 15px;*/
/*}*/

/*.page {*/
/*  border: 1px solid black;*/
/*  border-right: none;*/
/*  padding: 10px;*/
/*}*/
/*.page:last-child {*/
/*  border-right: 1px solid black;*/
/*}*/

/*.current-page {*/
/*  border: 3px solid green;*/
/*}*/

.observer {
  height: 30px;
  background: green;
}
</style>