<template>
    <div class="app-sidebar">
        <el-menu class="sidebar-menu">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>资源</template>
                <router-link to="vm">
                    <el-menu-item index="1-1">虚机资源</el-menu-item>
                </router-link>
                <router-link to="sources">
                    <el-menu-item index="1-2">物理资源</el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-star-off"></i>任务</template>
                <router-link to="newtask">
                    <el-menu-item index="2-1">新建任务</el-menu-item>
                </router-link>
                <router-link to="tasks">
                    <el-menu-item index="2-2">历史任务</el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>管理</template>
                <router-link to="settinguser">
                    <el-menu-item index="3-1">用户管理</el-menu-item>
                </router-link>
                <router-link to="settingssh">
                    <el-menu-item index="3-2">密钥管理</el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
    </div>
</template>

<style>
    .app-sidebar {
        width: 260px;
    }

    .sidebar-menu {
        height: 100%;
        padding-top: 15px;
    }

    .sidebar-menu .el-submenu__title {
        padding: 0 50px;
    }

    .el-submenu .el-menu-item {
        padding: 0 75px;
    }

    .el-submenu a {
        text-decoration: none;
    }
</style>
