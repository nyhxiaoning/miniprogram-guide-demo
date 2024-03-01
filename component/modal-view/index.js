Component({
    options: {
      multipleSlots: true,
    },
    properties: {
      /* 当前的唯一的 modal key 必填 */
      modalID: {
        type: String, // 自动展示模式
        value: undefined,
      },
      /* 层级 */
      zIndex: {
        type: Number,
        value: 100,
      },
  
      /* 控制弹窗打开 */
      modalStatus: {
        type: Object,
        value: false,
        observer(res) {
          if (res) {
            /* 通过 modalStatus 来控制打开弹窗 */
            this.openAnimationModal();
          }
        },
      },
      /* 弹窗样式  */
      modalStyle: {
        type: String,
        value: '',
      },
      /* 是否现实关闭按钮 */
      showClose: {
        type: Boolean,
        value: false,
      },
      /* 是否支持点击蒙层关闭 */
      closeOnBackDropClick: {
        type: Boolean,
        value: true,
      },
      /* 内容背景颜色 */
      contentBackground: {
        type: String,
        value: '#fff',
      },
      /* 是否与圆角 */
      contentRadius: {
        type: String,
        value: '24rpx',
      },
    },
    lifetimes: {
      attached() {
        /* 注册当前弹窗 */
        this.triggerEvent('onCommonAction', {
          type: 'register',
          modalID: this.data.modalID,
          data: this,
        });
      },
      detached() {
        /* 卸载当前弹窗 */
        this.triggerEvent('onCommonAction', {
          type: 'unRegister',
          modalID: this.data.modalID,
          data: this,
        });
      },
    },
    methods: {
      /* 点击蒙层,关闭弹窗 */
      handleClickCloseModal() {
        const { closeOnBackDropClick } = this.data
        if (closeOnBackDropClick) {
          this.closeModal(false)
          this.triggerEvent('onClickCloseModal', {})
        }
      },
      /* 关闭弹窗 */
      closeModal() {
        this.closeAnimationModal()
      },
   
      openAnimationModal() {
        this.animate(
          '.ui-modal-backdrop',
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
              offset: 1,
            },
          ],
          200,
          function () {
            this.clearAnimation('.ui-modal-backdrop', { opacity: false }, function () {});
          }.bind(this)
        );
        this.animate(
          '.ui-modal',
          [
            { opacity: 0, translate:  [0, 1000] },
  
            {
              opacity: 1,
              translate: this.data.type ? [0, 0] : [0, 0],
              offset: 1,
            },
          ],
          200,
          function () {
            this.clearAnimation('.ui-modal-backdrop', { opacity: false, scale: true }, function () {});
          }.bind(this)
        );
      },
      closeAnimationModal() {
        this.animate(
          '.ui-modal-backdrop',
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
              offset: 1,
            },
          ],
          250,
          function () {}
        );
        this.animate(
          '.ui-modal',
          [
            { opacity: 1, translate: this.data.type ? [0, 0] : [0, 0] },
            {
              opacity: 0,
              translate: [0, 1000],
              offset: 1,
            },
          ],
          200,
          function () {
            this.triggerEvent('onClose', {});
            this.triggerEvent('onCommonAction', {
              type: 'close',
              modalID: this.data.modalID,
            });
          }.bind(this)
        );
      },
    },
  });