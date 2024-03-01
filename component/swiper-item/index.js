
const device = wx.getSystemInfoSync()

Component({
  relations: {
    '../swiper/index': {
      type: 'parent'
    }
  },
  properties:{
      width:{
          type:Number,
          value:device.windowWidth,
      },
  },
  methods: {
    /* 获取元素高度 */
    getContainerHeight() {
      let query = wx.createSelectorQuery().in(this);
      return new Promise((resolve) => {
        query.select('.swiper-holder').boundingClientRect((rect) => {
          if (rect) {
            let height = rect.height;
            if (this.data.autoAdapt) resolve(0);
            resolve(height);
          } else {
            resolve(0);
          }
        }).exec();
      });
    }
  }

});