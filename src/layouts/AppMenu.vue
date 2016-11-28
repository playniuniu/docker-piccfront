<template>
    <header>
        <h1 class="header-title">
            <router-link to="/">PICC 灾备管理</route-link>
        </h1>
        <div class="header-nav">
            <el-button size="small" class="btn-login">
                <i class="fa fa-user"></i>
                <span>登录</span>
            </el-button>
        </div>
    </header>
</template>

<style>

    .header-title {
        display: inline-block;
        font-size: 24px;
        font-weight: 200;
        line-height: 60px;
        margin: 0;
    }

    .header-title a {
        text-decoration: none;
        color: #fff;
    }

    .header-nav {
        float: right;
        font-size: 16px;
        color: #fff;
        line-height: 60px;
        margin: 0;
        padding: 0;
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