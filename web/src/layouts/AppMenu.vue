<template>
    <header class="app-menu">
        <div class="header-title">
            <router-link to="/">PICC 灾备管理</route-link>
        </div>
        <div class="header-nav">
            <el-button size="small" class="btn-login">
                <i class="fa fa-user"></i>
                <span>登录</span>
            </el-button>
        </div>
    </header>
</template>

<style>

    .app-menu {
        display: flex;
        justify-content: space-between;
        padding: 0 50px;
        height: 80px;
        background-color: #20A0FF;
        transition: all 0.5s ease;
    }

    .header-title {
        font-size: 26px;
        font-weight: 200;
        line-height: 80px;
        margin: 0;
    }

    .header-title a {
        text-decoration: none;
        color: #fff;
    }

    .header-nav {
        font-size: 16px;
        color: #fff;
        line-height: 80px;
    }

    .btn-login {
        border: 1px solid #fff;
        background: none;
        color: #fff;
    }

    .btn-login:hover {
        border: 1px solid #e3e3e3;
        background: none;
        color: #e3e3e3;
    }

    .btn-login i {
        margin-right: 2px;
    }
</style>