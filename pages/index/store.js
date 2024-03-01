

class GlobalStore {
    state = new Map()
    /* 设置全局状态 */
    setGlobalState(key,value){
        /* 如果是 key 是对象，那么保存 key 中的健值对 */
        if(typeof key === 'object' && key ){
             Object.keys(key).forEach(item=>{
                 this.state.set(item,key[item])
             })
        }else{
            /* 否则直接储存 key value */
            this.state.set(key,value)
        }
    }
    /* 获取全局状态 */
    getGlobalState(key){
        return this.state.get(key)
    }
    /* 清空全局状态 */
    clearGlobalState(){
        this.state.clear()
    }
}