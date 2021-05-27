<template>
    <div>
        <NavBar>
            <div slot="left" class="back" @click="backClick"> 
                <img src="~assets/img/common/back.svg" alt=""> 
            </div>>
            <div slot="mid" class="title">
                <div v-for="(item, index) in titles" class="title-item" :class="{active: index === currentIndex}"
                    @click="activate(index)">{{item}}</div>
            </div>
        </NavBar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"

    export default {
        name: "DetailNavBar",
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            activate(index) {
                this.currentIndex = index
            },
            backClick() {
                this.$router.back()
            }
        },
        components: {
            NavBar
        }
    }
</script>

<style scoped>
    .title {
        display: flex;
        text-align: center;
        font-size: 13px;
    }

    .title-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
        border-bottom: 1px solid var(--color-high-text);
    }

    .back img {
        margin-top: 12px;
    }
</style>