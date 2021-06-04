<template>
    <div id="category">
        <nav-bar class="nav-bar">
            <div slot="mid">商品分类</div>
        </nav-bar>
        <div class="content">
            <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
            <scroll id="tab-content" ref="scroll">
                <tab-content-category :subcategories="showSubcategory"></tab-content-category>
                <tab-control :titles="['综合', '新品', '销量']"
                                @itemClick="tabClick"></tab-control>
                <tab-content-detail :categoryDetail="showCategoryDetail"></tab-content-detail>
            </scroll>
        </div>
    </div>
</template>

<script>
    import Scroll from "@/components/common/scroll/Scroll"
    import NavBar from "@/components/common/navbar/NavBar"
    import TabControl from "@/components/content/tabcontrol/TabControl"

    import TabMenu from "./childComps/TabMenu"
    import TabContentCategory from "./childComps/TabContentCategory"
    import TabContentDetail from "./childComps/TabContentDetail"

    import { getCategory, getSubCategory, getCategoryDetail } from "@/network/category"

    import {tabControlMixin, itemImageListenerMixin, scrollMixin} from "@/common/mixin"

    export default {
        name: "Category",
        components: {
            NavBar,
            Scroll,
            TabMenu,
            TabContentCategory,
            TabControl,
            TabContentDetail
        },
        mixins: [tabControlMixin, itemImageListenerMixin, scrollMixin],
        data() {
            return {
                categories: [],
                categoryData: [],
                currentIndex: 0,
            }
        },
        created() {
            // 1. 请求分类数据
            this._getCategory()
        },
        computed: {
            showSubcategory() {
                if(this.currentIndex == -1) return {}
                return this.categoryData[this.currentIndex].subcategories
            },
            showCategoryDetail() {
                if(this.currentIndex == -1) return []
                return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
            }
        },
        methods: {
            _getCategory() {
                getCategory().then(res => {
                    // 1. 获取分类数据
                    this.categories = res.data.category.list;

                    // 2. 初始化每个类别的子数据
                    for (let i = 0; i < this.categories.length; i++) {
                        this.categoryData[i] = {
                            subcategories: {},
                            categoryDetail: {
                                "pop": [],
                                "new": [],
                                "sell": []
                            }
                        }
                    }

                    // 3. 请求第一个分类的数据
                    this._getSubcategories(0);
                })
            },
            _getSubcategories(index) {
                this.currentIndex = index;
                const maitKey = this.categories[index].maitKey;
                getSubCategory(maitKey).then(res => {
                    this.categoryData[index].subcategories = res.data
                    this.categoryData = { ...this.categoryData }
                    this._getCategoryDetail("pop")
                    this._getCategoryDetail("sell")
                    this._getCategoryDetail("new")
                })
            },
            _getCategoryDetail(type) {
                // 1. 获取请求的miniWallkey
                const miniWallkey = this.categories[this.currentIndex].miniWallkey;
                // 2. 发送请求你，传入miniWallkey 和 type
                getCategoryDetail(miniWallkey, type).then(res => {
                    // 3. 将获取的数据保存下来
                    this.categoryData[this.currentIndex].categoryDetail[type] = res;
                    this.categoryData = { ...this.categoryData }
                })
            },
            selectItem(index) {
                this._getSubcategories(index);
            }
        }
    }
</script>

<style scoped>
    #category {
        height: 100vh;
        position: relative;
    }

    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
    }

    .content {
        /* position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 49px; */
        height: calc(100vh - 44px - 49px);

        display: flex;
    }

    #tab-content {
        height: 100%;
        flex: 1;
        overflow: hidden;
    }

</style>