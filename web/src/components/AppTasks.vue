<template>
    <section class="content-container">
        <header>
            <h1 class="title">历史任务</h1>
            <div class="btn-right">
                <el-button type="primary" @click="fetchTasks">
                    <i class="fa fa-refresh"></i>刷新任务
                </el-button>
                <el-button type="success" @click="newTask">
                    <i class="fa fa-calendar-check-o"></i>新建任务
                </el-button>
            </div>
        </header>

        <el-table :data="taskData" border class="task-table">
            <el-table-column prop="uuid" label="任务 ID"></el-table-column>
            <el-table-column prop="state" label="状态" width="110" align="center" inline-template>
                <el-tag :type="row.state === 'SUCCESS' ? 'success' : 'danger'" close-transition>{{row.state}}</el-tag>
            </el-table-column>
            <el-table-column prop="runtime" label="运行时间" width="120" align="center"></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="180" align="center"></el-table-column>
            <el-table-column :context="_self" inline-template label="查看结果" width="100" align="center">
                <div>
                    <el-button size="small" :plain="true" type="danger" @click="taskDetail(row)">查看</el-button>
                </div>
            </el-table-column>
        </el-table>

        <el-dialog title="任务结果" v-model="taskInfoVisible">
            <div class="task-info" v-html="taskInfo"></div>
        </el-dialog>
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

    .task-info {
        font-size: 14px;
        line-height: 21px;
        color: #324057;
    }
</style>


<script>
    import ajax from '../utilities/ajax.js'

    export default {
        data() {
            return {
                taskData: [],
                task_url: '/api/tasks',
                taskInfoVisible: false,
                taskInfo: null,
            }
        },
        mounted() {
            this.fetchTasks();
        },
        methods: {
            newTask() {
                this.$router.push('newtask');
            },
            fetchTasks() {
                ajax.get(this.task_url).then( (response) => {
                    this.taskData = response.data;
                });
            },
            taskDetail(row) {
                this.taskInfoVisible = true;
                let res_str = row.result.replace(/(?:\r\n|\r|\n)/g, '<br />');
                this.taskInfo = res_str;
            },
        }
    }
</script>
