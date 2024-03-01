
Component({
    relations:{
        '../container-item/index':{
            type:'child'
        },
    },
    methods:{
        handleClick(){
            var nodes = this.getRelationNodes('../container-item/index')
            nodes[0].handleMessage('hello child')
        },
        handleMessage(msg){
            this.setData({ msg })
        },
    },
})