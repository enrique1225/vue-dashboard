<template>
  <div class="row">
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 card-block" v-for="(item,i) in content_lists" :key="`menu-` + i">
      <div class="card">
        <div class="card-body pt-0">
          <span class="svg-icon svg-icon svg-icon-xl">
            <inline-svg class="svg-icon" :src="`media/svg/` + item.icon + `.svg`" />
          </span>
          <h5 class="card-title font-weight-bolder m-0">{{item.description}}</h5>
        </div>
        <!--end::Body-->
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .card-block{
    text-align: center;
    margin: 1rem 0; 
    svg{
      width: 150px;
      height: 80px;
    }
    .card-body{
      &:hover, &:focus{
        background-color: #0089ca;
        cursor: pointer;
        & > h5{
          color: #fff;
        }
        svg .cls-1, svg .cls-2{
          fill: #fff;
        }
      }
      span{
        height: 80px;
        display: block;
      }
    }
  }
</style>
<script>
import axios from "axios";
export default {
  name: "dashboard",
  data(){
    return{
      content_lists: [],
    }
  },
  mounted () {
    axios
      .get('https://cosmos.rounded.com/dev/api/menus_example')
      .then(response => (this.content_lists = response.data))
  },
  methods: {},
};
</script>
