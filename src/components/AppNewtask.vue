<template>
    <section>
        <div class="task-step">
            <el-steps :space="250" :active="active">
                <el-step title="新建" icon="date"></el-step>
                <el-step title="设置" icon="setting"></el-step>
                <el-step title="部署" icon="caret-right"></el-step>
            </el-steps>
        </div>

        <div class="task-form">
            <el-form :model="taskdata" label-position="left" label-width="80px">
                <div v-if="active === 1">
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
                    <el-form-item label="任务类型">
                        <el-select v-model="taskdata.type" placeholder="请选择任务类型">
                            <el-option label="部署主控节点" value="AdminServer"></el-option>
                            <el-option label="部署受管节点" value="ManagedServer"></el-option>
                            <el-option label="安装程序包" value="Deploy"></el-option>
                            <el-option label="配置数据源" value="DataSource"></el-option>
                            <el-option label="配置单点登录" value="ConfigSSL"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <div v-if="active === 2 && taskdata.type === 'AdminServer'">
                    <el-form-item label="业务省份">
                        <el-input v-model="ansible.picc_user" placeholder="fj"></el-input>
                    </el-form-item>
                    <el-form-item label="业务名称">
                        <el-input v-model="ansible.picc_op_name" placeholder="car3g"></el-input>
                    </el-form-item>
                    <el-form-item label="业务编码">
                        <el-input v-model="ansible.picc_org_code" placeholder="3500"></el-input>
                    </el-form-item>
                    <el-form-item label="主控端口">
                        <el-input v-model="ansible.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                </div>

                <div v-if="active === 2 && taskdata.type === 'ManagedServer'">
                    <el-form-item label="业务省份">
                        <el-input v-model="ansible.picc_user" placeholder="fj"></el-input>
                    </el-form-item>
                    <el-form-item label="业务名称">
                        <el-input v-model="ansible.picc_op_name" placeholder="car3g"></el-input>
                    </el-form-item>
                    <el-form-item label="业务编码">
                        <el-input v-model="ansible.picc_org_code" placeholder="3500"></el-input>
                    </el-form-item>
                    <el-form-item label="主控IP">
                        <el-input v-model="ansible.admin_ip" placeholder="0.0.0.0"></el-input>
                    </el-form-item>
                     <el-form-item label="主控端口">
                        <el-input v-model="ansible.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="ansible.admin_port" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="ansible.admin_port" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>
                </div>

                <div v-if="active === 2 && taskdata.type === 'Deploy'">
                    <el-form-item label="主控IP">
                        <el-input v-model="ansible.admin_ip" placeholder="0.0.0.0"></el-input>
                    </el-form-item>
                     <el-form-item label="主控端口">
                        <el-input v-model="ansible.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="ansible.admin_port" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="ansible.admin_port" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>
                    <el-form-item label="上传文件">
                        <el-upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            type="drag"
                            :multiple="false"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                </div>

                <div v-if="active === 3">
                    <el-form-item label="预约时间">
                        <el-switch on-text="" off-text="" v-model="taskdata.order"></el-switch>
                    </el-form-item>

                    <el-form-item label="部署时间" v-if="taskdata.order">
                        <el-date-picker type="date" placeholder="选择日期" v-model="taskdata.ordertime"></el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div class='task-btn-row'>
            <el-button type="primary" @click="nextStep">下一步</el-button>
            <el-button>取消</el-button>
        </div>

    </section>
</template>

<style>
    .task-step {
        padding: 20px 0;
    }

    .task-form {
        margin-top: 20px;
        margin-bottom: 40px;
        width: 530px;
    }

    .task-btn-row {
        margin-bottom: 60px;
    }
</style>

<script>
    export default {
        data() {
            return {
                active: 1,
                taskdata: {
                    ip: null,
                    port: 22,
                    username: null,
                    password: null,
                    type: null,
                    order: false,
                    ordertime: null,
                },
                ansible: {
                    admin_ip: null,
                    admin_port: null,
                    picc_user: null,
                    picc_op_name: null,
                    picc_org_code: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                }
            }
        },
        methods: {
            nextStep() {
                this.active += 1;
                if (this.active > 3) this.active = 0;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
        }
    }
</script>