import Vue from 'vue'
import Router from 'vue-router'
import Open from '@/views/index/open-accounts'
import Meter from '@/views/index/meter'
import Purchase from '@/views/index/purchase'
import Login from '@/views/index/login'

import AdminLogin from '@/views/admin/login'
import AdminIndex from '@/views/admin/index'
import Adminmanagement from '@/views/admin/management'
import AdminMeter from '@/views/admin/meter'
import AdminCustomer from '@/views/admin/customer'
import AdminPrice from '@/views/admin/price'
import AdminAdditionalfree from '@/views/admin/additionalfree'
import AdminHoliday from '@/views/admin/holiday'
import AdminFriendly from '@/views/admin/friendly'
import AdminPrepaid from '@/views/admin/prepaid'
import AdminaddAdditionalfree from '@/views/admin/addAdditionalfree'
import AdminaddPrice from '@/views/admin/addPrice'
import Adminparameters from  '@/views/admin/parameters'
import Adminoperatorinfo from '@/views/admin/operatorInfo'
import Admindistrict from '@/views/admin/district'
import Adminprofile from '@/views/admin/profile'
import AdminmodifyInfo from '@/views/admin/modifyInfo'
import AdminpasswordSettings from '@/views/admin/passwordSettings'
import AdminoperatorType from '@/views/admin/operatorType'
import AdminmenuManagement from '@/views/admin/menuManagement'
import Adminadministrator from '@/views/admin/administrator'
import AdmineditPrice from '@/views/admin/editPrice'
import AdmineditAddtional from '@/views/admin/editAddtional'
import AdminaddVUDK from '@/views/admin/addVUDK'
import AdmineditVUDK from '@/views/admin/editVUDK'


Vue.use(Router);


export default[
    // {
    //   path: 'index/open',
    //   component:Open
    // },
    // {
    //   path: 'index/meter',
    //   component:Meter
    // },
    // {
    //   path: '/index/index',
    //   component:Open
    // },
    // {
    //   path: '/index',
    //   component:Login
    // },
    // {
    //   path: 'index/purchase',
    //   component:Purchase
    // },
    {
      path: '/',
      name:'login',
      component: AdminLogin,
    },
    {
      path: '/admin',
      component: Adminmanagement,
      children:[
        {
          path: 'index',
          component: AdminIndex,

          meta: {
            //meta元素
            requireAuth: true,
          },
        },
        {
          path:'meter',
          meta: {
            //meta元素
            requireAuth: true,
          },
          component: AdminMeter,
        },
        {
          path: 'customer',
          component: AdminCustomer
        },
        {
          path: 'price',
          component: AdminPrice
        },
        {
          path: 'additionalfree',
          component: AdminAdditionalfree,
        },
        {
          path: 'holiday',
          component: AdminHoliday
        },
        {
          path: 'friendly',
          component: AdminFriendly
        },
        {
          path: 'prepaid',
          component: AdminPrepaid
        },

        {
          path: 'addPrice',
          component: AdminaddPrice
        },
        {
          path: 'addAdditionalfree',
          component: AdminaddAdditionalfree
        },
        {
          path: 'parameters',
          component: Adminparameters
        },
        {
          path: 'operatorInfo',
          component: Adminoperatorinfo
        },
        {
          path: 'district',
          component: Admindistrict
        },
        {
          path:'profile',
          component:Adminprofile
        },
        {
          path:'modifyInfo',
          component:AdminmodifyInfo
        },
        {
          path:'passwordSettings',
          component:AdminpasswordSettings
        },
        {
          path:'administrator',
          component:Adminadministrator
        },
        {
          path:'menuManagement',
          component:AdminmenuManagement
        },
        {
          path:'operatorType',
          component:AdminoperatorType
        },
        {
          path:'editPrice/:id',
          component:AdmineditPrice
        },
        {
          path:'editAddtional/:id',
          component:AdmineditAddtional
        },
        {
          path:'vudk',
          component:AdminaddVUDK
        },
        {
          path:'replaceVudk',
          component:AdmineditVUDK
        },
      ]
    },
  ]
