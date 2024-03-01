// components/message-item/index.js
Component({
    options: {
        virtualHost: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        role: {
            type: String,
            default: 'assistant',
        },
        content: {
            type: String,
            default: '',
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        copyText(e) {
            console.log(1111,)
            const content = e.currentTarget.dataset.content
            wx.setClipboardData({
                data: content,
                success: (res) => {
                    wx.showToast({
                        title: '复制成功，快去粘贴吧！',
                        icon: 'none',
                        mask: false,
                    })
                    console.log(res)
                }
            })
        },
        update() {
            console.log('update')
        }
    }
})