<template>
    <div id="home">
        <NavBar class="home-nav"> <div slot="mid">购物街</div> </NavBar>
        <HomeSwiper :child_banners="banners"></HomeSwiper>
        <!-- <div v-for="item in recommends">
            <img src="item.image" alt="">
        </div> -->
        <HomeRecommendView v-bind:recommends="recommends"></HomeRecommendView>
        <!-- <button @click="getData">获取数据</button> -->
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import HomeSwiper from "./childrenComponents/HomeSwiper"
    import HomeRecommendView from "./childrenComponents/HomeRecommendView"

    import { getHomeMultidata } from "network/home"

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            HomeRecommendView
        },
        data() {
            return {
                banners: [],
                recommends: []
            }
        },
        created() {
            // 1. 请求多个数据
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },
        methods: {
            getData() {
                for(let i = 0; i < this.recommends.length; ++i)
                    console.log(this.recommends[i].image);
            }
        }
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>