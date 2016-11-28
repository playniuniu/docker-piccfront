<template>
    <div class="main-layouts">
        <header class="app-menu">
            <slot name="menu"></slot>
        </header>

        <aside class="app-sidebar">
            <slot name="sidebar"></slot>
        </aside>

        <section class="app-container">
            <slot name="content"></slot>
        </section>
    </div>
</template>

<style>
    .main-layouts {
        height: 100%;
    }

    .app-menu {
        position:fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        padding: 0 50px;
        background-color: #20A0FF;
        transition: all 0.5s ease;
        z-index: 10;
    }

    .app-sidebar {
        position:fixed;
        width: 260px; 
        top: 80px;
        bottom: 0;
    }

    .app-container {
        background: #F9FAFC;
        padding-left: 260px;
        padding-top: 80px;
        min-height: calc(100% - 80px);
    }
</style>
