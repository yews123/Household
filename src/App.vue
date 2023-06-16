<template>
  <div>
    <Shortcut></Shortcut>
    <Header v-show="$route.meta.showHeader"></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Shortcut from './components/Shortcut'
export default {
  name:'App',
  components:{
    Header,
    Footer,
    Shortcut
  },
  //组件挂载完毕，向服务器发请求
  mounted(){
    //通知Vuex发起请求，获取数据，存储于仓库当中
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>

</style>