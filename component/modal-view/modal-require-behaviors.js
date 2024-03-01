/**
 * 自动管理弹窗展示/关闭，可选
 */
 const modalRequire = Behavior({
    data: {
      modalStatus: {},
     
    },
    lifetimes: {
      attached(){
        this._modalInstance = {}
      },
      detached() {
        this.animateTimer && clearTimeout(this.animateTimer);
      },
    },
    methods: {
      /* 打开弹窗 */
      showModalView(modalID) {
        if (this.isModalShow(modalID)) {
          return;
        }
        this.setData({
           [`modalStatus.${modalID}`]: true,
        });
      },
      /* 关闭弹窗 */
      closeModalView(modalID) {
        if (!this.isModalShow(modalID)) {
          return;
        }
        const ref = this._modalInstance[modalID];
        if (ref) {
          ref.closeModal(); // 让弹窗自己关闭，等待动画结束后会自动通过modalCommonAction设置关闭状态
        } else {
          this.setData({
            [`modalStatus.${modalID}`]: false,
          });
        }
      },
      /* 判断弹窗是否展示 */
      isModalShow(modalID) {
        return this.data.modalStatus[modalID];
      },
      /* 处理初始化注册流程 */
      handleModalCommonAction(e) {
        if (e.detail && e.detail.type === 'close') {
          this.setData({
            [`modalStatus.${e.detail.modalID}`]: false,
          });
        } else if (e.detail && e.detail.type === 'register') {
          this._modalInstance[e.detail.modalID] = e.detail.data;
        } else if (e.detail && e.detail.type === 'unRegister') {
          this._modalInstance[e.detail.modalID] = {};
        }
      },
    },
  });
  
  export default modalRequire;









