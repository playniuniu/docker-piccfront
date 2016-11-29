<template>
    <section class="content-container">
        <header>
            <h1 class="title">历史任务</h1>
            <div class="btn-right">
                <el-button type="success" @click="newTask">
                    <i class="fa fa-calendar-check-o"></i>新建任务
                </el-button>
            </div>
        </header>

        <el-table :data="taskData" border class="task-table">
            <el-table-column prop="uuid" label="UUID" width="180"></el-table-column>
            <el-table-column prop="state" label="状态" width="110" align="center" inline-template>
                <el-tag :type="row.state === 'SUCCESS' ? 'success' : 'danger'" close-transition>{{row.state}}</el-tag>
            </el-table-column>
            <el-table-column prop="args" label="命令" align="center"></el-table-column>
            <el-table-column prop="result" label="结果"></el-table-column>
            <el-table-column :context="_self" inline-template label="操作" width="100" align="center">
                <div>
                    <el-button size="small" :disabled="true" type="success" @click="taskDetail(row)">详情</el-button>
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

    .task-table {
        margin-bottom: 60px;
    }
</style>


<script>
    import ajax from '../utilities/ajax.js'

    export default {
        data() {
            return {
                taskData: [],
                task_url: '/api/tasks',
            }
        },
        mounted() {
            this.fetchData(this.task_url);
        },
        methods: {
            newTask() {
                this.$router.push('newtask');
            },
            fetchData(url) {
                ajax.get(url).then( (response) => {
                    let tasks_list = response.data;
                    for( let key in tasks_list) {
                        let key_dict = { 'uuid': key }
                        let task_dict = Object.assign(key_dict, tasks_list[key]);
                        this.taskData.push(task_dict)
                    }
                });
            },
        }
    }
</script>
