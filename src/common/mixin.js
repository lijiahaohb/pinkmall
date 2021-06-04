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
        setTimeout(() => {
            this.itemImageListener = debounce(this.$refs.scroll.refresh, 500)
            this.$bus.$on("itemImageLoad", this.itemImageListener)
        }, 500)
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

export const tabControlMixin = {
    data() {
        return {
            currentType: "pop"
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = "pop"
                    break
                case 1:
                    this.currentType = "new"
                    break
                case 2:
                    this.currentType = "sell"
                    break
            }
        }
    }
}

export const scrollMixin = {
    data() {
        return {
            saveY: 0,
        }
    },
    activated() {
        setTimeout(() => {
            this.$refs.scroll.scrollTo(0, this.saveY)
            this.$refs.scroll.refresh()
        }, 300)
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        this.$bus.$off("itemImageLoad", this.itemImageListener)
    },
}
