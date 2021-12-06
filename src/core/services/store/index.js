import Vue from "vue";
import Vuex from "vuex";

import htmlClass from "./htmlclass.module";
import config from "./config.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    htmlClass,
    config,
  },
});
