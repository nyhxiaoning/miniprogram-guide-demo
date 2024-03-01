import Subscription from "./subscription";

class CustomSubsciption extends Subscription{
    pageId = null
    /* 更新标志，证明此页面发生过更新 */
    hasChange = false
    /* 自定义的订阅器，建立起 page 维度 */
    constructor(pageId){
        super()
        this.pageId = pageId
    }
    /* 设置状态证明是否更新过 */
    emitChange(status){
        this.hasChange = status
    }
}

export default CustomSubsciption