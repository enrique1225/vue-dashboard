<template>
  <!-- begin:: Header -->
  <div
    id="kt_header"
    ref="kt_header"
    class="header"
    v-bind:class="headerClasses"
  >
    <div
      class="container-fluid d-flex align-items-center justify-content-between p-0"
    >
      <!-- begin:: Header Menu -->
      <div
        class="header-menu-wrapper header-menu-wrapper-left"
        ref="kt_header_menu_wrapper"
      >
        <div
          v-if="headerMenuEnabled"
          id="kt_header_menu"
          ref="kt_header_menu"
          class="header-menu header-menu-mobile"
          v-bind:class="headerMenuClasses"
        >
          <div class="brand flex-column-auto" id="kt_brand" ref="kt_brand">
            <div id="brand-logo">
              <router-link to="/">
                <img :src="siteLogo()" alt="Logo" class="logo" />
                <div class="header-slogan">Helps to manage spare parts.</div>
              </router-link>
            </div>
          </div>
          <!-- example static menu here -->
        </div>
      </div>
      <!-- end:: Header Menu -->
      
      <!-- begin:: Search bar -->
      <form type="post" action="/">
        <b-input-group id="search-product">
          <b-form-input placeholder="Example: Galaxy Tab E 9:6"></b-form-input>
          <router-link to="/my-products">
            <b-input-group-append>            
              <b-button variant="outline-success" type="submit"><i class="fa fa-search"></i>Search Product</b-button>            
            </b-input-group-append>
          </router-link>
        </b-input-group>
      </form>
      <!-- end:: Search bar -->
      <KTTopbar></KTTopbar>
    </div>
  </div>
  <!-- end:: Header -->
</template>

<style lang="scss">
  
</style>

<script>
import { mapGetters } from "vuex";
import objectPath from "object-path";
import KTTopbar from "@/view/layout/header/Topbar.vue";
import KTLayoutHeader from "@/assets/js/layout/base/header.js";
import KTLayoutHeaderMenu from "@/assets/js/layout/base/header-menu.js";
import KTLayoutBrand from "@/assets/js/layout/base/brand.js";

export default {
  name: "KTHeader",
  components: {
    KTTopbar,
  },
  mounted() {
    // Init Desktop & Mobile Headers
    KTLayoutHeader.init("kt_header", "kt_header_mobile");
    KTLayoutBrand.init(this.$refs["kt_brand"]);

    // Init Header Menu
    KTLayoutHeaderMenu.init(
      this.$refs["kt_header_menu"],
      this.$refs["kt_header_menu_wrapper"]
    );
  },
  computed: {
    ...mapGetters(["layoutConfig", "getClasses"]),

    /**
     * Check if the header menu is enabled
     * @returns {boolean}
     */
    headerMenuEnabled() {
      return !!this.layoutConfig("header.menu.self.display");
    },

    /**
     * Get extra classes for header based on the options
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses("header");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },

    /**
     * Get extra classes for header menu based on the options
     * @returns {null|*}
     */
    headerMenuClasses() {
      const classes = this.getClasses("header_menu");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },
  },
  methods: {
    siteLogo() {
      const menuAsideLeftSkin = this.layoutConfig("brand.self.theme");
      // set brand logo
      const logoObject = this.layoutConfig("self.logo");

      let logo;
      if (typeof logoObject === "string") {
        logo = logoObject;
      }
      if (typeof logoObject === "object") {
        logo = objectPath.get(logoObject, menuAsideLeftSkin + "");
      }
      if (typeof logo === "undefined") {
        const logos = this.layoutConfig("self.logo");
        logo = logos[Object.keys(logos)[0]];
      }
      return process.env.BASE_URL + logo;
    },
  },
};
</script>
