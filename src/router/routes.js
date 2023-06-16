// 引入一级路由组件
// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path:"/center",
        component: Center,
        meta: {
            showFooter: true,
            showHeader:false
        },
        children: [
            {
                path: "myorder",
                component:MyOrder
            },
            {
                path: "grouporder",
                component:GroupOrder
            },
            //重定向
            {
                path: "/center",
                redirect:"/center/myorder"
            }
        ]
    },
    {
        path:"/paysuccess",
        component: PaySuccess,
        meta: {
            showFooter: true,
            showHeader:false
        }
    },
    {
        path:"/pay",
        component: Pay,
        meta: {
            showFooter: true,
            showHeader:false
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path:"/trade",
        component: Trade,
        meta: {
            showFooter: true,
            showHeader:false
        },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path:"/shopcart",
        component: ShopCart,
        meta: {
            showFooter: true,
            showHeader:true
        }
    },
    {
        path:"/addcartsuccess",
        component: AddCartSuccess,
        name:"addcartsucces",
        meta: {
            showFooter: true,
            showHeader:true
        }
    },
    {
        path:"/detail/:skuId?",
        component:Detail,
        meta: {
            showFooter: true,
            showHeader:false
        }
    },
    {
      path:"/home",
      component:() => import('@/pages/Home'),//路由懒加载
        meta: {
            showFooter: true,
            showHeader:true
        }
    },
    {
        path:"/login",
        component:Login,
        meta: {
            showFooter: false,
            showHeader:false
        }
    },
    {
        path:"/register",
        component:Register,
        meta: {
            showFooter: false,
            showHeader:false
        }
    },
    {
        path:"/search/:keyword?",//?代表可以传参也可不传参
        component:Search,
        meta: {
            showFooter: true,
            showHeader:true
        },
        name: "search",
        //路由组件可以传递props数据(很少用).组件要用props接收
        //1.布尔值写法:只能params参数
        //props:true
        //2.对象写法：额外的给路由组件传递一些数据
        //props:{a:1,b:2}
        //3.函数写法：可以params参数，query参数，通过props传递给路由组件
        // props: ($route) => {
        //     return {keyword:$route.params.keyword,k:$route.query.k}
        // }

        
    },
    //重定向
    {
        path:"/",
        redirect:"/home"
    }
]