import AutoReport from './auto-report'


Component({
  /**
   * 属性列表
   */
  properties: {
    /* 需要曝光埋点数据 */  
    show:{
        type:Object,
        value:null
    },
    /* 需要点击的埋点数据 */
    click:{
        type:Object,
        value:null,
    },
    /* 埋点容器样式 */
    viewStyle:{
        type:String,
        value:''
    },

  },
  lifetimes: {
    attached(){
      /* 获取埋点 */
      const pages = getCurrentPages()
      const currentPage = pages[pages.length-1]
      console.log(this)
      this.autoReport = currentPage && currentPage.autoReport ? currentPage.autoReport : new AutoReport(this.getPageId())
    },
    ready() {
      try {
        /* 初始化上报 */  
        this._showReport()
      } catch (error) {
        /* 处理异常情况 */  
        console.error(error)
      }
    },
    detached() {
      if (this._observer) {
        this._observer.disconnect()
      }
    },
  },
  pageLifetimes: {
    show() {
      this._showReport()
    },
    hide() {
      if (this._observer) {
        this._observer.disconnect();
      }
    },
  },
  methods: {
    /* 是否上报曝光 */
    _showReport(){
        this.validExpose = true
        this._observer = this.createIntersectionObserver([0])
        this._observeView()
    },  
    /* 判断元素在可视区域内，如果在那么进行上报 */  
    _observeView() {
      const { rootTag  } = this.data
      /* 判断元素是否在可视 */
      const _ob = rootTag
        ? this._observer.relativeTo(rootTag)
        : this._observer.relativeToViewport()
      _ob.observe('.reportView', (res) => {
        if (res.intersectionRatio > 0) {
          /* 上报曝光埋点 */  
          this._exposeReport()
        }
      })
    },
    /* 上报曝光事件 */
    _exposeReport() {
      const { show } = this.data
      if (this.autoReport && show && this.validExpose) {
        this.autoReport.show(show)
        this.validExpose = false
      }
    },
    /* 处理点击事件 */
    handleClick() {
       this.reportClick()
    },
    /* 处理手动点击上报 */
    reportClick(){
      const { click } = this.data
      if (this.autoReport && click) {
        this.autoReport.click(click)
      }
    },
    /* 处理手动曝光上报 */
    reportShow(){
      const { show } = this.data
      if (this.autoReport && show) {
        this.autoReport.show(show)
      }
    },
    /* 清除曝光状态 */
    cleanExposeCache(){
      this.validExpose = true
    },
  },
});