<template>
   <header class="header">
        <div class="top">
            <div class="container">
            <div class="loginList">
                <p><router-link to="/home">家电网欢迎您！</router-link></p>
                <!-- 没有登录：显示登录与注册 -->
                <p v-if="!userName">
                    <span>请</span>
                    <!-- <a href="###">登录</a> -->
                    <!-- 
                        声明式导航,当然你也可以使用编程式导航,因为不管是那个导航，都可以实现路由跳转，
                        但是最后为什么选择声明式导航，没有任何业务、逻辑
                    -->
                    <router-link to="/login">登录</router-link>
                    <router-link to="/register" class="register">注册</router-link>
                </p>
                <!-- 如果登录显示的是用户名字与退出登录 -->
                <p v-else>
                    <a>{{userName}}</a>
                    <a class="register" @click="logout">退出登录</a>
                </p>
                <p>中山</p>
            </div>
            <div class="typeList">
                <router-link to="/center/myOrder">我的订单</router-link>
                <router-link to="/shopcart">我的购物车</router-link>
                <a href="###">客户服务</a>
                <a href="###">加入会员</a>
                <a href="###">企业采购</a>
                <a href="###">关注家电网</a>
                <a href="###">合作招商</a>
                <a href="###">商家后台</a>
            </div>
        </div>
      </div>
   </header>
</template>

<script>
export default {
    name:'Shortcut',
    methods: {
        //退出登录
    async logout(){
      //退出登录需要做的事情
      //1.需要发请求，通知服务器退出登录（清除一些数据：token）
      //2.清除项目当中的数据(userInfo,token)
     try {
      await this.$store.dispatch('userLogout')
      //回到首页
      this.$router.push('/home')
     } catch (error) {
      alert(error.message)
     }
    }

  },
  computed:{
    //用户名信息
    userName(){
      return this.$store.state.user.userInfo
    }
  }
}    

</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
