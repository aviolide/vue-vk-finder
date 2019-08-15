import Vue from 'vue';
import {globalRouter} from './global/behavior';
import VueRouter from 'vue-router';
import Main from '../../components/app';
import {mainRouter} from './main';
import {wallRouter} from './wall';

const routes = [
  wallRouter,
  mainRouter,
  {
    path: '/',
    redirect: 'main'
  }
];

Vue.use(VueRouter);

export const router = new VueRouter({routes});

globalRouter(router);
