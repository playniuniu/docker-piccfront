<template>
    <section class="content-container">
        <header>
            <h1 class="title">虚机资源</h1>
            <div class="btn-right">
                <el-button type="success">
                    <i class="fa fa-server"></i>
                    <router-link to="newserver">新建虚机</router-link>
                </el-button>
            </div>
        </header>

        <el-table :data="tableData" border>
            <el-table-column prop="ip" label="IP 地址" width="180"></el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="90"
                align="center"
                inline-template>
                <el-tag :type="row.type === '主控' ? 'success' : 'warning'" close-transition>{{row.type}}</el-tag>
            </el-table-column>
            <el-table-column prop="area" label="所在区域" sortable width="160" align="center"></el-table-column>
            <el-table-column prop="desc" label="机器说明"></el-table-column>
            <el-table-column :context="_self" inline-template label="操作" width="140" align="center">
                <div>
                    <el-button size="small" @click="handleEdit($index, row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
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
                    ip: '10.10.17.240',
                    type: '主控',
                    area: '南中心',
                    desc: 'fj3500 car3g'
                },
                {
                    ip: '10.10.17.241',
                    type: '受管',
                    area: '南中心',
                    desc: 'fj3500 car3g'
                },
                {
                    ip: '10.10.17.242',
                    type: '主控',
                    area: '灾备中心',
                    desc: 'fj3500 car3g'
                },
                {
                    ip: '10.10.17.243',
                    type: '受管',
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
