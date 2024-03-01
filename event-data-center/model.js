
/* 数据中心 */
class Model{
    state = {}
    /* 设置数据 */
    setModelData(object){
        Object.assign(this.state,object)
    }
    /* 获取数据 */
    getModelData(name){
        return this.state[name]
    }
    /* 清空数据 */
    cleanModelData(){
        this.state = {}
    }
}

export default Model