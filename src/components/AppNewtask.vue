<template>
    <section class="content-container">
        <el-row class="task-step">
            <el-col :span="18">
                <el-steps :space="250" :active="active">
                    <el-step title="新建任务" icon="star-off"></el-step>
                    <el-step title="配置参数" icon="upload"></el-step>
                    <el-step title="开始部署" icon="share"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="6">
                <div class='task-btn-row'>
                    <el-button :disabled="active === 1"  @click="prevStep">上一步</el-button>
                    <el-button :disabled="active === 3" @click="nextStep" type="primary" >下一步</el-button>
                </div>
            </el-col>
        </el-row>

        <div class="task-form">
            <el-form :model="taskdata" label-position="left" label-width="80px">
                <div v-if="active === 1">
                    <el-form-item label="服务器">
                        <el-select v-model="taskdata.ip" placeholder="请选择服务器">
                            <el-option label="10.0.0.1" value="10.0.0.1"></el-option>
                        </el-select>
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
                    
                    <el-form :model="taskdata" label-width="80px">
                        <el-form-item label="部署目标">
                            <el-input disabled v-model="taskdata.ip"></el-input>
                        </el-form-item>
                        <el-form-item label="部署类型">
                            <el-input disabled v-model="taskdata.type"></el-input>
                        </el-form-item>
                    </el-form>
                    
                    <el-button type="success" size="large">立即部署</el-button>
                </div>
            </el-form>
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
        float: right;
    }

    .btn-next {
        margin-left: 15px;
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
            prevStep() {
                this.active -= 1;
            },

            nextStep() {
                this.active += 1;
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
        }
    }
</script>