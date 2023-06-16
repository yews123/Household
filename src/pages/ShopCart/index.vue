<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in  cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.defaultImg">
            <div class="item-msg">{{cart.title}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{cart.price}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.price*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckAll&&cartInfoList.length>0" @click="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） :{{totalPrice}}</em>
          <i class="summoney"></i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" @click="goTrade">结算</a> -->
          <router-link class="sum-btn" :to="path">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
//从lodash下的throttle（节流）函数
import throttle from 'lodash/throttle';
import { getToken } from '@/utils/token';
  export default {
    name: 'ShopCart',
    //组件挂载完毕,获取购物车的数据
    mounted(){
      //获取购物车的数据
      this.getData()
    },
    methods:{
      getData(){
        //通知vuex发请求，获取数据，存储于仓库中
        this.$store.dispatch('getCartList')
      },
      goTrade(){
        //进行路由跳转到trade中
        this.$router.push('/trade')
      },
      //修改产品的个数
      //进行了节流操作
      handler:throttle(async function(type,disNum,cart){
        //type:为了区分这3个元素
        //cart:哪一个产品（身上有id）
        switch(type){
          case "add":
            cart.skuNum++;
            break;
          case "minus":
            //判断产品的个数大于1，才可以传递给服务器cart.skuNum--
            //如果出现产品的个数小于等于1，传递给服务器数字cart.skuNum（原封不动）
            cart.skuNum--;
            break;
          case "change":
            //用户输入进来的最终量，如果是非法的(带有汉字|出现负数)，带给服务器数字cart.skuNum
            if(isNaN(disNum)||disNum<1){
              disNum=cart.skuNum;
            }else{
              //属于正常情况(小数取整)，带给服务器变化的量  用户输入进来的-产品的起始值
              cart.skuNum=parseInt(disNum);
            }
            break;    
        }
        //派发action
        try {
          //代表修改成功
          await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.id,skuNum:cart.skuNum})
          //再次发请求获得最新的数据
          this.getData()
        } catch (error) {
          
        }
      },1000),
      //删除某一个产品的操作
      async deleteCartById(cart){
        try {
          await this.$store.dispatch('deleteCartListBySkuId',cart.id)
          //再次发起请求获取购物车列表数据
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      //修改某个产品的勾选状态
      async updateChecked(cart,event){
       try {
        // this.$store.dispatch('updateTradeOrder',cart.isChecked)
         //带给服务器的参数isChecked,不是布尔值，应该是0|1(一定要为数字型的，字符串的会出现bug)
        console.log(typeof(event.target.checked))
        let isChecked=event.target.checked?1:0
        console.log('isChecked',isChecked)
        await this.$store.dispatch('updateCheckedById',{skuId:cart.id,isChecked})
        //如果修改数据成功，再次获取服务器数据（购物车）
        this.getData()
       } catch (error) {
        alert(error.message)
       }
      },
      //删除全部选中的产品
      async deleteAllCheckedCart(){
        try {
        //派发一个action
        await this.$store.dispatch('deleteAllCheckedCart')
        //再次发起请求,获得购物车列表数据
        this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      //修改全部产品的选中状态
      async updateAllCartChecked(event){
        try {
          let isChecked=event.target.checked?"1":"0"
        //派发一个action
        await this.$store.dispatch("updateAllCartIsChecked",isChecked)
        //再次发起请求,获得购物车列表数据
        this.getData()
        } catch (error) {
          alert(error.message)
        }
      }
    },
    computed:{
      ...mapGetters(['cartInfoList']),
      path(){
        const token=localStorage.getItem('token')
        console.log(token)
        return token ?'/trade':'/login?redirect=shopcart'
      },
      //购物车数据
      // cartInfoList(){
      //   return this.cartList.cartInfoList||[]
      // },
      //计算购买产品的总价
      totalNum(){
        let sum=0;
        this.cartInfoList.forEach(item=>{
          if(item.isChecked==1){
            sum++;
          }
        })
      return sum;
      },
      totalPrice(){
        let sum=0
        this.cartInfoList.forEach(item => {
          if(item.isChecked==1){
            sum+=item.skuNum*item.price
          }
          
        });
        return sum
      },
      //底部复选框是否勾选（全部产品都选中才购选）
      isCheckAll(){
        //every遍历数组里面的元素，只有全部元素的isChecked属性都为1=====》真
        //只要有一个不是1====》假
         return this.cartInfoList.every(item=>item.isChecked==1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

       

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>