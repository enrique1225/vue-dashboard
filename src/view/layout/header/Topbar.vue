<template>
  <div class="topbar">
    <template>
      <!-- <span id="test-workstation"> TestWorkstation </span> -->
      <div
        class="btn btn-icon btn-clean"
      >
        <span class="svg-icon svg-icon-xl svg-icon-primary">
          <i class="flaticon2-pin"></i>
        </span>
        <span class="pulse-ring"></span>
      </div>
      <div id="user-icon">
        <span>QK</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.topbar {
  #test-workstation{
    color: #fff
  }
  .btn-clean{
    &:hover, &:focus{
      background: transparent!important;
    }
    .flaticon2-pin:before {
      color: #fff;
    }
  }
  #user-icon{
    display: inline-block;
    border-left: 1px solid #fff;
    padding-left: 10px;
    height: 30px;
    span{
      display: block;
      margin-right: 20px;
      border: 1px solid #fff;
      border-radius: 50%;
      padding: 3px;
      background: #23536a;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>

<script>
export default {
  name: "KTTopbar",
  data() {
    return {};
  },
  methods: {},
  computed: {
    user() {
      return process.env.BASE_URL + "media/users/default-profile-picture.png";
    },
  },
};
</script>
