import Mock from 'mockjs'//注意Mork是大写的
import banner from './banner.json'
import floor from './floor.json'//json文件和图片资源不需要暴露直接引入就行

//mock方法：第一个参数请求地址   第二个参数请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })//模拟首页轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})