<template>
    <div id="app">
        <router-view/>
        <MainTabBar/>
    </div>
</template>

<script>
    import MainTabBar from "components/content/maintabbar/MainTabBar"
    export default {
        name: "App",
        components: {
            MainTabBar
        }
    }
</script>

<style>
    @import "./assets/css/base.css"
</style>