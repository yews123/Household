import { reqGoodsList,reqTrademarkList } from "@/api"
const state = {
    searchList: {},
    goodsList: [],
    trademarkList: [],
    total:''
}
const mutations = {
    GETGOODSLIST(state, goodsList) {
        state.goodsList = goodsList[0]
        state.total = goodsList[1]
        
    },
    GETTRADEMARKLIST(state, trademarkList) {
        state.trademarkList=trademarkList
    },
    // GETPAGINATION(state, total) {
    //     state.total=total
    // }

}
const actions = {
    //获取goodsList模块数据
    async getGoodsList({ commit }, params = {}) {
        console.log('goodsList',params)
        let result = await reqGoodsList(params)
        if (result.code == 200) {
            // console.log('total',result.total)
            commit('GETGOODSLIST',[result.data,result.total])
        }
    },
     //获取trademarkList模块数据
     async getTrademarkList({ commit }, params = {}) {
        
        let result = await reqTrademarkList(params)
        if (result.code == 200) {
            commit('GETTRADEMARKLIST',result.data)
        }
    },
     //获取分页器的数据总条数
    //  async getPagination({ commit }) {
        
    //     let result = await reqPagination()
    //     if (result.code == 200) {
    //         console.log(result.data)
    //         commit('GETPAGINATION',result.data)
    //     }
    // },
}
//计算属性
const getters = {
    //当前形参state是当前仓库的state,并非大仓库中的state
    //当网络很慢时，state中searchList的可能还未获得服务器数据，可能还是个空对象。state.searchList.goodsList值就为undefined.
    goodsList(state) {
        return state.goodsList||[]
    },
    trademarkList(state) {
        return state.trademarkList||[]
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}