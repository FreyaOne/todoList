<template>
    <div class="main">
        <div class="header" style="width:1142px;height:59px;">
            <div style="font-size: 15px; width:560px; height:54px;">
                <p style="padding-bottom: 5px;">任务标题</p>
                <Input v-model="title" placeholder="Enter title..." clearable style="width: 400px" />
            </div>
        </div>
        <div style="font-size:15px; width:560px; height:54px;margin-top:30px;">
            <Row>
                <Col span="12">
                    <p style="padding-bottom: 5px;">开始日期</p>
                    <DatePicker type="date" v-model="startDate" placeholder="Select date" style="width: 200px"></DatePicker>
                </Col>
                <Col span="12">
                    <p style="padding-bottom: 5px;">结束日期</p>
                    <DatePicker type="date" v-model="endDate" placeholder="Select date" style="width: 200px"></DatePicker>
                </Col>
            </Row>
        </div>
        <div style="margin-top:30px;font-size:15px">
            <p style="padding-bottom: 5px;">任务详情</p>
            <Input type="textarea" v-model="detail" :rows="4" placeholder="Enter something..." style="width:800px" />
        </div>
        <div>
            <div style="margin-top: 25px; font-size:15px; float:left;">
                <p style="padding-bottom: 5px;">标记</p>
                <RadioGroup v-model="important" >
                    <Radio label="1" style="color:red;">
                        <Icon type="ios-flag" />
                        <span>紧急</span>
                    </Radio>
                    <Radio label="2" style="color: darkorange;">
                        <Icon type="ios-flag" />
                        <span>重要</span>
                    </Radio>
                    <Radio label="3" style="color: dodgerblue;">
                        <Icon type="ios-flag" />
                        <span>一般</span>
                    </Radio>
                    <Radio label="4" style="color: dimgrey;">
                        <Icon type="ios-flag" />
                        <span>不急</span>
                    </Radio>
                </RadioGroup>
            </div>
            <div style="float:right; font-size: 15px; margin-right:550px; margin-top: 25px; float:right;">
                <p style="padding-bottom: 5px;">完成度</p>
                <RadioGroup v-model="finish" >
                    <Radio label="0" style="color:red;">
                        <Icon type="ios-flag" />
                        <span>未完成</span>
                    </Radio>
                    <Radio label="5" style="color: dodgerblue;">
                        <Icon type="ios-flag" />
                        <span>已完成</span>
                    </Radio>
                </RadioGroup>
            </div>
        </div>
        <div style="margin-top:120px;">
            <Button type="primary" @click="onChangeTodo" long style="height:50px; font-size:20px;">确 定</Button>
            <input type="hidden" v-model="id" name="id" value=""/>
            <input type="hidden" v-model="userId" name="userId" value=""/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Todo',
        data(){
            return {
                // data6:this.$route.query,
                id:this.$route.query.id,
                userId:this.$route.query.userId,
                title: this.$route.query.title,
                startDate: this.$route.query.beginDate,
                endDate: this.$route.query.deadline,
                detail: this.$route.query.content,
                important: this.$route.query.property,
                finish: this.$route.query.complete,
                // data6:[],
                // title: '',
                // startDate: '',
                // endDate: '',
                // detail: '',
                // important: '',
                // finish: '',
                // searchTitle: ''
            }
        },
        mounted(){
            console.log("111111111");
        },
        methods: {
            onChangeTodo() {
                var self = this;

                var user = {
                    userName: self.$store.state.user.userName,
                    userPassword: self.$store.state.user.userPassword
                }
                // var _beginDate = new Date(
                //     Date.parse(self.startDate.replace(/-/g, '/'))
                // )
                // var _deadline = new Date(
                //     Date.parse(self.endDate.replace(/-/g, '/'))
                // )
                var todo = {
                    id: this.id,
                    userId: this.userId,
                    title: this.title,
                    content: this.detail,
                    beginDate: this.startDate,
                    deadline: this.endDate,
                    property: parseInt(this.important),
                    complete: parseInt(this.finish),
                    completeDesc: ''
                }

                var url = 'http://123.57.45.31:9000/todo/v1/todo'
                // url = 'http://127.0.0.1:9000/todo/v1/todo'
                //使用put方法提交数据
                axios
                    .put(url, {
                        user,
                        todo
                    })
                    .then(response => {
                        // if (response.data != null && response.data != 1) {
                        if (response.data > 0) {
                            this.$router.push({path:'/hello/allTask'});
                        }else{
                            console.log(response.data);
                            console.log("000000000000");
                        }

                    })
                    .catch(function(error) {
                        console.log(error);
                        self.$router.push({ path: '/error' })
                    })
            },

        }
    }

</script>

<style scoped>

</style>