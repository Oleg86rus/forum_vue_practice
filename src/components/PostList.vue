<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <transition-group name="postList">
      <post-item
          v-for="p in posts"
          :post="p"
          :key="p.id"
          @remove="$emit('remove', p)"
      />
    </transition-group>
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
.postList-item {
  display: inline-block;
  margin-right: 10px;
}

.postList-enter-active, .postList-leave-active {
  transition: all 0.5s ease;
}

.postList-enter-from, .postList-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.postList-move {
  transition: transform 0.4s ease;
}
 </style>