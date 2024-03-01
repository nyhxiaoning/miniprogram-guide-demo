import Observer from './observer';
/**
  封装基础订阅器
 */
export default class Subscription {
  /* 观察者对象 */
  observers= new Set();
  /**
   * 订阅
   * @param cb       回调函数
   * @param selector  sle
   * @returns        取消订阅函数
   */
  subscribe(cb, selector) {
    if (typeof cb !== 'function' ) return console.warn('subscribe 的参数应该是一个 function 类型');
    const observer = new Observer(cb, selector);
    this.observers.add(observer);
    return () => {
      this.unSubscribe(cb);
    };
  }

  /**
   * 发布通知,更新每一个订阅者
   */
  publish(...arg) {
    console.log('observers 的数量==========>', this.observers.size);
    this.observers.forEach((item) => {
      item.next(...arg);
    });
  }
}