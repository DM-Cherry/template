import Vue from 'vue';
import Vuex from 'vuex';
import defaultState from './ config';

Vue.use(Vuex);
const store = {
  state: defaultState,
  modules: {},
};
const state = new Vuex.Store(store);

export default state;
