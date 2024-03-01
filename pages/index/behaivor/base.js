
const systomInfo = wx.getSystemInfoSync()
const BaseComponent = Behavior({
    lifetimes:{
        attached(){
            /* 初始化做的事情 */
            console.log('mixin:attached')
        },
        ready(){
            /* 页面初始化完成，可以获取对应的元素信息 */
            console.log('mixin:ready')
        }
    },
    data:{
        screenHeight:systomInfo.screenHeight,

    },
    methods:{
        /* 处理跳转 */
        navigatorTo(){},
        handleEvent(){
            console.log('《React 开发指南》')
        }
    }
})
export default BaseComponent