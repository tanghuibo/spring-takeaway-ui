<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + icon"></use>
  </svg>
</template>

<script>
export default {
  name: "IconView",
  props: {
    icon: {
      type: String
    }
  }
};
</script>

<style scoped>

</style>
