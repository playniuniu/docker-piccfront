<template>
    <section class="content-container">
        <header>
            <h1 class="title">新建虚机</h1>
        </header>
        
        <div class="form-create">
            <el-form :model="submitdata" label-position="left" label-width="80px">
                <el-form-item label="选择平台">
                    <el-select v-model="createtype" placeholder="请选择新建虚机类型">
                        <el-option label="手动创建" value="manual"></el-option>
                        <el-option label="从 VMWare 创建" value="vmware"></el-option>
                        <el-option label="从 Citrix 创建" value="citrix"></el-option>
                        <el-option label="从 CAS 创建" value="cas"></el-option>
                    </el-select>
                </el-form-item>

                <div v-if="createtype === 'manual'">
                    <el-form-item label="服务器 IP">
                        <el-input v-model="submitdata.ip"></el-input>
                    </el-form-item>
                </div>

                <div v-else>
                    <el-form-item label="虚机列表">
                        <el-select v-model="submitdata.ip" placeholder="虚机列表">
                            <el-option v-for="item in vmlist" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item label="SSH 端口">
                    <el-input v-model="submitdata.port"></el-input>
                </el-form-item>

                <el-form-item label="用户名">
                    <el-input v-model="submitdata.user"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="submitdata.passwd"></el-input>
                </el-form-item>

                <el-form-item label="业务类型">
                    <el-select v-model="submitdata.group" placeholder="请选择业务类型">
                        <el-option label="Weblogic 主控" value="AdminServer"></el-option>
                        <el-option label="Weblogic 受管" value="ManagedServer"></el-option>
                        <el-option label="Oracle 数据库" value="OracleDB"></el-option>
                        <el-option label="其他" value="others"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所在区域">
                    <el-select v-model="submitdata.area" placeholder="机器所在区域">
                        <el-option label="南中心" value="南中心"></el-option>
                        <el-option label="灾备中心" value="灾备中心"></el-option>
                    </el-select>
                </el-form-item>

                

                <el-form-item label="业务说明">
                    <el-input type="textarea" v-model="submitdata.desc"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submit">立即创建</el-button>
                    <el-button @click="cancel">取消</el-button>
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
    import ajax from '../utilities/ajax.js'

    export default {
        data() {
            return {
                createtype: 'manual',
                vmlist: ["10.10.24.148", "10.10.24.149", "10.10.24.150", "10.10.24.151"],
                vmdata: [],
                ajax_url: '/api/inventory',
                submitdata: {
                    ip: null,
                    port: 22,
                    user: null,
                    passwd: null,
                    group: null,
                    area: null,
                    desc: null,
                }
            }
        },
        mounted() {
            this.vmdata = this.fetchData(this.ajax_url);
        },
        methods: {
            submit() {
                if (this.vmdata === null) {
                    this.vmdata = [ this.submitdata ];
                }
                else {
                    this.vmdata.push(this.submitdata);
                }
                this.setData(this.ajax_url, this.vmdata);
            },
            cancel() {
                this.$router.push('vm')
            },
            fetchData(url) {
                ajax.get(url).then( (response) => {
                    this.vmdata = response.data;
                });
            },
            setData(url, data) {
                ajax.post(url, data).then( (response) => {
                    if ( response.data.status === "ok" ) {
                        this.$message.success('创建成功');
                    }
                    else {
                        this.$message.error('创建失败');
                    }
                    setInterval( this.$router.push('vm'), 500);
                });
            },
        }
    }
</script>