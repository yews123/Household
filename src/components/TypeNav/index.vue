<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部产品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 事件委派 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                <h3 @mouseenter="changeIndex(index)" >
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix">
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId" >
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">聚优惠</a>
        <a href="###">电器城</a>
        <a href="###">家用电器超市</a>
        <a href="###">同城购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
     
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
//从lodash下的throttle（节流）函数
import throttle from 'lodash/throttle';
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex:-1,
      show:true,
    }
  },
  mounted(){
    if(this.$route.path!='/home'){
      this.show=false;
    }
  },
  computed:{
    ...mapState({
      //右侧可以是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList:state=>state.home.categoryList
    })
  },
  methods:{
    //鼠标进入修改响应式数据currentIndex
    //节流函数throttle()
    changeIndex:throttle(function(index){
      //index:鼠标移上某一个一级分类的索引值
      this.currentIndex=index
    },50),
    
    //点击三级联动的列表时会跳转到Search组件上并且携带着参数
    goSearch(event){
      //编程式导航+事件委派
      //把子节点当中的a标签加上自定义属性data-categoryName,其余的子节点是没有的


      //获取当前触发这个事件的节点【h3、a、dt、dl】,需要带有data-categoryname这样的节点【一定是a标签】
      let element=event.target;
      //节点有一个dataset属性，可以获取节点的自定义属性值
      console.log(element.dataset)
      let {categoryname,category1id,category2id,category3id}=element.dataset;
      //如果标签身上有categoryname一定是a标签
      if(categoryname){
        //整理路由跳转的参数
        let location={name:"search"};
        let query={categoryName:categoryname}
        //一级分类、二级分类、三级分类的a标签
        if(category1id){
          query.category1Id=category1id
         
        }else if(category2id){
          query.category2Id=category2id
        }else{
          query.category3Id=category3id
        }
        //整理完参数
        console.log(location,query)
        //判断：如果进行路由跳转的时候，带有params参数，也要传递过去
        if(this.$route.params){
          location.params=this.$route.params
          //动态给location配置对象添加query属性
          location.query=query
          //路由跳转
          this.$router.push(location)
        }
        
      }

    },
    enterShow(){
      this.show=true
    },
    //当鼠标离开的时候，让商品分类列表进行隐藏
    leaveShow(){
      //一级分类鼠标移出的事件回调
      this.currentIndex=-1
      //判断如果是Search路由组件的时候才会执行
      if(this.$route.path!="/home")
        this.show=false
    }

  }
}
</script>

<style  lang="less" scoped>
.type-nav {
  margin-top: 20px;
  // border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

         
        }
        .cur{
          background: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态
    .sort-enter{
      height: 0px;
    }
    //过渡动画结束状态
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active{
      transition:all .5s linear;
    }
  }
}
</style>
