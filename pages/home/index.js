let requestTask = null
let currentContent = ''
const defaultPrompt = {
    title: 'default',
    name: '灵犀一语',
    content: '',
    description: '一个 AI 语言模型，可以回答问题的人工智能程序。\n\n 【点击顶部可以切换不同角色哦～】',
    checked: true
}

Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        content: '',
        imageSrc: "",
        contents: "",
        inputValue: '',
        fixedTop: 0,
        contentHeight: 88,
        currentItem: 'bottom',
        messageList: [],
        loading: false,
        thinking: false,
        currentPrompt: defaultPrompt,
        autosize: {
            maxHeight: 60,
            minHeight: 20,
        }
    },
    onLineChange(e) {
        console.log(1111, e.detail)
    },
    async onLoad(option) {

    },
    handleSwitchRole() {
        wx.navigateTo({
            url: '/pages/prompt/index',
        })
    },
    handleToSettings() {
        wx.navigateTo({
            url: '/pages/settings/index',
        })
    },
    handleClear() {
        if (this.data.loading || this.data.thinking) return
        this.setData({
            messageList: [],
        })
    },
    handleValueChange(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    handleKeyboardHeightChange(e) {
        const isExpand = e.detail.height > 0
        const query = wx.createSelectorQuery()
        query.select('#footer').boundingClientRect((rect) => {
            const fixedTop = e.detail.height > 0 ? e.detail.height : 0
            console.log(fixedTop, 'handleKeyboardHeightChange=====>')
            if (isExpand) {
                this.setData({
                    fixedTop,
                    currentItem: 'bottom',
                    contentHeight: rect.height + fixedTop + 20
                })
            } else {
                this.setData({
                    fixedTop,
                    contentHeight: 88
                })
            }

        }).exec()
    },
    async handleSendClick() {
        const userInput = this.data.inputValue.trim()
        if (userInput.trim() === '') return
        const messageList = this.data.messageList
        const timestamp = Date.now();
        const newMessage = {
            id: timestamp,
            role: 'user',
            content: userInput
        }
        this.setData({
            messageList: messageList.concat(newMessage),
            inputValue: '',
            loading: true,
            thinking: true
        })
        this.requestWithMessage(userInput)
    },
    handleRequestReslve(result) {
        if (result) {
            const timestamp = Date.now();
            const index = this.data.messageList.length
            const newMessageList = `messageList[${index}]`
            const contentCharArr = result.trim().split("")
            const content_key = `messageList[${index}].content`
            const finished_key = `messageList[${index}].finished`
            this.setData({
                thinking: false,
                [newMessageList]: {
                    id: timestamp,
                    role: 'assistant',
                    finished: false
                }
            })
            currentContent = ''
            this.show_text(0, content_key, finished_key, contentCharArr);
        } else {
            this.setData({
                thinking: false,
                loading: false
            })
            wx.showToast({
                icon: 'none',
                title: '系统繁忙，请重试',
            })
        }
    },
    handleRequestFail() {
        wx.showToast({
            icon: 'none',
            title: `服务请求错误`,
        })
        this.setData({
            thinking: false,
            loading: false
        })
    },
    async requestWithMessage(content) {
        let messages = [{
            role: 'user',
            content
        }]
        const currentPrompt = this.data.currentPrompt
        if (currentPrompt.content) {
            messages.unshift({
                role: 'system',
                content: currentPrompt.content
            })
        }
        const params = { prompt: content, options: {}, appId: this.appId }
        // try {
        //     const { code, data } = await fetchChatAPIProcess(params) || {}
        //     if (code === 0) {
        //         this.handleRequestReslve(data.text)
        //     } else if (code === 501) {
        //         this.showGotoPay()
        //         this.setData({
        //             thinking: false,
        //             loading: false
        //         })
        //     }
        // } catch (e) {
        //     this.handleRequestFail()
        // }

    },
    /* 显示用尽次数 */
    showGotoPay() {
        wx.showModal({
            title: '提示',
            content: '您的提问次数已用尽',
            confirmText: '立即获取',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateTo({
                        url: '/pages/product-list/index'
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /* 自动回显示 input 内容 */
    handleAutoFillInput(e) {
        const content = e.target.dataset.item
        this.setData({
            inputValue: content.slice(4)
        })
    },
    show_text(key = 0, content_key, finished_key, value) {
        if (key >= value.length) {
            this.setData({
                loading: false,
                [finished_key]: true
            })
            wx.vibrateShort()
            return;
        }
        currentContent = currentContent + value[key]
        this.setData({
            [content_key]: currentContent,
        })
        setTimeout(() => {
            this.show_text(key + 1, content_key, finished_key, value);
        }, 50);
    },
    handleCancel() {
        if (!requestTask) return
        requestTask.abort()
        wx.showToast({
            icon: 'none',
            title: '已取消',
        })
    },
    onShow() {
        wx.hideHomeButton()
        const prompt = wx.getStorageSync('prompt')
        if (!Object.keys(prompt).length) return
        this.setData({
            currentPrompt: prompt
        })
        this.handleClear()
    }
})