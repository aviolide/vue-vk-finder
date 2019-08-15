import 'reflect-metadata';
import Vue from 'vue';
import Vuex from 'vuex';

import {getModule} from 'vuex-module-decorators';
import {Friends} from './members';

const Store = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    friends: Friends,
  }
};

Vue.use(Vuex);

export const store = new Vuex.Store(Store);

export const friendsModule = getModule(Friends, store);
