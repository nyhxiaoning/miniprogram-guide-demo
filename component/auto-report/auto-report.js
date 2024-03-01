

/* 上报管理类 */
class AutoReport{
    constructor(pageId){
        this.pageId = pageId 
        /* ...初始化参数 */
    }
    /* 处理 pv 上报 */
    pv(){}
    /* 处理点击上报 */
    click(params){
        console.log('###发生点击事件',params);
        wx.showToast({
            title:'###发生点击事件',
            icon:'none'
        })
        /* ... */
    }
    /* 处理曝光上报 */
    show(params){
        console.log('###发生曝光事件',params);
        wx.showToast({
            title:'###发生曝光事件',
            icon:'none'
        })
        /* ... */
    }
}
export default AutoReport