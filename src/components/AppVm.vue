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

        <el-table :data="vmdata" border>
            <el-table-column prop="ip" label="IP 地址" width="180"></el-table-column>
            <el-table-column
                prop="group"
                label="类型"
                width="140"
                align="center"
                inline-template>
                <el-tag :type="row.group === 'AdminServer' ? 'success' : 'warning'" close-transition>{{row.group}}</el-tag>
            </el-table-column>
            <el-table-column prop="area" label="所在区域" sortable width="160" align="center"></el-table-column>
            <el-table-column prop="desc" label="机器说明"></el-table-column>
            <el-table-column :context="_self" inline-template label="操作" width="140" align="center">
                <div>
                    <el-button size="small" disabled @click="editVM($index, row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="deleteVM($index, row)">删除</el-button>
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
    
    .select-type {
        padding: 5px 0;
    }

    .select-type label {
        font-size: 14px;
        color: #324057;
    }
</style>


<script>
    import ajax from '../utilities/ajax.js'

    export default {
        data() {
            return {
                vmdata: [],
                ajax_url: '/inventory'
            }
        },
        mounted() {
            this.fetchData(this.ajax_url);
        },
        methods: {
            editVM(index, row) {
                console.log(index, row);
            },
            deleteVM(index, row) {
                this.vmdata.splice(index, 1);
                this.setData(this.ajax_url, this.vmdata);
            },
            fetchData(url) {
                ajax.get(url).then( (response) => {
                    this.vmdata = response.data;
                });
            },
            setData(url, data) {
                ajax.post(url, data).then( (response) => {
                    if (response.data.status === "ok") {
                        this.$message.success("成功删除");
                    }
                    else {
                        this.$message.error("成功失败");
                    }
                });
            },
        }
    }
</script>
