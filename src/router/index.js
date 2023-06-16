//配置路由的地方
import Vue from "vue";
import routes from "./routes"
// 引入插件
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)
//引入store
import store from '@/store'

//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}


let router=new VueRouter(
    {
        // 配置路由
        routes,
        //滚动行为
        scrollBehavior(to, from, savedPosition) {
            // 始终滚动到顶部
            return { y: 0 }
          },
    }
)
//全局前置守卫
router.beforeEach(async(to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
      //用户已经登录了还想去login（不能去，回到首页）
        if (to.path == '/login'||to.path=='/register') {
            next('/home')
           
        } else {
        //登录了，但是去的不是login而是(home|search|detail|shopcart)
        //如果用户名已有 
            if (name) {
                next()
                
            } else {
                //登录了且没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                  //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    //放行
                    next()
                    
                } catch (error) {
                    //token失效了获取不到用户信息，重新登录
                    //清除token
                    await store.dispatch('userLogout')
                    next('login')
                }
            }   
      } 
    } else {
    //用户未登录:不能去交易相关的、不能去支付相关(pay|paysuccess)、不能去个人中心
        let toPath = to.path;
        console.log('to',toPath)
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候想去而没有去成的信息，存储于地址栏中（路由）
            next('/login?redirect='+toPath);
        } else {
            //去的不是上面这些路由====放行
            next();
        }
    
        
    }
})

export default router;