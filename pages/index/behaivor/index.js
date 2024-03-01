import baseBehaivor from './base'

Component({
    behaviors:[ baseBehaivor ],
    lifetimes:{
        attached(){
            console.log('component:attached')
        },
        ready(){
            console.log('component:ready')
            console.log('this',this)
            this.handleEvent()
        }
    },
    data:{
        name:'alien'
    },
    methods:{
        handleEvent(){
            console.log('《大前端跨端开发指南》')
        }
    },
})