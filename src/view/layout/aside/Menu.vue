<template>
  <ul class="menu-nav">
    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item"

      v-for="(item, index) in dash_lists" :key="index"
    >
      <a class="menu-link">
        <inline-svg class="svg-icon" :src="`media/svg/` + item.icon + `.svg`" />
        <span class="menu-text">{{item.description}}</span>
      </a>
    </li>
  </ul>
</template>
<style lang="scss">
  .aside-minimize .aside-menu .menu-nav{
    padding: 0 0 15px 0!important;
  }
  li{
    svg{
      width: 40px;
      margin-right: 12px;
      position: absolute;
      top: 4px;
      left: 15px;
    }
    span{
      margin-left: 40px;
    }
  }
</style>

<script>
import axios from "axios";
export default {
  name: "KTMenu",
  data() {
    return {
      dash_lists: [],
    };
  },
  mounted () {
    axios
      .get('https://cosmos.rounded.com/dev/api/menus_example')
      .then(response => (this.dash_lists = response.data))
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },
  },
};
</script>
