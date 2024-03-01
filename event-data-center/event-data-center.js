import CustomSubsciption from './custom-subscription'
import Model from './model'
let dataCenter = null
/* 数据通信中心 */
class EventDataCenter {
    /* 页面索引 */
    pageIndex = 0
    /* 数据 */
    model = null
    /* 监听器 */
    subscriptions = new Map()
    /* 当前激活的 subscription 对应的 pageId */
    activePageId = null
    /* 当前激活的订阅器 */
    currentSubscription = null

    constructor(){
        /* 创建数据中心 */
        this.model = new Model()
    }

    /* 初始化订阅器 */
    initSubscription(originPageId){
        /* 构建唯一的页面 id */
       this.pageIndex++
       const currentPageId = `${originPageId}-${this.pageIndex}`
       /* 创建一个订阅器 */
       const subscription = new CustomSubsciption(originPageId)
       /* 设置当前激活的订阅器 */
       this.changeActivePageId(originPageId)
       this.currentSubscription = subscription
       this.subscriptions.set(currentPageId,subscription)
       return currentPageId
    }
    /* 设置激活的 page id */
    changeActivePageId(pageId){
       this.activePageId = pageId
       if(pageId){
           /* 当页面切换的时候，设置当前激活的订阅器 */
           this.currentSubscription = this.subscriptions.get(pageId)
       }else{
           this.currentSubscription = null
       }
    }
    /* 改变所有订阅器的状态 */
    changeSubscriptionStatus(){
      this.subscriptions.forEach(subscription=>{
          subscription.emitChange(true)
      })
    }
    /* 执行更新 */
    notifyActiveSubscription(...arg){
        const currentSubscription = this.currentSubscription
        /* 如果订阅器存在，并且触发过更新 */
        if(currentSubscription && currentSubscription.hasChange ){
            currentSubscription.publish(...arg)
            /* 更新状态 */
            currentSubscription.emitChange(false)
        }
    }
    /* 暴露的更新方法 */
    dispatchAction(payload,...arg){
        this.model.setModelData(payload)
        /* 先改变订阅器的状态 */
        this.changeSubscriptionStatus()
        this.notifyActiveSubscription(...arg)
    }
}

/**
 * 启动当前订阅器
 * @param pageId 
 */
export function activeSubscription(activePageId){
    if(dataCenter){
        dataCenter.changeActivePageId(activePageId)
        /* 如果有没有更新的任务，那么会触发更新 */
        dataCenter.notifyActiveSubscription()
    }
}

/**
 * 取消当前的订阅器
 */
export function unActiveSubscription(){
    dataCenter && dataCenter.changeActivePageId(null)    
}

/* 销毁当前的订阅器 */
export function destroySubscription(pageID){
    if(dataCenter){
        dataCenter.subscriptions.delete(pageID)
    }
}

/**
 * 创建事件通信中心
 * @returns 
 */
export function createEventDataCenter(){
    if(!dataCenter){
        dataCenter = new EventDataCenter()
    }
    const currentPageId = dataCenter.initSubscription()
    return currentPageId
}

/* 触发更新事件 */
export function dispatch(...arg){
    dataCenter && dataCenter.dispatchAction(...arg)
}

/* 获取状态 */
export function getModelData(key){
    let value = null
    if(dataCenter) value = dataCenter.model.getModelData(key)
    return value
}

export function subscribe(cb,selector){
    if(dataCenter && dataCenter.currentSubscription){
        dataCenter.currentSubscription.subscribe(cb,selector)
    }
}