<template>
    <div id="home">
        <NavBar class="home-nav">
            <div slot="mid">购物街</div>
        </NavBar>
        <TabControl :titles="titles" 
                    @tabClick="tabClick" ref="tabControl1" 
                    class="tab-control" v-show="isTabFixed"></TabControl>

        <Scroll class="content" ref="scroll" :probe-type="3" @scrolled="contentScroll" :pullUpLoad="true"
            @pullUp="loadMore">
            <HomeSwiper :child_banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
            <HomeRecommendView v-bind:recommends="recommends"></HomeRecommendView>
            <FeatureView />
            <TabControl :titles="titles" 
                        @tabClick="tabClick" ref="tabControl2"></TabControl>
            <GoodsList :goods="goods[currentType].list" />
        </Scroll>
        <!-- 当我们需要监听一个组件的原生事件时，必须给相应的事件加上.native修饰符，才能进行监听 -->
        <BackTop @click.native="backTop" v-show="isShowBackTop"></BackTop>
    </div>
</template>

<script>
    import HomeSwiper from "./childrenComponents/HomeSwiper"
    import HomeRecommendView from "./childrenComponents/HomeRecommendView"
    import FeatureView from "./childrenComponents/FeatureView"


    import Scroll from "components/common/scroll/Scroll"
    import NavBar from "components/common/navbar/NavBar"
    import BackTop from "components/content/backtop/BackTop"
    import TabControl from "components/content/tabcontrol/TabControl"
    import GoodsList from "components/content/goods/GoodsList"

    import {
        getHomeMultidata,
        getHomeGoods
    } from "network/home"

    import { debounce } from "components/common/utils"

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            HomeRecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                titles: ["流行", "新款", "精选"],
                goods: {
                    "pop": { page: 0, list: [] },
                    "new": { page: 0, list: [] },
                    "sell": { page: 0, list: [] }
                },
                currentType: "pop",
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0
            }
        },
        created() {
            // 在created中只传入函数， 具体的处理逻辑方在methods中
            // 1. 请求多个数据
            this.getHomeMultidata()

            // 2. 请求商品数据
            this.getHomeGoods("pop")
            this.getHomeGoods("new")
            this.getHomeGoods("sell")
        },
        mounted() {
            // 3. 监听item中图片加载完成
            // 对于refresh调用非常频繁的问题，进行防抖操作(debounce) 
            // 相关知识点 防抖(debounce)和节流(throttle)
            const func = debounce(this.$refs.scroll.refresh, 500)
            this.$bus.$on("itemImageLoad", () => {
                func()
            })
        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY()
        },
        methods: {
            /**
             * 事件监听相关的方法
            */
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
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },
            backTop() {
                this.$refs.scroll.scrollTo(0, 0)
            },
            contentScroll(position) {
                // 因为打印position的时候发现y值都为负值，所以要加一个负号再和1000作比较
                this.isShowBackTop = -position.y > 1000

                // 决定tabControl是否吸顶
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.finishPullUp()
            },
            swiperImageLoad() {

                // 4. 获取tabControl的offsetTop
                // 所有的组件都有一个 $el 的属性 用于获取组件中的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            /**
             * 网络请求相关的方法
            */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                })
            }
        }
    }
</script>

<style scoped>
    #home {
        /* padding-top: 44px; */
        /* vh表示视口高度 */
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        /* 在使用原生的滚动的时候，为了让导航栏不随着一起滚动 */
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0; */
        /* 如果不设置这个的话，导航栏会被盖住 */
        /* z-index: 9; */
    }

    /* 设置tab-control的吸顶效果 
        当组件的顶端未达到了离顶端44px的 position为static
        当组件的顶端达到了离顶端44px的 position为fixed
    */
    /* .tab-contrl {
       
        position: sticky;
        top: 44px;
        z-index: 10;
    } */

    .content {
        overflow: hidden;

        /* 想要设置位置可以用定位的方式 */
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .tab-control {
        position: relative;
        /* z-index只对定位元素起效果 */
        z-index: 9;
    }

    /* .content {
        height: cacl(100% - 93px);
        overflow: hidden;
        margin-top: 51px;
    } */
</style>