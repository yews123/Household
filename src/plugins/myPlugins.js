//vue插件对外暴露的是一个对象
let myPlugins = {};
myPlugins.install = function (Vue,options) {
    //自定义全局指令
    Vue.directive(options.name, (element,params) => { 
        element.innerHTML = params.value.toUpperCase();
    });
}

export default myPlugins;