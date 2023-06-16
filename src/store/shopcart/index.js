import { reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api"

//购物车模块仓库
const state = {
    cartInfoList:[]
}
const mutations = {
    GETCARTLIST(state, cartInfoList) {
        state.cartInfoList=cartInfoList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, id) {
        let result = await reqDeleteCartById(id)
        if (result.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车中某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
       
        let result = await reqUpdateCheckedById(skuId, isChecked);
        
        if (result.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除购物车中所有选中状态的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        //获取购物车中全部的产品（是一个数组）
        let PromiseAll = []
        getters.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.id) : ''
            //将每一次返回的Promise对象添加到数组当中
            PromiseAll.push(promise)
        })
        //只有全部的promise都成功，返回的结果即为成功
        //如果有一个失败，返回的即为失败的结果
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartInfoList.forEach(item => {
            console.log(isChecked)
            let promise = dispatch('updateCheckedById', { skuId: item.id, isChecked })
            //将每一次返回的Promise对象添加到数组当中
            PromiseAll.push(promise)
        })
        //只有全部的promise都成功，返回的结果即为成功
        //如果有一个失败，返回的即为失败的结果
        return Promise.all(PromiseAll)
    },
   
}
const getters = {
    cartInfoList(state) {
        return state.cartInfoList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}