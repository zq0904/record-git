import VueRouter from 'vue-router';
import Home from './components/home/Home.vue';
  import List from './components/home/List.vue';
  import Detail from './components/topic/Detail.vue'; //详情
  import Edit from './components/topic/Edit.vue'; //编辑
  import New from './components/topic/New.vue'; //发表

  import Setting from './components/settings/Setting.vue'; //设置
    import Profile from './components/settings/Profile.vue'; //基本信息
    import Admin from './components/settings/Admin.vue'; //用户设置

import Login from './components/user/Login.vue';
import Register from './components/user/Register.vue'; 

export default new VueRouter ({
  routes:[
  {
    path:'/',
    component:Home,
    children:[
    {
      path:'',
      component:List
    },
    { //详情
      name:'detail',
      path:'/detail/:id',
      component:Detail
    },
    { //编辑
      name:'edit',
      path:'/edit/:id',
      component:Edit
    },
    { //发表
      path:'/topic/new',
      component:New
    },
    { //设置
      path:'/settings',
      component:Setting,
      children:[
      { //基本信息
        path:'/settings/profile',
        component:Profile
      },
      { //用户设置
        path:'/settings/admin',
        component:Admin
      }
      ]
    }
    ]
  },
  { //注册
    path:'/register',
    component:Register
  },
  {
    path:'/login',
    component:Login
  }
  ]
})
