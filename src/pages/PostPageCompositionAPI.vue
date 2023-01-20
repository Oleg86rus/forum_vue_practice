<template>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
    <div class="app__btns">
      <my-button>Создать пост</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form  @create="createPost"/>
    </my-dialog>
    <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-else>Идет загрузка...</div>
</template>

<script>

import MyInput from '../components/UI/MyInput.vue'
import PostList from '../components/PostList.vue'
import PostForm from '../components/PostForm.vue'
import MySelect from '../components/UI/MySelect.vue'
import useSortedPosts from '../hooks/useSortedPosts'
import { usePosts } from '../hooks/usePosts'
import useSortedAndSearchedPosts from '../hooks/useSortedAndSearchedPosts'

export default {
  name: 'App',
  components: { MyInput, PostList, PostForm, MySelect},
  setup(props) {
    const { posts, totalPage, isPostsLoading } = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    const sortOptions = [
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

    return {
      posts,
      totalPage,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
      sortOptions,
    }
  }
}
</script>

<style>


.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  background: green;
}
</style>