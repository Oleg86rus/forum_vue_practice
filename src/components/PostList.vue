<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <post-item
        v-for="p in posts"
        :post="p"
        :key="p.id"
        @remove="$emit('remove', p)"
    />
  </div>
  <h2 v-else style="color: red">Список постов пуст</h2>
</template>

<script>
import PostItem from './PostItem.vue'

export default {
  name: 'PostList',
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>