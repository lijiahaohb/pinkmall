<template>
    <div class="shop-cart">
        <nav-bar class="nav-bar">
            <div slot="mid">购物车({{cartLength}})</div>
        </nav-bar>
        <shop-cart-list ref="cart-list"></shop-cart-list>
        <cart-bottom-bar ></cart-bottom-bar>
    </div>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar"
    import shopCartList from "./childComps/shopCartList"
    import CartBottomBar from "./childComps/CartBottomBar"

    import { mapGetters } from "vuex"

    export default {
        name: "ShopCart",
        components: {
            NavBar,
            shopCartList,
            CartBottomBar
        },
        computed: {
            ...mapGetters(["cartLength"])
        },
    }
</script>

<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>