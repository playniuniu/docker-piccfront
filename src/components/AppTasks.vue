<template>
    <section class="content-container">
        <header>
            <h1 class="title">历史任务</h1>
            <div class="btn-right">
                <el-button type="success">
                    <i class="fa fa-calendar-check-o"></i>
                    <router-link to="newtask">新建任务</router-link>
                </el-button>
            </div>
        </header>

        <el-table :data="tableData" border>
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="type" label="当前状态" width="100" align="center" inline-template>
                <el-tag :type="row.type === '成功' ? 'success' : 'danger'" close-transition>{{row.type}}</el-tag>
            </el-table-column>
            <el-table-column prop="ip" label="任务目标" width="160" align="center"></el-table-column>
            <el-table-column prop="desc" label="备注"></el-table-column>
            <el-table-column :context="_self" inline-template label="操作" width="100" align="center">
                <div>
                    <el-button size="small" :disabled="true" type="danger" @click="handleDelete($index, row)">取消</el-button>
                </div>
            </el-table-column>
        </el-table>
    </section>
</template>

<style>
    .btn-right {
        float: right;
        line-height: 56px;
    }

    .btn-right i {
        margin-right: 5px;
    }

    .btn-right a {
        text-decoration: none;
        color: #fff;
    }
</style>


<script>
    export default {
        data() {
            return {
                tableData: [
                {
                    name: '部署主控',
                    ip: '10.10.17.240',
                    type: '成功',
                    area: '南中心',
                    desc: 'fj3500 car3g'
                },
                {
                    name: '部署受管',
                    ip: '10.10.17.241',
                    type: '成功',
                    area: '南中心',
                    desc: 'fj3500 car3g'
                },
                {
                    name: '部署 WAR 包',
                    ip: '10.10.17.242',
                    type: '成功',
                    area: '灾备中心',
                    desc: 'fj3500 car3g'
                }],
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            filterTag(value, row) {
                return row.type === value;
            },
        }
    }
</script>
