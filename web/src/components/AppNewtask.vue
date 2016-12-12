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
                            <el-option label="安装程序" value="Deploy"></el-option>
                            <el-option label="更新安装" value="UpdateDeploy"></el-option>
                            <el-option label="回滚安装" value="Fallback"></el-option>
                            <el-option label="清空缓存" value="ClearCache"></el-option>
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
                        <el-input v-model="task1.picc_user" placeholder="fj3500"></el-input>
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
                    <el-form-item label="用户名">
                        <el-input v-model="task1.weblogic_user" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="task1.weblogic_passwd" placeholder="密码至少 8 位"></el-input>
                    </el-form-item>
                </div>
                
                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'ManagedServer'">
                    <el-form-item label="业务省份">
                        <el-input v-model="task2.picc_user" placeholder="fj3500"></el-input>
                    </el-form-item>
                    <el-form-item label="业务名称">
                        <el-input v-model="task2.picc_op_name" placeholder="car3g"></el-input>
                    </el-form-item>
                    <el-form-item label="业务编码">
                        <el-input v-model="task2.picc_org_code" placeholder="3500"></el-input>
                    </el-form-item>
                    <el-form-item label="主控 IP">
                        <el-input v-model="task2.admin_ip" placeholder="0.0.0.0"></el-input>
                    </el-form-item>
                    <el-form-item label="主控端口">
                        <el-input v-model="task2.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                    <el-form-item label="受管端口">
                        <el-input v-model="task2.managed_port" placeholder="7002"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="task2.weblogic_user" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="task2.weblogic_passwd" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>
                </div>
                
                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'Deploy'">
                    <el-form-item label="业务省份">
                        <el-input v-model="task3.picc_user" placeholder="fj3500"></el-input>
                    </el-form-item>
                    <el-form-item label="部署名称">
                        <el-input v-model="task3.deploy_name" placeholder="picc"></el-input>
                    </el-form-item>
                    <el-form-item label="部署目标">
                        <el-input v-model="task3.deploy_target" placeholder="ManagedServer7002"></el-input>
                    </el-form-item>
                    <el-form-item label="主控 IP">
                        <el-input v-model="task3.admin_ip" placeholder="0.0.0.0"></el-input>
                    </el-form-item>
                     <el-form-item label="主控端口">
                        <el-input v-model="task3.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="task3.weblogic_user" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="task3.weblogic_passwd" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>
                    <el-form-item label="上传文件">
                        <el-upload type="drag" 
                            :action="computed_update_url"
                            :on-remove="fileRemove"
                            :on-success="fileSuccess"
                            :on-error="fileError"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将 War 包拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                </div>

                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'UpdateDeploy'">
                    <el-form-item label="业务省份">
                        <el-input v-model="task4.picc_user" placeholder="fj3500"></el-input>
                    </el-form-item>
                    <el-form-item label="更新目标">
                        <el-input v-model="task4.deploy_name" placeholder="picc"></el-input>
                    </el-form-item>
                    <el-form-item label="部署目标">
                        <el-input v-model="task4.deploy_target" placeholder="ManagedServer7002"></el-input>
                    </el-form-item>
                    <el-form-item label="更新类型">
                        <el-radio-group v-model="update_type">
                            <el-radio label="全量更新"></el-radio>
                            <el-radio label="增量更新"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否备份">
                        <el-switch on-text="" off-text="" v-model="task4.backup_flag"></el-switch>
                    </el-form-item>
                    <el-form-item label="主控 IP">
                        <el-input v-model="task4.admin_ip" placeholder="0.0.0.0"></el-input>
                    </el-form-item>
                     <el-form-item label="主控端口">
                        <el-input v-model="task4.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="task4.weblogic_user" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="task4.weblogic_passwd" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>

                    <el-form-item label="上传文件">
                        <el-upload type="drag"
                            :action="computed_update_url"
                            :on-remove="fileRemove"
                            :on-success="fileSuccess"
                            :on-error="fileError"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将增量包拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                </div>

                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'Fallback'">
                    <el-form-item label="业务省份">
                        <el-input v-model="task5.picc_user" placeholder="fj3500"></el-input>
                    </el-form-item>
                    <el-form-item label="回滚目标">
                        <el-input v-model="task5.deploy_name" placeholder="picc"></el-input>
                    </el-form-item>
                    <el-form-item label="部署目标">
                        <el-input v-model="task5.deploy_target" placeholder="ManagedServer7002"></el-input>
                    </el-form-item>
                    <el-form-item label="主控 IP">
                        <el-input v-model="task5.admin_ip" placeholder="0.0.0.0"></el-input>
                    </el-form-item>
                     <el-form-item label="主控端口">
                        <el-input v-model="task5.admin_port" placeholder="7001"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="task5.weblogic_user" placeholder="Weblogic 用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="task5.weblogic_passwd" placeholder="Weblogic 密码"></el-input>
                    </el-form-item>
                </div>

                <!-- step 2 -->
                <div v-if="active === 2 && task_type === 'ClearCache'">
                    <el-form-item label="业务省份">
                        <el-input v-model="task6.picc_user" placeholder="fj3500"></el-input>
                    </el-form-item>
                    <el-form-item label="业务名称">
                        <el-input v-model="task6.picc_op_name" placeholder="car3g"></el-input>
                    </el-form-item>
                    <el-form-item label="业务编码">
                        <el-input v-model="task6.picc_org_code" placeholder="3500"></el-input>
                    </el-form-item>
                    <el-form-item label="受管名称">
                        <el-input v-model="task6.managed_name" placeholder="ManagedServer7002"></el-input>
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
                inventory_url: "/api/inventory",
                task_url: "/api/newtask",
                upload_url: "/api/upload",
                increupdate_url: "/api/increupdate",
                target_ip: null,
                update_type: '全量更新',
                task1: {
                    picc_user: null,
                    picc_op_name: null,
                    picc_org_code: null,
                    admin_port: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                },
                task2: {
                    picc_user: null,
                    picc_op_name: null,
                    picc_org_code: null,
                    admin_ip: null,
                    admin_port: null,
                    managed_port: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                },
                task3: {
                    picc_user: null,
                    admin_ip: null,
                    admin_port: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                    deploy_target: null,
                    deploy_name: null,
                    deploy_file: null,
                    deploy_type: 'deploy'
                },
                task4: {
                    picc_user: null,
                    admin_ip: null,
                    admin_port: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                    deploy_target: null,
                    deploy_name: null,
                    deploy_file: null,
                    backup_flag: true,
                    deploy_type: 'deploy'
                },
                task5: {
                    picc_user: null,
                    admin_ip: null,
                    admin_port: null,
                    weblogic_user: null,
                    weblogic_passwd: null,
                    deploy_target: null,
                    deploy_name: null,
                    deploy_type: 'deploy'
                },
                task6: {
                    picc_user: null,
                    picc_op_name: null,
                    picc_org_code: null,
                    managed_name: null,
                },
            }
        },
        computed: {
            computed_update_url() {
                if (this.task_type === "UpdateDeploy") {

                    if (this.update_type === "全量更新") {
                        return this.upload_url
                    }

                    else {
                        return this.increupdate_url
                    }
                }
                return this.upload_url
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
                if (this.task_type === "ManagedServer" || this.task_type === "ClearCache") {
                    this.select_ip_group = "ManagedServer";
                }
                else {
                    this.select_ip_group = "AdminServer";
                }
            },

            fileRemove(file, fileList) {
                this.$message.warning("上传文件被删除");
            },

            fileSuccess(file, fileList) {
                this.$message.success("上传成功");
                if(this.task_type === "Deploy") {
                    this.task3.deploy_file = fileList.name;
                    // this.task3.deploy_name = fileList.name.split('.').pop();
                }
                if (this.task_type === "UpdateDeploy") {
                    this.task4.deploy_file = fileList.name;
                }
            },

            fileError(file, fileList) {
                this.$message.error("上传文件失败");
            },

            fetchData(url) {
                ajax.get(url).then( (response) => {
                    this.vmdata = response.data;
                });
            },

            runTask() {
                let post_args = {
                    playbook_dir: '/etc/ansible',
                    inventory: '/usr/src/app/inventory.py',
                    limit: this.target_ip,
                }

                switch(this.task_type) {
                    case "AdminServer":
                        post_args.playbook = 'adminserver.yml';
                        post_args.extra_vars = [ this.task1 ];
                        break;

                    case "ManagedServer":
                        post_args.playbook = 'managedserver.yml';
                        post_args.extra_vars = [ this.task2 ];
                        break;

                    case "Deploy":
                        post_args.playbook = 'deploy.yml';
                        post_args.extra_vars = [ this.task3 ];
                        break;

                    case "UpdateDeploy":
                        if(this.update_type === "全量更新") {
                            post_args.playbook = 'deploy.yml';
                        }
                        else {
                            post_args.playbook = 'increupdate.yml';
                        }
                        post_args.extra_vars = [ this.task4 ];
                        break;

                    case "Fallback":
                        post_args.playbook = 'fallback.yml';
                        post_args.extra_vars = [ this.task5 ];
                        break;

                    case "ClearCache":
                        post_args.playbook = 'clearcache.yml';
                        post_args.extra_vars = [ this.task6 ];
                        break;

                    default:
                        console.log("Unknown task: " + this.task_type);
                        return;
                }

                ajax.post(this.task_url, post_args).then( (response) => {
                    
                    if ('task_id' in response.data) {
                        this.$message.success("任务创建成功");
                    }

                    else {
                        this.$message.error("任务创建失败");
                    }
                    setInterval( this.$router.push('tasks'), 500);
                })
            },
        }
    }
</script>