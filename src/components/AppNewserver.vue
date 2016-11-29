<template>
    <section class="content-container">
        <header>
            <h1 class="title">新建虚机</h1>
        </header>
        
        <div class="form-create">
            <el-form :model="submitdata" label-position="left" label-width="80px">
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
                        <el-input v-model="submitdata.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="SSH 端口">
                        <el-input v-model="submitdata.port"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="submitdata.user"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="submitdata.passwd"></el-input>
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
                    <el-radio-group v-model="submitdata.group">
                        <el-radio label="AdminServer">主控</el-radio>
                        <el-radio label="ManagedServer">受管</el-radio>
                        <el-radio label="Other">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="所在区域">
                    <el-select v-model="submitdata.area" placeholder="机器所在区域">
                        <el-option label="南中心" value="南中心"></el-option>
                        <el-option label="灾备中心" value="灾备中心"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
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
                createtype: 1,
                vmdata: [],
                ajax_url: '/inventory',
                submitdata: {
                    ip: null,
                    port: 22,
                    user: null,
                    passwd: null,
                    group: 'AdminServer',
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
                    console.log(response.data);
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
                    setTimeout( this.$router.push('vm'), 1500);
                });
            },
        }
    }
</script>