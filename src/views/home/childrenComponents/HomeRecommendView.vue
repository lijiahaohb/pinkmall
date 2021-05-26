<template>
    
    <div class="recommends">
        <div class="recommend_images">
            <img src="https://s10.mogucdn.com/mlcdn/c45406/180913_036dli57aah85cb82l1jj722g887g_225x225.png" alt=""
                class="image">
            <img src="https://s10.mogucdn.com/mlcdn/c45406/180913_25e804lk773hdk695c60cai492111_225x225.png" alt=""
                class="image">
            <img src="https://s10.mogucdn.com/mlcdn/c45406/180913_387kgl3j21ff29lh04181iek48a6h_225x225.png" alt=""
                class="image">
            <img src="https://s10.mogucdn.com/mlcdn/c45406/180913_8d4e5adi8llg7c47lgh2291akiec7_225x225.png" alt="">
        </div>
        <div class=recommend_text>
            <div v-for="(item, index) in recommends" class="recommend_item">
                <a href="item.link">
                    <!-- <img src="images[index]" alt=""> -->
                    <!-- <img src="item.image" alt=""> -->
                    <div>{{item.title}}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeRecommendView",
        props: {
            recommends: Array,

        },
    }
</script>

<style scoped>
    .recommends {
        text-align: center;
        font-size: 12px;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
    }

    .recommends .recommend_images {
        display: flex;
    }


    .recommends .recommend_images img {
        flex: 1;
        width: 70px;
        margin-bottom: 10px;
    }
    .recommends .recommend_images .image {
        margin-right: 10px;
    }

    .recommend_text {
        display: flex;
    }

    .recommend_text .recommend_item {
        /* 均等分 */
        flex: 1;
    }

</style>