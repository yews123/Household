import { reqGoodsInfo,reqAddOrUpdateShopCart,reqSkuInfo, reqskuImageList } from "@/api"

//商品详请模块
//封装游客身份模块uuid
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodInfo:{},
    skuInfo: [],
    skuImageList:[],
    //游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    // GETGOODSINFO(state, goodInfo) {
    //     state.goodInfo=goodInfo
    // },
    GETSKUINFO(state, skuInfo) {
        state.skuInfo=skuInfo
    },
    GETSKUIMAGELIST(state, skuImageList) {
        state.skuImageList=skuImageList
    }

}
const actions = {
    //获取产品信息的action
    // async getGoodsInfo({commit},skuid) {
    //    let result = await reqGoodsInfo(skuid)
    //     if (result.code == 200) {
    //         commit('GETGOODSINFO',result.data)
    //     }  
    // },
    async getSkuInfo({commit},skuid) {
        let result = await reqSkuInfo(skuid)
        if (result.code == 200) {
             commit('GETSKUINFO',result.data)
         }  
     },
     async getSkuImageList({commit},skuid) {
        let result = await reqskuImageList(skuid)
        if (result.code == 200) {
             console.log('image',result.data)
             commit('GETSKUIMAGELIST',result.data)
         }  
     },
    

    //将产品信息添加到购物车中或者更新购物车产品的数量
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回的结果
        //注意：async函数执行返回的结果一定是一个promise(要么成功要么失败)
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        //代表服务器加入购物车成功
        if (result.code == 200) {
            return "success"
        } else {
            //代表加入购物车失败
            return Promise.reject(new Error("faile"))
        }
    }
}
//简化数据
const getters = {
    categoryView(state) {
        //比如：state.goodInfo初始状态是空对象，空对象的categoryView属性值是undefined
        //当前计算出的categoryView属性值不能时undefined
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state) {
        return state.skuInfo||[]
    },
    skuImageList(state) {
        return state.skuImageList||[]
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}