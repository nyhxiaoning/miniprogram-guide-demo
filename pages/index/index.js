
// index.js

// 获取应用实例
// const app = getApp()



// function requestData(){
//   return new Promise(reslove=>{
//      reslove(list)
//   })
// }

// // function requestData (){
// //   return new Promise((resolve)=>{
// //     resolve({ moduleList:[] })
// //   })
// // }

// Page({
//   data:{
//     templateList:[],
//   },
//   async onLoad(){
//     console.log(this)
//     // /* 请求初始化参数 */
//     // const { moduleList } = await requestData()  
//     // /* 渲染分组，每五个模版分成一组 */
//     // const renderlist = this.group(moduleList,5)
//     // this.updateTemplateData(renderlist)
//   },
//   /* 将渲染模版进行分组 */
//   group(array, subGroupLength) {
//     let index = 0;
//     const newArray = [];
//     while (index < array.length) {
//       newArray.push(array.slice(index, (index += subGroupLength)));
//     }
//     return newArray;
//   },
//   /* 更新模版数据 */
//   updateTemplateData(array, index = 0) {
//     if (Array.isArray(array)) {
//       this.setData(
//         {
//           [`templateList[${index}]`]: array[index],
//         },
//         () => {
//           if (index + 1 < array.length) {
//             this.updateTemplateData(array, index + 1);
//           }
//         }
//       );
//     }
//   },
//   /* 清空购物车 */
//   clearShoppingCart(){
//     /* 隐藏弹窗 */
//     this.setData({
//       modelShow:false
//     })
//     setTimeout(()=>{
//       /* 改变 item 的购物车的数量 */
//       this.setData(()=>{
//         cartList:this.data.cartList.map(item=>{
//           item.count = 0
//           return item
//         })
//       })
//     },200)
//   },
// })

function requestData(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(1)
    },500)
  })
}
// content 
// Page({
//   data:{
//     hasResult:false
//   },
//   onReady(){
//     this.init()
//     /* 检测白屏率 */
//     this.observerContext()
//   },
//   observerContext(){
//      const observer = wx.createIntersectionObserver()
//      observer.relativeTo().observe('#content-loading',(res)=>{
//        console.log(res)
//      })
     
//   },
//   async init(){
//      await requestData()
//      this.setData({
//       hasResult:true
//      })
//   },
// })
// import say from '../../sub-pages/utils'

Page({
  data:{
    loading:true
  },
  onReady(){
     this.init()
    /* 检测白屏率 */
    this.observerContext()
    // console.log(111)
  },
  observerContext(){
     const observer = wx.createIntersectionObserver(this)
     observer.relativeTo().observe('#loaded',(res)=>{
       console.log(res)
     })
     
  },
  async init(){
     await requestData()
     this.setData({
      loading:false
     })
  },
  handleRouterGo(){
    wx.navigateTo({
      url: '/sub-pages/test/index',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // handleCallFun(){
  //   require('../../sub-pages/utils',(fun)=>{
  //     fun.default()
  //   })
  // }
})