import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from 'components/Hello'
import Index from 'views/index'
import Soft from 'views/soft'
import Hard from 'views/hard'
import Errorcomond from 'views/errorcomond'
import SoftManger from 'views/softManger'
import Softpoint from 'views/softpoint'
import Hardadd from 'views/hardadd'
import Softadd from 'views/softadd'
import Softyyjk from 'views/softyyjk'
import Datarecord from 'views/datarecord'
import hardware from 'views/hardware'

export default [
  {
    path: '/',
    name: 'Hello',
    component: Index
  },
  {
    path: '/index',
    component: Index
  },
  {
    path:"/user",
    component:function(resolve){
      require(["../views/maintain.vue"],resolve);
    },
    children:[
      {
        path:'hardware',
        component:hardware
      },
      {
        path: 'hard',
        component: Hard
      },
      {
        path: 'soft',
        component: Soft
      },
      {
        path: 'errorcomond',
        component: Errorcomond
      },
      {
        path: 'softManger',
        component: SoftManger
      },
      {
        path: 'softpoint',
        component: Softpoint
      },
      {
        path: 'hardadd',
        component: Hardadd
      },
      {
        path: 'softadd',
        component: Softadd
      },
      {
        path: 'softyyjk',
        component: Softyyjk
      },
      {
        path: 'datarecord',
        component: Datarecord
      }
    ]
  },
  // {
  //   path: '/soft',
  //   component: Soft
  // },
  // {
  //   path: '/hard',
  //   component: Hard
  // },
  // {
  //   path: '/errorcomond',
  //   component: Errorcomond
  // },
  // {
  //   path: '/softManger',
  //   component: SoftManger
  // },
  // {
  //   path: '/softpoint',
  //   component: Softpoint
  // },
  // {
  //   path: '/hardadd',
  //   component: Hardadd
  // },
  // {
  //   path: '/softadd',
  //   component: Softadd
  // },
  // {
  //   path: '/softyyjk',
  //   component: Softyyjk
  // },
  // {
  //   path: '/datarecord',
  //   component: Datarecord
  // }
]
