//这个模块进行接口(api)的统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax"

export const reqGetBannerList = () => mockRequests.get('/banner')//获取轮播图数据并且对外暴露
//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')


//获取产品数据
export const reqCategoryList=() => {
    //发请求：axios发请求返回结果Promise对象
    return requests({ url: '/product', method: 'get' })
    //切记：当前函数执行需要把服务器返回结果返回
}

//获取验证码
export const reqGetCode = (phone) => requests({ url: `/code/${phone}`, method: 'get' })

//注册
export const reqUserRegister = (data) => requests({ url: '/register', data, method: 'post' })

//登录
export const reqUserLogin = (data) => requests({ url: '/login', data, method: 'post' })

//获取用户信息（需要带着用户的token向服务器要用户信息）
export const reqUserInfo = (phone) => requests({ url: `/getUserInfo/${phone}`, method: 'get' })

//退出登录
export const reqLogout = () => requests({ url: '/logout', method: 'get' })



//search页面模块
//goodsList接口(获取商品模块)
export const reqGoodsList=(params) => requests({ url: "/goodsList", method: "post", data: params })
//trademarkList接口
export const reqTrademarkList=(params) => requests({ url: "/trademarkList", method: "post", data: params })
//attrsList接口
export const reqAttrsList=(params) => requests({ url: "/attrsList", method: "post", data: params })//没有使用
//pagination接口
// export const reqPagination=(params) => requests({ url: "/pagination", method: "get" })



//detail页面模块
//skuInfo接口
export const reqSkuInfo = (skuId) => requests({ url: `/skuInfo/${skuId}`, method: "get" })
//skuImageList接口
export const reqskuImageList = (skuId) => requests({ url: `/skuImageList/${skuId}`, method: "get" })
//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/addOrUpdateShopCart/${skuId}/${skuNum}`, method: 'post' })



//购物车模块
//获取购物车数据
export const reqCartList = () => requests({ url: "/cartList", method: "get" })
//删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/deleteCart/${skuId}`, method: 'post' })
//修改商品中选中的状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/checkCart/${skuId}/${isChecked}`, method: 'get' })



//获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/userAddress', method: 'get' })

//获取商品清单
export const reqOrderInfo = () => requests({ url: '/order', method: 'get' })


//提交订单
export const reqSubmitOrder = (data) => requests({ url: '/submitOrder', data,method: 'post' })

//获取支付信息(未使用)
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付订单状态(未使用)
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取个人中心数据
export const reqMyOrderList = (page,limit) => requests({ url: `/myorder/${page}/${limit}`, method: 'get' })