<template>
    <div class="wrap-bg">
        <div class="login-main">
            <el-form :model="loginForm" :rules="formRules" ref="loginForm" label-width="0px" class="login-wrap">
                <el-form-item label="">
                    <div class="login-title">完美后台审批系统</div>
                </el-form-item>
                <el-form-item label="" prop="username">
                    <el-input
                            placeholder="请输入用户名"
                            prefix-icon="iconfont icon-touxiang"
                            v-model="loginForm.username">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input
                            type="password"
                            placeholder="请输入密码"
                            prefix-icon="iconfont icon-mima"
                            v-model="loginForm.password">
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <asyncButton label="登录" @_click="handleClick" class="login-action" type="primary" round></asyncButton>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import asyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'

    const {mapState,mapActions} = createNamespacedHelpers('login');
    export default {
        components:{asyncButton},
        data(){
            return {
                loginForm:{
                    username:'',
                    password:''
                },
                formRules : {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'},],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        computed:{
            ...mapState({
                userInfo:'userInfo'
            })
        },
        methods:{
            ...mapActions({
                sendLogin:'sendLogin'
            }),
            handleClick(promise){
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        promise(this.sendLogin(this.loginForm).then(()=>{this.$router.push('/')}))
                    }
                });
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .wrap-bg{
        height: 100%;
        overflow: auto;
        background: url('../../assets/images/bg.jpg') no-repeat;
        background-size: cover;
        position: relative;
    }
    .login-wrap{
        width: 356px;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .login-title{
            font-size: 26px;
            font-weight: 400;
            color: #000;
            margin-bottom: 30px;
        }
        .login-action{
            width: 100%;
        }
    }
</style>