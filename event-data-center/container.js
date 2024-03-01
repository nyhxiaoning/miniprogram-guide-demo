import { 
    createEventDataCenter,
    destroySubscription,
    activeSubscription,
    unActiveSubscription 
} from './event-data-center.js'
/**
 * 自定义小程序页面构造器
 * @param options  页面配置项 
 * @param pageID 小程序页面 ID 
 * @param originPage 其他自定义页面构造器或者原始的构造器
 */
export default function customPage(options,pageID,originPage = Page){
    originPage({
        ...options,
        onLoad(...arg){
            /* 比如有多个相同的页面，这样可以生成唯一的页面 id */
            this._pageId = createEventDataCenter(pageID)
            options.onLoad?.apply(this,arg)
        },
        /* 组件卸载 */
        onUnload(){
            destroySubscription(this._pageId) 
            options.onUnload?.apply(this)
        },
        /* 页面隐藏 */
        onHide(){
            unActiveSubscription()
            options.onHide?.apply(this)
        },
        /* 页面显示 */
        onShow(){
            activeSubscription(this._pageId)
            options.onShow?.apply(this)
        }
    })
}