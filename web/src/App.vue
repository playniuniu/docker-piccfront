<template>
    <div id="app">
        <main-layouts>
            <app-menu slot="menu"></app-menu>
            <app-sidebar slot="sidebar"></app-sidebar>
            <router-view slot="content"></router-view>
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