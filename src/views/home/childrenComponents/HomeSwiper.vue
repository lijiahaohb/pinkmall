<template>
    <Swiper>
        <SwiperItem v-for="item in child_banners">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </SwiperItem>
    </Swiper>
</template>

<script>
    import { Swiper, SwiperItem } from "components/common/swiper/index"

    export default {
        name: "HomeSwiper",
        props: {
            child_banners: Array
        },
        components: {
            Swiper,
            SwiperItem
        },
        data() {
            return {
                isLoad: false
            }
        },
        methods: {
            imageLoad() {
                if(!this.isLoad) {
                    this.$emit("swiperImageLoad")
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style scoped>

</style>