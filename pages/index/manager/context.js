let currentModalInstance = null

const ModalSet = new Map()

class ModalInstance{
    constructor(modalInstance){
        this.instance = modalInstance
    }
    showModal(mes){
        this.instance.showModal(mes)
    }
}

/* 获取 ModalInstance  */
export function getModalInstance (){
   return currentModalInstance
}


/* 创建一个 modalInstance */
export function createModalInstance(instance){
    const instanceId = instance.getPageId()
    const newModalInstance = new ModalInstance(instance)
    ModalSet.set(instanceId,newModalInstance) 
    return instanceId
}

/* 销毁 instance 实例 */
export function destroyModalInstance(instanceId){
    ModalSet.delete(instanceId) 
}

/* 设置 ModalInstance */
export function setModalInstance(instanceId){
   if(instanceId){
       const modalInstance = ModalSet.get(instanceId)
       console.log(modalInstance,'modalInstance')
       if(modalInstance)  currentModalInstance = modalInstance
   }else {
       /* 如果  instanceId 不存在，那么情况 currentModalInstance */
       currentModalInstance = null
   }
}