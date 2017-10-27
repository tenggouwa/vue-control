// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import RouterConfig from './router'
import ElementUI from 'element-ui'
import ApiConfig from './config/api-config'
import axios from 'axios'
import bus from './config/bus.js'
// import './assets/css/base.css'
import 'element-ui/lib/theme-default/index.css'

// Vue.use(Router)   
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.axios = axios;
Vue.prototype.extendApi = ApiConfig;
var querystring = require('querystring');
var base64 = require('hi-base64');
Vue.prototype.base64=base64;
Vue.prototype.querystring=querystring;

var router = new VueRouter({
    routes:RouterConfig,
    mode: 'history',
})

router.beforeEach((to, from, next) => {
  let token=sessionStorage.getItem("token");
  console.log(token=='');
  if(token!=''&& token){
    bus.$emit("routerc",false)
    next();
  }
  else{
    if(to.path=="/index"){
      bus.$emit("routerc",false);
      next();
    }
    else{
      // to.path="/login";
      next({path:"/index"});
    }
  }
  
})
/* eslint-disable no-new */
new Vue({
    router: router,
    el: '#app',
    template: '<App/>',
    components: { App }
})
