<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + icon"></use>
  </svg>
</template>

<script>
export default {
  name: "IconView",
  props: {
    /**
     * 图标名称
     */
    icon: {
      type: String
    }
  }
};
</script>

<style scoped>

</style>
