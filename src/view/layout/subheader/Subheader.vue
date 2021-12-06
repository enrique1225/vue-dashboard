<template>
  <div
    class="subheader py-2"
    v-bind:class="subheaderClasses"
    id="kt_subheader"
  >
    <div
      class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <h6 class="font-weight-bold my-2 mr-5">
        {{ title }}
      </h6>
      <div class="button-groups">
        <button id="my-collections" class="btn btn-warning" type="button"> My collections </button>
        <button id="store" class="btn btn-warning" type="button"> Store </button>
        <button id="checkout" class="btn btn-warning" type="button"> Checkout </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTSubheader",
  data() {
    return {
      //... dashboard page
      title: "Dashboard",
      dashboard_name: '',
    };
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

    widthFluid() {
      return this.layoutConfig("subheader.width") === "fluid";
    },

    subheaderClasses() {
      const classes = [];
      const style = this.layoutConfig("subheader.style");
      if (style) {
        classes.push(style);

        if (style === "solid") {
          classes.push("bg-white");
        }

        if (this.layoutConfig("subheader.fixed")) {
          classes.push("border-top");
        }
      }
      return classes.join(" ");
    }
  }
};
</script>
