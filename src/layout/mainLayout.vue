<template>
    <div class="admin-layout">
        <section class="top clearfix">
            <div class="logo-wrap">
                <span class="m-blank"></span>
                <img class="img-logo" src="../assets/images/logo-wm.png" alt="">
            </div>
            <div class="user-info">
                <el-button type="text">
                    <i class="iconfont icon-touxiang">管理员</i>
                </el-button>
                <el-button @click="_loginOut" type="text">[退出]</el-button>
            </div>
        </section>
        <section class="body">
            <div class="left">
                <el-menu
                        router
                        :default-active="defaultRouter"
                        class="menu-bar"
                        background-color="#42485b"
                        text-color="#fff"
                        active-text-color="#fff">
                    <el-menu-item index="/approveList">
                        <i class="iconfont icon-shenhe"></i>
                        <span slot="title">审核列表</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapState,mapActions} = createNamespacedHelpers('login');
    export default {
        name: "adminLayout",
        computed:{
            ...mapState({
                userInfo:'userInfo'
            }),
            defaultRouter(){
                return this.$route.path;
            }
        },
        methods:{
            ...mapActions({
                loginOut:'sendLoginout'
            }),
            _loginOut(){
                this.loginOut();
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .admin-layout{
        display: flex;
        flex-direction: column;
        height: 100%;
        background: url("../assets/images/bg.jpg") no-repeat;
        background-size: cover;
        .top{
            height: 102px;
            line-height: 102px;
            background-color: #3c8dbc;
            padding: 0 50px;
            color: #fff;
            .logo-wrap{
                float: left;
                height: 102px;
            }
            .pro-name{
                font-size:30px;
                font-weight:normal;
                color:rgba(255,255,255,1);
                margin-left: 30px;
            }
            .iconfont{
                font-size: 14px;
            }
        }
        .user-info{
            float: right;
            color: #fff;
            button{
                font-size: 14px;
                color: #fff;
            }
        }
        .img-logo{
            width: 146px;
            height: 47px;
            vertical-align: middle;
            cursor: pointer;
        }
        .body{
            flex: 1;
            display: flex;
            flex-direction: row;
            .left{
                width: 200px;
                height: 100%;
                background-color: #42485b;
                margin-top: -1px;
            }
            .right{
                flex: 1;
                overflow: auto;
                padding: 15px;
            }
        }
    }
    .menu-bar{
        text-align: center;
        padding-top: 15px;
    }
    .el-menu{
        border-right: none;
    }
    .el-menu-item.is-active{
        background-color: #3c8dbc !important;
    }
</style>