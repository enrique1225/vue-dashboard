<template>
  <div
    id="kt_header_mobile"
    class="header-mobile align-items-center"
    v-bind:class="headerClasses"
  >
    <!--begin::Logo-->
    <a href="/">
      <img alt="Logo" :src="headerLogo" width="116" />
    </a>
    <!--end::Logo-->
    <!--begin::Toolbar-->
    
    <!-- begin:: Search bar -->
    <form type="post" action="/">
      <b-input-group id="search-product-mobile">
        <b-form-input placeholder="Galaxy Tab E 9:6"></b-form-input>
      </b-input-group>
    </form>
    <!-- end:: Search bar -->
    <div class="d-flex align-items-center">
      <!--begin::Aside Mobile Toggle-->
      <button
        v-if="asideEnabled"
        class="btn p-0 burger-icon burger-icon-left"
        id="kt_aside_mobile_toggle"
      >
        <span></span>
      </button>
      <!--end::Aside Mobile Toggle-->
    </div>
    <!--end::Toolbar-->
  </div>
</template>
<style lang="scss">
  #search-product-mobile{
    width: 100%;
    background: white;
    border-radius: 30px;

    input{
      border: none;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      font-size: 12px;
      i{
        font-size: 1rem;
      }
    }
  }
</style>

<script>
import { mapGetters } from "vuex";
import KTLayoutHeaderTopbar from "@/assets/js/layout/base/header-topbar.js";

export default {
  name: "KTHeaderMobile",
  components: {},
  mounted() {
    // Init Header Topbar For Mobile Mode
    KTLayoutHeaderTopbar.init(this.$refs["kt_header_mobile_topbar_toggle"]);
  },
  computed: {
    ...mapGetters(["layoutConfig", "getClasses"]),

    /**
     * Get header logo
     * @returns {string}
     */
    headerLogo() {
      return process.env.BASE_URL + this.layoutConfig("self.logo.dark");
    },

    /**
     * Get classes for mobile header
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses("header_mobile");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig("aside.self.display");
    },
  },
};
</script>
