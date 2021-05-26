<template>
    <TabBar>
        <TabBarItem path="/home">
            <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
            <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png" alt="">
            <div slot="item-text">首页</div>
        </TabBarItem>
        <TabBarItem path="/category">
            <img slot="item-icon" src="~assets/img/tabbar/categories.png" alt="">
            <img slot="item-icon-active" src="~assets/img/tabbar/categories_active.png" alt="">
            <div slot="item-text">分类</div>
        </TabBarItem>
        <TabBarItem path="/shopcart">
            <img slot="item-icon" src="~assets/img/tabbar/shopcart.png" alt="">
            <img slot="item-icon-active" src="~/assets/img/tabbar/shopcart_active.png" alt="">
            <div slot="item-text">购物车</div>
        </TabBarItem>
        <TabBarItem path="/profile">
            <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
            <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.png" alt="">
            <div slot="item-text">我的</div>
        </TabBarItem>
    </TabBar>
</template>

<script>
    import TabBar from "components/common/tabbar/TabBar"
    import TabBarItem from "../../common/tabbar/TabBarItem"

    export default {
        name: 'MainTabBar',
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>

<style>
</style>