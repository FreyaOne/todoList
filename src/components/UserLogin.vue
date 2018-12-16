<template>
   <body background="http://www.knoed.com/_resources/img/homebg_bahs.jpg">
       <div class="container" style="background:rgb(80, 80, 80)">
           <div style="padding-top:10px;padding-left:30px;">
           <p style="font-size:25px;font-weight:600;color: white">任务管理系统</p>
           </div>
       </div>
       <div>
            <Card style="width:378px;height:462px;margin-left:517px;margin-top:60px;">
                <div style="height:45px;">
                 <p slot="title" style="text-align:center;font-size:30px;padding-top:5px;">欢迎</p>
                 <!--<p align="center" style="color:red">{{serverMsg}}</p>-->
                </div>
                <div class="biaodan" style="margin-top:35px; margin-left:10px;">
                    <div style="margin-top: 6px">
                        <div style="padding-left:25px">
                            <p>用户名</p>
                        </div>
                        <div style="margin-top:5px;" align="center">
                            <Input type="text" v-model="newUserName" placeholder="请输入用户名" clearable style="width: 280px;">
                                <Icon type="ios-person" slot="prefix" />
                            </Input>
                        </div>
                    </div>
                    <div style="margin-top: 24px">
                        <div style="padding-left:25px;">
                            <p>密码</p>
                        </div>
                        <div style="margin-top:5px;" align="center">
                            <Input type="password" v-model="newUserPwd" placeholder="请输入密码" clearable style="width: 280px;">
                                <Icon type="ios-contact" slot="prefix" />
                            </Input>
                        </div>
                    </div>
                </div>
                <div class="tijiao" align="center" style="margin-top:50px;">
                    <Button type="primary" style="width:280px;height:45px;font-size:20px" @click="onNewUser">登 录</Button>
                </div>
                <div style="float: right; margin-top: 100px; font-size:15px;">
                    <router-link to="/register" tag="a">注 册</router-link>
                </div>
            </Card>
         </div>
   </body>
</template>

<script>
    import axios from 'axios'
    import store from './../store'
    export default {
        name: 'UserLogin',
        data() {
            return { newUserName: '', newUserPwd: ''}
        },
        methods:{
            onNewUser(){
                var self = this
                var url = 'http://123.57.45.31:9000/user/v1/login'
                //   url = 'http://127.0.0.1:9000/user/v1/login'

                //使用get方法提交数据
                axios
                    .get(url, {
                        params: {
                            userName: self.newUserName,
                            userPassword: self.newUserPwd
                        }
                    })
                    .then(function(response) {
                        if (response.data != null && response.data != '') {
                            store.dispatch('setUser', {
                                userName: self.newUserName,
                                userPassword: self.newUserPwd
                            })

                            console.log(store.state.user)
                            if (response.data) self.$router.push({ path: '/Hello/allTask' })
                            // else self.serverMsg = '输入错误，请重新尝试'
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                        self.$router.push({ path: '/error' })
                    })
            }

        }
    }
</script>

<style scoped>
    body{
        width:1439px;
        height:687px;
    }
    .container{
        width:1439px;
        height: 62px;
    }
</style>