<template>
    <div id="app">
        <main-layouts>
            <app-menu slot="menu"></app-menu>    
            <app-sidebar slot="sidebar"></app-sidebar>
            <router-view slot="content" class="content-container"></router-view>
        </main-layouts>
    </div>
</template>

<script>
    import MainLayouts from './layouts/MainLayouts.vue'
    import AppMenu from './layouts/AppMenu.vue'
    import AppSidebar from './layouts/AppSidebar.vue'

    export default {
        components: { MainLayouts, AppMenu, AppSidebar },
    }
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    #app {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        height: 100%;
    }

    .content-container {
        padding: 10px 50px 0 30px;
    }

    .content-container .title {
        display: inline-block;
        height: 56px;
        line-height: 56px;
        font-size: 22px;
        padding: 0;
        margin: 0 0 5px;
    }
</style>