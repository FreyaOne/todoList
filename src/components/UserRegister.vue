<template>
    <body background="http://www.knoed.com/_resources/img/homebg_bahs.jpg" style="height: 687px;">
    <div class="container" style="background:rgb(80, 80, 80)">
        <div style="padding-top:10px;padding-left:30px;">
            <p style="font-size:25px;font-weight:600;color: white">任务管理系统</p>
        </div>
    </div>
    <div>
        <!--<div style="width:300px; height:76px; margin-left:560px;" >-->
            <!--<Alert banner closable type="error" show-icon>-->
                <!--An error prompt-->
                <!--<p slot="desc">-->
                <!--Custom error description copywriting.-->
                 <!--</p>-->
            <!--</Alert>-->
        <!--</div>-->
        <Card style="width:378px;height:462px;margin-left:517px;margin-top:60px;">
            <div style="height:45px;">
                <p slot="title" style="text-align:center;font-size:30px;padding-top:5px;">欢迎</p>
                <p align="center" style="color:red">{{serverMsg}}</p>
            </div>
            <div class="biaodan" style="margin-top:35px; margin-left:10px;">
                <div style="margin-top: 6px">
                        <div style="padding-left:25px;">
                            <p>用户名</p>
                        </div>
                        <!--<div style="padding-left:25px;float:right; margin-right:35px;color:red;">-->
                            <!--<p>nihao</p>-->
                        <!--</div>-->
                    <div style="margin-top:5px;" align="center">
                        <Input type="text" v-model="newUserName" id="name" placeholder="请输入用户名" clearable style="width: 280px;">
                        <Icon type="ios-person" slot="prefix" />
                        </Input>
                    </div>
                </div>
                <div style="margin-top: 24px">
                    <div style="padding-left:25px;">
                        <p>密码</p>
                    </div>
                    <div style="margin-top:5px;" align="center">
                        <Input type="password" v-model="newUserPwd" id="pwd" placeholder="请输入密码" clearable style="width: 280px;">
                        <Icon type="ios-contact" slot="prefix" />
                        </Input>
                    </div>
                </div>
            </div>
            <div class="tijiao" align="center" style="margin-top:50px;">
                <Button type="primary" style="width:280px;height:45px;font-size:20px" @click="onNewUser">注 册</Button>
            </div>
        </Card>

    </div>
    </body>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'UserRegister',
        data(){
            return {newUserName: '', newUserPwd: '', serverMsg: ''}
        },
        methods: {
            // handleRouter() {
            //     this.$router.push('/login');
            // },
            ok:function(){
                this.$Message.success("注册成功");
            },
            onNewUser:function(){
                var self = this
                var url = 'http://123.57.45.31:9000/user/v1/user'
                //使用post方法提交数据
                axios
                    .post(url, {
                        userName: self.newUserName,
                        userPassword: self.newUserPwd
                    })
                    .then(function (response) {
                        //注册成功，跳转到登录页面
                        if (response.data){
                            self.$router.push({path: '/login'});
                            self.ok();
                        }
                        else{
                            self.serverMsg = '用户名已存在，请重新尝试'
                        }
                    })
                    .catch(function (error) {
                        //失败
                        console.log(error)
                        self.$router.push({path: '/error'})
                    })
            }
        }
    }
</script>

<style scoped>

</style>