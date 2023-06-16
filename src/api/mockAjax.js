//对于axios进行二次封装
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"
//1.利用axios对象的方法create创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests=axios.create({
    baseURL:'/mock',
    timeout:5000
})
//请求拦截器: 在发请求前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    nProgress.start()
    return config;

})
//响应拦截器
requests.interceptors.response.use((res) => {
    nProgress.done()
    // 成功的回调函数：服务器响应数据回来后，响应拦截器可以检测到，可以做一些事情
    return res.data;
},(error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})


//对外暴露
export default requests
