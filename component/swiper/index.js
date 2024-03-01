import Swiper from './swiper';

Component({
  relations: {
    '../swiper-item/index': {
      type: 'child',
      linked() {
      }
    }
  },
  properties: {
    /* 是否可滑动 */
    slidable: {
      type: Boolean,
      value: true
    },
    /* 初始值 */
    initialSlide: {
      type: Number,
      value: 0,
    }
  },
  methods: {
    /* 初始化 swiper */
    _initSwiper() {
      const { autoplay, initialSlide } = this.data;
      /* 传入配置文件和组件 this 实例 */
      const _this = this;
      this.swiper = new Swiper({
        slideLength: this._getGroupItems().length,
        animationViewName: 'animationData',
        initialSlide,
        autoplay,
        onSlideChangeEnd(e, isCurrentChange) {
          const { activeIndex } = e;
          if (_this.init && !isCurrentChange) {
            _this.triggerEvent('change', { current: activeIndex }, e);
          }
          _this.init = true;
        }
      }, this);
      this.setSwiperHeight(this.data.current);
    },
    /* 监听开始移动 */
    handleTouchstart(e) {
      if (!this.data.slidable) return;
      this.swiper.touchstart(e);
    },
    /* 监听移动中 */
    handleTouchmove(e) {
      if (!this.data.slidable) return;
      this.swiper.touchmove(e);
    },
    /* 监听移动完成 */
    handleTouchend(e) {
      if (!this.data.slidable) return;
      this.swiper.touchend(e);
    },
    /**
     * 跳转制定滑块
     * @param {*} index 第几个滑块
     * @param {*} height 滑块高度，当为 0 或者 没有的时候，自动填充。
     */
    slideTo(index) {
        this.swiper && this.swiper.slideTo(index, true);
    },
    /* 滑动到指定位置设置高度 */
    setSwiperHeight(index, cb) {
      const { slideLength } = this.data;
      const children = this._getGroupItems();
      if (index >= 0 && index <= (slideLength || children.length) - 1) {
        /* 自适应宽高 */
        const pfn = children[index].getContainerHeight;
        typeof pfn === 'function' && pfn.call(children[index]).then((res) => {
        cb && cb(res);
          this._switchStyle(res);
        });
      }
    },
    /* 切换样式 */
    _switchStyle(height) {
      const { style } = this.data;
      if (height === style || (height && `height:${height}px` === style)) return;
      this.setData({
        style: height && typeof height === 'number' ? `height:${height}px` : 0
      });
    },
    /* 获取 item 数组 */
    _getGroupItems() {
      const children = this.getRelationNodes('../swiper-item/index');
      return children;
    },
  },
  data: {
    /* 水平或垂直方法滚动 */
    directionClass: '',
    /* 下发动作指令 */
    animationData: null,
    /* 容器样式 */
    style: '',
  },
  init: false,
  lifetimes: {
    ready() {
      /* 处理配置项 */
      this._initSwiper();
    }
  },
});