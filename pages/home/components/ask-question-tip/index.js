// components/message-item/index.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        contents: {
            type: Array,
            value: []
        }
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
        handleItemClick(e){
            const content = e.target.dataset.item
            this.triggerEvent('handleAutoFillInput',{ content })
        },
    }
})