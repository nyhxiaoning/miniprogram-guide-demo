import modalBehavior from '../../component/modal-view/modal-require-behaviors'

Page({
    behaviors:[ modalBehavior ],
    handleOpenModal(){
        this.showModalView('custom-modal')
    },
    handleOpenModal2(){
        this.showModalView('custom-modal2')
    }
})