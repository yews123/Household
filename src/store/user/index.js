//登录注册仓库模块
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
    //验证码
    code: '',
    //令牌
    token: localStorage.getItem('token'),
    //用户的信息
    userInfo:''
}
const mutations = {
    GETCODE(state, code) {
        state.code=code
    },
    USERLOGIN(state, token) {
        state.token=token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo=userInfo
    },
    //清除本地数据
    CLEAR(state) {
        //把仓库中相关的用户信息清空
        state.token = '';
        state.userInfo = '';
        //本地存储数据清空
        localStorage.removeItem('token');
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            console.log(result.data)
            return 'success';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户登录(token)
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        if (result.code == 200) {
            console.log('登录',result)
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            localStorage.setItem('token',result.data.token)
            //本地存储用户的手机号
            localStorage.setItem('phone',user.phone)
            return 'success';
        } else {
            return Promise.reject(new Error('用户账号或者密码不正确!                请重新输入账号或者密码'));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        //取本地存储的手机号
        let phone=localStorage.getItem('phone')
        let result = await reqUserInfo(phone);
        if (result.code == 200) {
            // console.log(result)
            commit('GETUSERINFO', result.data)
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout();
        if (result.code == 200) {
            //action里面不能操作state,提交mutation修改state
            commit('CLEAR');
            return 'success';
        }
        else {
            return Promise.reject(new Error('faile'));
        }
    },
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
