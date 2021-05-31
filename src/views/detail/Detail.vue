<template>
    <div id="detail">
        <DetailNavBar :titles="titles" class="detail-nav" @activate="titleClick" ref="nav"></DetailNavBar>
        <Scroll class="content" ref="scroll" :probeType="3" @scrolled="contentScroll">
            <DetailSwiper :topImages="topImages"></DetailSwiper>
            <DetailBaseInfo :goods="goods"></DetailBaseInfo>
            <DetailShopInfo :shop="shop"></DetailShopInfo>
            <DetailGoodsInfo :detail-info="detailInfo" @goodsInfoImageLoad="goodsInfoImageLoad"></DetailGoodsInfo>
            <DetailParamInfo ref="params" :paramInfo="goodsParams"></DetailParamInfo>
            <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
        </Scroll>
        <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
        <BackTop @click.native="backTop" v-show="isShowBackTop"></BackTop>
    </div>
</template>

<script>
    import Scroll from "@/components/common/scroll/Scroll"
    import GoodsList from "@/components/content/goods/GoodsList"
    import BackTop from "@/components/content/backtop/BackTop"

    import DetailNavBar from "./childComps/DetailNavBar"
    import DetailSwiper from "./childComps/DetailSwiper"
    import DetailBaseInfo from "./childComps/DetailBaseInfo"
    import DetailShopInfo from "./childComps/DetailShopInfo"
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
    import DetailParamInfo from "./childComps/DetailParamInfo"
    import DetailCommentInfo from "./childComps/DetailCommentInfo"
    import DetailBottomBar from "./childComps/DetailBottomBar"

    import { getDetail, Goods, Shop, GoodsParams, getRecommand } from "@/network//detail"

    import { refresh } from "@/components/common/scroll/Scroll"
    import { debounce } from "@/common/utils"
    import { itemImageListenerMixin, backTopMixin } from "@/common/mixin"

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                titles: ["商品", "参数", "评论", "推荐"],
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                goodsParams: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                message: "",
                show: false
            }
        },
        created() {
            // 1. 保存iid
            this.iid = this.$route.params.iid

            // 2. 根据iid请求详情数据
            getDetail(this.iid).then(res => {
                const data = res.result
                // 获取顶部的图片轮播数据
                this.topImages = data.itemInfo.topImages

                // 获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                // 获取商家信息
                this.shop = new Shop(data.shopInfo)

                // 获取商品的详情数据
                this.detailInfo = data.detailInfo

                // 获取商品参数信息
                this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)

                // 获取评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
            })
            // 请求推荐数据
            getRecommand().then(res => {
                this.recommends = res.data.list
            })

            // this.$nextTick() 可以保证里面的数据在DOM元素被加载之后才会执行
            this.$nextTick(() => {
                // 在每次图片加载之后，更新themeTopYs的值，并为这一操作加上防抖
                this.getThemeTopY = debounce(() => {
                    this.themeTopYs = []

                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    this.themeTopYs.push(Number.MAX_VALUE)

                }, 300)
            })
        },
        destroyed() {
            this.$bus.$off("itemImageLoad", this.itemImageListener)
        },
        mixins: [itemImageListenerMixin, backTopMixin],
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            Scroll,
        },
        methods: {
            goodsInfoImageLoad() {
                debounce(this.$refs.scroll.refresh(), 300)

                // 更改themTopYs数组的值
                this.getThemeTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
            },
            contentScroll(position) {
                // 1. 获取y值
                const positionY = -position.y

                // 2. 拿position.y和主题中的值进行对比
                let length = this.themeTopYs.length
                for (let i = 0; i < length - 1; ++i) {
                    if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
                this.isShowBackTop = positionY > 1000
            },
            addCart() {
                // 1. 获取购物车需要展示的信息
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.newPrice
                product.iid = this.iid

                // 将商品添加到购物车
                this.$store.dispatch("addCart", product).then(res => {
                    this.$toast.show()
                })
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 1;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        position: absolute;
        top: 44px;
        bottom: 60px;
        overflow: hidden;
    }
</style>