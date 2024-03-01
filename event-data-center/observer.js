export default class Observer {
    /* 更新函数 */
    callback = null;
    /* 配置项 */
    selector = null;
    constructor(cb, selector) {
      this.callback = cb;
      this.selector = selector;
    }
    next(...arg) {
      let update = true
      if(typeof this.selector === 'function'){
         /* 决定是否发生更新 */
         update = this.selector()
      }
      this.callback && update && this.callback(...arg);
    }
}