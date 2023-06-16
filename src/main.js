import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入vuex的管理者
import store from '@/store'


//引入element-ui(按需引入)
import { Button,MessageBox } from 'element-ui';
//注册全局组件
Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;



//全局组件
import TypeNav from '@/components/TypeNav'//导航栏
import Carousel from '@/components/Carousel'//轮播图
import Pagination from '@/components/Pagination'//分页器
//第一个参数：全局组件的名字  第二个参数：哪一个组件(注册)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)




//mockServer.js----mock数据
import '@/mock/mockServer'
//引入swiper样式
import "swiper/css/swiper.css"//css,js直接引入即可
Vue.config.productionTip = false
//统一接口api文件夹里面的全部请求函数
//统一引入
import * as API from '@/api';




//引入图片懒加载插件
import VueLazyload from 'vue-lazyload';
//引入懒加载图片
import atm from '@/assets/1.gif';
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: atm,
})


//引入自定义插件
import myPlugins from './plugins/myPlugins';
//注册插件
Vue.use(myPlugins, {
  name:'upper'
})


//引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API=API
  },
  // 注册路由：底下的写法KV一致省略V（router）小写的
  router,
  store
}).$mount('#app')
