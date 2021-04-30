<template>
  <section class="container">
    <span>组件类型：{{ genre }}</span>
  </section>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      genre: '公共组件',
    };
  },
  mounted() {
    console.log(this.genre);
  },
};
</script>

<style lang="scss" scoped>
.container {
  span {
    color: red;
  }
}
</style>
