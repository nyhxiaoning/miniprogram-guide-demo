Component({
    relations:{
        '../container/index':{
            type:'parent'
        },
    },
    methods:{
        handleClick(){
            var nodes = this.getRelationNodes('../container/index')
            nodes[0].handleMessage('hello parent')
        },
        handleMessage(msg){
            this.setData({ msg })
        },
    },
})