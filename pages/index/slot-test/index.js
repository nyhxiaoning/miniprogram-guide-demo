

Component({
    lifetimes:{
        ready(){
            console.log('ready====>')
        }
    },
    methods:{
        handleClick(){
            console.log('插槽组件发生点击')
        }
    },
})