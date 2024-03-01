
import {  getModalInstance } from '../manager/context'

Component({
    methods:{
        handleClick(){
            const instance = getModalInstance()
            instance && instance.showModal('大前端跨端开发指南')
        }
    },
})