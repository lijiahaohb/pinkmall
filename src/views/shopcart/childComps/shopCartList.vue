<template>
    <div class="cart-list">
            <Scroll class="content" ref="scroll">
                <shopCartListItem v-for="(item, index) in cartList" :cart-item="item" :key="index"></shopCartListItem>
            </Scroll>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    import Scroll from "@/components/common/scroll/Scroll"
    import ShopCartListItem from "./shopCartListItem"

    import { refresh } from "@/components/common/scroll/Scroll"

    export default {
        name: "shopCartList",
        components: {
            ShopCartListItem,
            Scroll
        },
        activated() {
            // 当当前页面活跃的时候进行刷新
            this.$refs.scroll.refresh()
        },
        computed: {
            ...mapGetters(["cartList"])
        }
    }
</script>

<style scoped>
    .cart-list {
        height: calc(100vh - 44px - 49px - 40px);
        position: relative;
    }

    .content {
        height: 100%;
        overflow: hidden;
    }
</style>