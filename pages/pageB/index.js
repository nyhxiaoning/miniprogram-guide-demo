// import customPage from '../../event-data-center/container'

// customPage({
//     onLoad(){
//         console.log('onLoad 执行=====>')
//     },
//     routerGoPageA(){
//         wx.navigateTo({
//             url:'/pages/pageA/index'
//         })
//     },
// },'page-B')

async function requestData(){}

Page({
    onLoad(){
        /* 初始化是时间,这个可以当作初始化时间 */
        this.startTime = new Date().getTime()
        this.init()
    },
    async init(){
        /* 向服务端请求数据 */
        const data = await requestData()
        /* 渲染数据 */
        this.setData({
            data
        },()=>{
            this.endTime = new Date().getTime()
            /* 秒开时间 */
            const time = this.endTime - this.startTime
            console.log(time)
        })
    },
})