import Vue from 'vue';
import Vuex from 'vuex';
import TaskModule from './task.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    TaskModule
  }
});