<template>
  <!-- begin:: Footer -->
  <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
    <div
      class="d-flex align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="text-dark">
        <span class="font-weight-bold mr-2">
          &copy; 2004 - 2020 Rounded.com
        </span>
      </div>
      <div class="nav nav-dark">
        <a
          href="https://rounded.com/"
          target="_blank"
          class="nav-link pr-3 pl-0"
        >
          Mission
        </a>
        <a
          href="https://rounded.com/"
          target="_blank"
          class="nav-link px-3"
        >
          Conditions
        </a>
        <a
          href="https://rounded.com/privacy-policy.html"
          target="_blank"
          class="nav-link pl-3 pr-0"
        >
          Privacy
        </a>
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>
<style lang="scss">
  .nav a{
    color: #000;
  }
  .nav a:hover{
    border-bottom: 1px solid #ccc;
  }
</style>
<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    },
  },
};
</script>
