import { debounce } from "./utils"

import BackTop from "components/content/backtop/BackTop"


export const itemImageListenerMixin = {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted() {
        // 3. 监听item中图片加载完成
        // 对于refresh调用非常频繁的问题，进行防抖操作(debounce) 
        // 相关知识点 防抖(debounce)和节流(throttle)
        this.itemImageListener = debounce(this.$refs.scroll.refresh, 500)
        this.$bus.$on("itemImageLoad", this.itemImageListener)
    },
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0)
        }
    }
}
