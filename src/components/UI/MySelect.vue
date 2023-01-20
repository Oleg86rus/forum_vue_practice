<template>
  <select @change="changeOptions">
    <option disabled value="">Выберите из списка</option>
    <option v-for="o in options" :key="o.value" :value="o.value">{{ o.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptions(event) {
      console.log(event)
      this.$emit('update:modelValue', event.target.value)
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>