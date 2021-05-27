<template>
    <!-- 在vue中想要明确的拿到某个元素 就是给那个元素绑定一个ref -->
    <!-- 也可以绑定给子组件 (ref/children) -->
    <div ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BetterScroll from '@better-scroll/core'
    import Pullup from '@better-scroll/pull-up'
    BetterScroll.use(Pullup)

    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null,
                message: "我是scroll"
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            // 1. 创建BScroll对象
            this.scroll = new BetterScroll(this.$refs.wrapper, {
                mouseWheel: true,//开启鼠标滚轮
                disableMouse: false,//启用鼠标拖动
                disableTouch: false,//启用手指触摸
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad 
            })

            // 2. 监听滚动的位置
            this.scroll.on("scroll", position => {
                this.$emit("scrolled", position);
            })

            //3. 监听上拉加载
            this.scroll.on('pullingUp', () => {
                this.$emit("pullUp")
            })
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            getScrollY() {
                return this.scroll ?  this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>

</style>