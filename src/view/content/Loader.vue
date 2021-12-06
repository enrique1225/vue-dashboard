<template>
  <!-- begin::Page loader -->
  <div class="page-loader page-loader-logo hide">
    <img alt="Logo" :src="logo" width="100" id="loading-logo" />
    <div class="spinner" v-bind:class="spinnerClass || 'spinner-primary'"></div>
  </div>
  <!-- end::Page Loader -->
</template>
<style lang="scss" scoped>
  .hide{
    display: none;
  }
</style>
<script>
export default {
  name: "Loader",
  props: {
    logo: String,
    spinnerClass: String,
  },
};
</script>
