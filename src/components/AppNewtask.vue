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
                    <el-button v-if="active === 1"  @click="cancel">取消</el-button>
                    <el-button v-else @click="prevStep">上一步</el-button>
                    <el-button :disabled="active === 3" @click="nextStep" type="primary" >下一步</el-button>
                </div>
            </el-col>
        </el-row>

        <div class="task-form">
            <el-form label-position="left" label-width="80px">
                <!-- step 1 -->
                <div v-if="active === 1">

                    <el-form-item label="任务类型">
                        <el-select v-model="task_type" placeholder="请选择任务类型" @change="updateTaskType">
                            <el-option label="部署主控节点" value="AdminServer"></el-option>
                            <el-option label="部署受管节点" value="ManagedServer"></el-option>
                            <el-option label="安装程序包" value="Deploy"></el-option>
                            <el-option label="配置数据源" value="DataSource"></el-option>
                            <el-option label="配置单点登录" value="ConfigSSL"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="服务器">
                        <el-select v-model="target_ip" :disabled="task_type === null" placeholder="请选择服务器">
                            <el-option
                                v-for="item in vmdata"
                                :label="item.ip + ' ( ' + item.group + ' ) '"
                                :value="item.ip"
                                :disabled="item.group !== select_ip_group">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                
                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'AdminServer'">
                    <el-form-item label="业务省份">
                        <el-input v-model="task1.picc_user_prefix" placeholder="fj"></el-input>
                    </el-form-item>
                    <el-form-item label="业务名称">
                        <el-input v-model="task1.picc_op_name" placeholder="car3g"></el-input>
                    </el-form-item>
                    <el-form-item label="业务编码">
                        <el-input v-model="task1.picc_org_code" placeholder="3500"></el-input>
                    </el-form-item>
                    <el-form-item label="主控端口">
                        <el-input v-model="task1.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                </div>
                
                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'ManagedServer'">
                    <el-form-item label="业务省份">
                        <el-input v-model="task2.picc_user_prefix" placeholder="fj"></el-input>
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
                        <el-input v-model="ansible.weblogic_user" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="ansible.weblogic_passwd" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>
                </div>
                
                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'Deploy'">
                    <el-form-item label="主控 IP">
                        <el-input v-model="task3.admin_ip" placeholder="0.0.0.0"></el-input>
                    </el-form-item>
                     <el-form-item label="主控端口">
                        <el-input v-model="task3.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                    <el-form-item label="部署目标">
                        <el-input v-model="task3.deploy_target" placeholder="ManagedServer7002"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="task3.weblogic_user" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="task3.weblogic_passwd" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>
                    <el-form-item label="上传文件">
                        <el-upload
                            action="upload_url"
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

                <!-- step 3 -->
                <div v-if="active === 3">        
                    <el-button type="success" size="large" @click="runTask">立即部署</el-button>
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
    import ajax from '../utilities/ajax.js'

    export default {
        data() {
            return {
                active: 1, // for step
                task_type: null, // for step
                vmdata: [], // for ansible limit ip
                select_ip_group: null, // for ansible limit ip
                inventory_url: "/inventory",
                task_url: "/newtask",
                upload_url: "/upload",
                target_ip: null,
                task1: {
                    picc_user_prefix: null,
                    picc_op_name: null,
                    picc_org_code: null,
                    admin_port: null,
                },
                task2: {
                    picc_user_prefix: null,
                    picc_op_name: null,
                    picc_org_code: null,
                    admin_ip: null,
                    admin_port: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                },
                task3: {
                    admin_ip: null,
                    admin_port: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                    deploy_file: null,
                    deploy_target: null,
                },
            }
        },

        mounted() {
            this.fetchData(this.inventory_url);
        },

        methods: {
            cancel() {
                this.$router.push("/tasks")
            },

            prevStep() {
                this.active -= 1;
            },

            nextStep() {
                this.active += 1;
            },

            updateTaskType() {
                this.target_ip = "";

                // update select_group for select ip
                if(this.task_type === "ManagedServer") {
                    this.select_ip_group = "ManagedServer";
                }
                else {
                    this.select_ip_group = "AdminServer";
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

            fetchData(url) {
                ajax.get(url).then( (response) => {
                    this.vmdata = response.data;
                });
            },

            runTask() {
                switch(this.task_type) {
                    case "AdminServer":
                        this.task_adminserver();
                        break;

                    case "ManagedServer":
                        this.task_managedserver();
                        break;

                    case "Deploy":
                        this.task_deploy();
                        break;

                    default:
                        console.log("Unknown task: " + this.task_type);
                        break;
                }
            },

            task_adminserver() {
                // generate picc_user
                this.task1.picc_user = this.task1.picc_user_prefix + this.task1.picc_org_code;

                // generate post_args
                let post_args = {
                    playbook: 'adminserver.yml',
                    playbook_dir: '/etc/ansible',
                    inventory: '/usr/src/app/inventory.py',
                    limit: this.target_ip,
                    extra_vars: [ this.task1 ],
                }

                ajax.post(this.task_url, post_args).then( (response) => {
                    
                    if ('task_id' in response.data) {
                        this.$message.success("任务创建成功");
                        console.log(response.data.task_id);
                    }

                    else {
                        this.$message.error("任务创建失败");
                        console.log(response.data);
                    }
                    setInterval( this.$router.push('tasks'), 500);
                })
            },

            task_managedserver() {

            },

            task_deploy() {

            },

        }
    }
</script>