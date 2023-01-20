<template>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
    <div class="app__btns">
      <my-button @click="showDialog">Создать пользователя</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form  @create="createPost"/>
    </my-dialog>
    <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--            Пагинация               -->
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--          :key="pageNumber"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': page === pageNumber-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >{{ pageNumber }}</div>-->
    <!--    </div>-->
</template>

<script>

import axios from 'axios'
import MyInput from '../components/UI/MyInput.vue'
import PostList from '../components/PostList.vue'
import PostForm from '../components/PostForm.vue'
import MySelect from '../components/UI/MySelect.vue'

export default {
  name: 'App',
  components: { MyInput, PostList, PostForm, MySelect},
  data() {
    return {
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
        this.isPostLoading = true
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = res.data
      } catch (e) {
        console.log(e.message)
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page++
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...res.data]
      } catch (e) {
        console.log(e.message)
      }
    },
    // ------ пагинация ------
    // changePage(pageNum) {
    //   this.page = pageNum
    // }
  },
  mounted() {
    this.fetchPost()
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // }
    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        if (this.selectedSort === 'id') return  post1[this.selectedSort] - post2[this.selectedSort]
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     if (newValue === 'id') return  post1[newValue] - post2[newValue]
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // },
    // -------- пагинация -----
    // page() {
    //   this.fetchPost()
    // }
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