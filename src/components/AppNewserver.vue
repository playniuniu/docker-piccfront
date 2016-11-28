<template>
    <section class="content-container">
        <header>
            <h1 class="title">新建虚机</h1>
        </header>
        
        <div class="form-create">
            <el-form :model="taskdata" label-position="left" label-width="80px">
                <el-form-item label="创建类型">
                    <el-radio-group v-model="createtype">
                        <el-radio :label="1">手动创建</el-radio>
                        <el-radio :label="2">VCenter</el-radio>
                        <el-radio :label="3">Citrix</el-radio>
                        <el-radio :label="4">CAS</el-radio>
                    </el-radio-group>
                </el-form-item>

                <div v-if="createtype === 1">
                    <el-form-item label="服务器 IP">
                        <el-input v-model="taskdata.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="SSH 端口">
                        <el-input v-model="taskdata.port"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="taskdata.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="taskdata.password"></el-input>
                    </el-form-item>
                </div>

                <div v-else>
                    <el-form-item label="API 地址">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="TOKEN">
                        <el-input></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="机器类型">
                    <el-radio-group v-model="taskdata.type">
                        <el-radio :label="1">生产</el-radio>
                        <el-radio :label="2">灾备</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="所在区域">
                    <el-select v-model="taskdata.area" placeholder="机器所在区域">
                        <el-option label="南中心" value="Prod"></el-option>
                        <el-option label="灾备中心" value="Backup"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="taskdata.desc"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                
            </el-form>
        </div>
    </section>
</template>

<style>
    .form-create {
        margin-top: 10px;
        width: 500px;
    }
</style>

<script>
    export default {
        data() {
            return {
                createtype: 1,
                taskdata: {
                    ip: null,
                    port: 22,
                    username: null,
                    password: null,
                    type: 2,
                    order: false,
                    ordertime: null,
                    area: null,
                    desc: null,
                }
            }
        },
        methods: {
            onSubmit() {

            }
        }
    }
</script>