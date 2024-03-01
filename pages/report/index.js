import AutoReport from '../../component/auto-report/auto-report'

Page({
    data:{
        view:{
            click:{ clickid:1 },
            show:{ showid:1 }
        },
    },
    onLoad(){
        /* 页面层级创建埋点类 */
        this.autoReport = new AutoReport('123')
    },
    handleCleanCache(){
        const compoent = this.selectAllComponents('.auto-report')
        if(compoent[0]){
            compoent[0].cleanExposeCache()
        }
    },
    handleRouterGO(){
        wx.navigateTo({
            url:'/pages/home/index'
        })
    }
})