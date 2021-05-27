<template>
    <div id="detail">
        <DetailNavBar :titles="titles"></DetailNavBar>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar"

    import {getDetail} from "network/detail"


    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                titles: ["商品", "参数", "评论", "推荐"]
            }
        },
        created() {
            // 1. 保存iid
            this.iid = this.$route.params.iid

            // 2. 根据iid请求详情数据
        },
        components: {
            DetailNavBar
        }
    }
</script>

<style scoped>

</style>