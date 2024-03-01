const ScrollViewIdSelector = '#__r-list-view-dom'
const ItemIdSelectorPrefix = '#__r-list-item-'
const ItemClassSelector = '.__r-list-item'
const ItemIdSelectorPrefixLength = 12

class RListContext {
  constructor(options) {
    this.domId = options.domId
    this.owner = options.owner
    this.batchDataKey = options.batchDataKey
    this.observerResult = []
    this.itemVisibilityObserver = null
  }

  scrollToIndex(index, options = {}) {
    const { offset = 0, animated } = options
    const RListComponent = this.owner.selectComponent(`#${this.domId}`)
    const { scrollX } = RListComponent.data
    const query = this.owner.createSelectorQuery().in(this.owner)

    query
      .select(`#${this.domId} >>> ${ItemIdSelectorPrefix}${index}`)
      .boundingClientRect()
      .select(`#${this.domId} >>> ${ScrollViewIdSelector}`)
      .fields({
        rect: true,
        node: true,
        scrollOffset: true,
        computedStyle: ['border-width']
      })
      .exec((res) => {
        if (!res[0]) {
          return
        }
        const scrollView = res[1].node
        const scrollOptions = {}
        // 滚动距离 = 目标 item 位置 - scrollview 容器位置 + scrollTop + offset
        const border = res[1]['border-width'].replace('px', '')
        if (scrollX) {
          scrollOptions.left =
            res[0].left - res[1].left - border + offset + res[1].scrollLeft
        } else {
          scrollOptions.top =
            res[0].top - res[1].top - border + offset + res[1].scrollTop
        }
        scrollView.scrollTo({ ...scrollOptions, animated })
      })
  }

  async queryVisibilityItemInView() {
    return new Promise((resolve) => {
      this.itemVisibilityObserver = this.owner.createIntersectionObserver({
        observeAll: true
      })
      this.itemVisibilityObserver
        .relativeTo(`#${this.domId}`)
        .observe(`#${this.domId} >>> ${ItemClassSelector}`, (res) => {
          this.observerResult.push(res)
          resolve(res)
        })
    })
  }

  clearObserverResult() {
    this.itemVisibilityObserver.disconnect()
    this.observerResult = []
    this.itemVisibilityObserver = null
  }

  async queryListItemVisibility(callback) {
    await this.queryVisibilityItemInView()
    const first = this.observerResult[0]
    const last = this.observerResult[this.observerResult.length - 1]
    this.clearObserverResult()
    callback({
      firstVisibleIndex: Number(first.id.slice(ItemIdSelectorPrefixLength)),
      firstVisibleOffset: first.boundingClientRect.top - first.relativeRect.top,
      lastVisibleIndex: Number(last.id.slice(ItemIdSelectorPrefixLength)),
      lastVisibleOffset: last.boundingClientRect.top - last.relativeRect.top
    })
  }

  animate(index, selector, keyframes, duration, callback) {
    this.owner.animate(
      `#${this.domId} >>> ${ItemIdSelectorPrefix}${index} >>> ${selector}`,
      keyframes,
      duration,
      callback
    )
  }

  clearAnimation(index, selector, options, callback) {
    if (arguments.length === 3 && typeof options === 'function') {
      callback = options
      options = null
    }
    this.owner.clearAnimation(
      `#${this.domId} >>> ${ItemIdSelectorPrefix}${index} >>> ${selector}`,
      options,
      callback
    )
  }

  createSelectorQuery() {
    const query = this.owner.createSelectorQuery()
    query.select = new Proxy(query.select, {
      apply: (target, ctx, [index, selector]) => {
        return target.apply(ctx, [
          `#${this.domId} >>> ${ItemIdSelectorPrefix}${index} >>> ${selector}`
        ])
      }
    })
    query.selectAll = new Proxy(query.selectAll, {
      apply: (target, ctx, [index, selector]) => {
        return target.apply(ctx, [
          `#${this.domId} >>> ${ItemIdSelectorPrefix}${index} >>> ${selector}`
        ])
      }
    })
    return query
  }

  getContextDataList() {
    const dataList = this.owner.data[this.batchDataKey] || []
    return dataList
  }

  append(data, callback) {
    const dataList = this.owner.data[this.batchDataKey]
    this.owner.setData(
      {
        [this.batchDataKey]: dataList?.concat(data)
      },
      callback
    )
  }

  splice(begin, deleteCount, ...args) {
    const dataList = this.owner.data[this.batchDataKey]
    const lastArg = args[args.length - 1]
    const callback = typeof lastArg === 'function' ? args.pop() : null
    dataList.splice(begin, deleteCount, ...args)
    this.owner.setData(
      {
        [this.batchDataKey]: dataList
      },
      callback
    )
  }

  update(...args) {
    const dataList = this.owner.data[this.batchDataKey]
    const firstArg = args[0]
    const lastArg = args[args.length - 1]
    const callback = typeof lastArg === 'function' ? args.pop() : null

    if (Array.isArray(firstArg)) {
      firstArg.forEach(([index, data]) => {
        dataList[index] = data
      })
    } else {
      dataList[firstArg] = args[1]
    }

    this.owner.setData(
      {
        [this.batchDataKey]: dataList
      },
      callback
    )
  }

  remove(...args) {
    let dataList = this.owner.data[this.batchDataKey]
    const firstArg = args[0]
    const lastArg = args[args.length - 1]
    const callback = typeof lastArg === 'function' ? args.pop() : null

    if (Array.isArray(firstArg)) {
      firstArg.forEach((idx) => {
        if (Number.isInteger(idx)) dataList[idx] = null
      })
      dataList = dataList.filter((item) => item)
    } else {
      dataList.splice(firstArg, 1)
    }

    this.owner.setData(
      {
        [this.batchDataKey]: dataList
      },
      callback
    )
    
  }
}

export function createRListContext(options) {
  if (
    typeof mmp !== 'undefined' &&
    typeof wx.createRListContext === 'function'
  ) {
    return wx.createRListContext(options)
  }

  return new RListContext(options)
}