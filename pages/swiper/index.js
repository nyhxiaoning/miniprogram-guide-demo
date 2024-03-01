

Page({
    current:0,
    handleChange(e){
       const { current } = e.detail
       this.current = current
       console.log('当前的 swiper-item 是',current)
    },
    /* 滑动到指定位置 */
    slideToIndex(){
        const swiper = this.selectComponent("#my-swiper")
        /* 滑动到指定的索引 */
        swiper.slideTo(2)
    },
    getSwiperHeight(){
        const swiper = this.selectComponent("#my-swiper")
        swiper.setSwiperHeight(this.current,(height)=>{
            console.log('当前 swiper-item 的高度是：',height)
        })
    },
})