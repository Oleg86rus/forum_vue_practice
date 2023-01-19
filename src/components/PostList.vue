<template>
  <div v-for="p in posts" class="post">
    <div>
      <strong>Название:</strong> {{ p.title }} </div>
    <div>
      <strong>Описание:</strong> {{ p.body }} </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
</style>