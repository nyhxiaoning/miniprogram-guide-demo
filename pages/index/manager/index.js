import { setModalInstance,createModalInstance,destroyModalInstance } from './context'
Component({
    data:{
        visible:false,
        message:''
    },
    lifetimes:{
        attached(){
            this.instanceId = createModalInstance(this)
        },
        detached(){
            destroyModalInstance(this.instanceId)
        }
    },
    pageLifetimes:{
        show(){
            setModalInstance(this.instanceId )
        },
        hide(){
            setModalInstance('')
        },
    },
    methods:{
        showModal(message){
            this.setData({
                visible:true,
                message
            })
        },
        closeModal(){
            this.setData({
                visible:false,
                message:''
            })
        }
    },
})