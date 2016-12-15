<template>
    <div class="main-layouts">
        <slot name="menu"></slot>
        <div class="main-content">
            <slot name="sidebar"></slot>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style>
    *  {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    .main-layouts {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .main-content {
        display: flex;
        flex: 1;
    }

    .content-container {
        flex: 1;
        background: #F9FAFC;
        padding: 10px 50px 0 40px;
    }

    .content-container .title {
        display: inline-block;
        height: 56px;
        line-height: 56px;
        font-size: 22px;
        padding: 0;
        margin: 0 0 10px;
    }
</style>
