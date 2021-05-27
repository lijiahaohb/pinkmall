<template>
    <div class="goods">
        <GoodsItem v-for="item in goods" :goodsItem="item"></GoodsItem>
    </div>
</template>

<script>
    import GoodsItem from "./GoodsItem"

    export default {
        name: "GoodsList",
        props: {
            goods: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            GoodsItem
        }
    }
</script>

<style scoped>
    .goods {
        display: flex;
        /*
         * 设置flex-wrap: wrap 使用flex布局的组件的宽度才会起作用
         * 设置justify-content: space-around 之后会布局的左右等分
        */
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>