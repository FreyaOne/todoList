<template>
    <div>
        <div style="height:30px;">
            <div style="float:left">
                <p style="font-size: 20px; padding-left:10px;">任务列表</p>
            </div>
            <div style="float:right;padding-right:30px;" @click="data1">
                <a>
                    <Icon type="ios-alarm" size="24" color="red"></Icon>
                </a>
            </div>
        </div>
        <div style="margin-top:20px;">
            <Table height="400" border ellipsis :columns="columns7" :data="data7"></Table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '任务标题',
                        key: 'title',
                        width: 250,
                        align: 'center',
                        tooltip: true,
                    },
                    {
                        title: '开始日期',
                        key: 'beginDate',
                        width:200,
                        align: 'center',
                        sortable:true,
                    },
                    {
                        title: '结束日期',
                        key: 'deadline',
                        width:200,
                        align: 'center'
                    },
                    {
                        title: '标记',
                        key: 'property',
                        width:200,
                        align: 'center',
                        filters: [
                            {
                                label: '紧急',
                                value: '1'
                            },
                            {
                                label: '重要',
                                value: '2'
                            },
                            {
                                label: '一般',
                                value: '3'
                            },
                            {
                                label: '不急',
                                value: '4'
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === '1') {
                                return row.property == '紧急';
                            } else if (value === '2') {
                                return row.property == '重要';
                            }else if (value === '3') {
                                return row.property == '一般';
                            } else if (value === '4') {
                                return row.property == '不急';
                            }
                        }
                    },
                    {
                        title: '任务完成度',
                        key: 'complete',
                        align: 'center',
                        // filters: [
                        //     {
                        //         label: '未完成',
                        //         value: '0'
                        //     },
                        //     {
                        //         label: '已完成',
                        //         value: '5'
                        //     }
                        // ],
                        // filterMultiple: false,
                        // filterMethod (value, row) {
                        //     if (value === '0') {
                        //         return row.complete == '未完成';
                        //     } else if (value === '5') {
                        //         return row.complete == '已完成';
                        //     }
                        // }
                    },
                ],
                data6: [],
                data7: [],

            }
        },
        mounted() {
            //加载组件时从服务器获取数据
            this.getTodayTask();
        },
        methods: {
            getTodayTask() {    //获取今日任务
                console.log("000000000000 你好你好");
                var self = this;
                // var data6 = new array();
                var url = 'http://123.57.45.31:9000/todo/v1/todos';
                //  url = 'http://127.0.0.1:9000/todo/v1/todos'

                axios
                    .get(url, {
                        params: {
                            userName: self.$store.state.user.userName,
                            userPassword: self.$store.state.user.userPassword,
                        }
                    })
                    .then(response => {
                        this.data6 = [];
                        this.data7 = [];
                        this.temp = [];
                        let moment = require('moment');
                        if (response.data != null && response.data != '') {
                            console.log(response.data);
                            self.data6 = response.data;
                            // console.log("222222" + self.data6);
                            console.log("55555551 " + this.data6.length);
                            console.log('66666666661 ' + this.data6[0].beginDate);
                            for (var i = 0; i < this.data6.length; i++) {
                                var startTime = this.data6[i].beginDate.replace(/-/g, '/');   //格式化日期格式
                                var endTime = this.data6[i].deadline.replace(/-/g, '/');
                                var todayTime = moment().format("YYYY-MM-DD").replace(/-/g, '/');
                                var sTime = new Date(startTime).getTime();   //开始时间距1970年的毫秒
                                var eTime = new Date(endTime).getTime();     //结束时间距1970年的毫秒
                                var tTime = new Date(todayTime).getTime();   //现在时间距1970年的毫秒
                                // console.log("22222222222 " + tTime - sTime <=0);
                                if (tTime - sTime >= 0 && tTime - eTime <=0) {
                                    // console.log("1111111111 " + tTime - eTime);
                                    // console.log("3333333" + this.data6[i].property);
                                    this.temp.push(this.data6[i]);
                                    this.data7.push(this.data6[i]);
                                    // console.log('22222222222' + this.temp[i].property);
                                    // }
                                }
                                // console.log("111111111" + this.temp[i].property);
                            }
                            console.log("666661 " + this.data7.length);
                            // console.log(self.data5)
                            // self.data5 = self.data6;

                            for (var j = 0; j < this.data7.length; j++) {
                                if (this.temp[j].property == 1) {
                                    this.data7[j].property = '紧急';     //将value转化为汉字
                                    // console.log('22222222222' + this.data5[i].property);
                                } else if (this.temp[j].property == 2) {
                                    this.data7[j].property = '重要';
                                } else if (this.temp[j].property == 3) {
                                    this.data7[j].property = '一般';
                                } else if (this.temp[j].property == 4) {
                                    this.data7[j].property = '不急';
                                }
                                if (this.temp[j].complete == 0) {
                                    this.data7[j].complete = '未完成';
                                } else if (this.temp[j].complete == 5) {
                                    this.data7[j].complete = '已完成';
                                }
                            }

                        }


                    })
                    .catch(function(error) {
                        console.log(error)
                        self.$router.push({ path: '/error' })
                    })
            },
            open () {
                this.$Notice.open({
                    title: 'Notification title',
                    // desc: 'Here is the notification description. Here is the notification description. '
                });
            },
            getFinishingTask(){    //获取即将结束任务
                var self = this;
                // var data6 = new array();
                var url = 'http://123.57.45.31:9000/todo/v1/todos';
                //  url = 'http://127.0.0.1:9000/todo/v1/todos'

                axios
                    .get(url, {
                        params: {
                            userName: self.$store.state.user.userName,
                            userPassword: self.$store.state.user.userPassword,
                        }
                    })
                    .then(response => {
                        this.data6 = [];
                        this.data7 = [];
                        this.temp = [];
                        let moment = require('moment');
                        if (response.data != null && response.data != '') {
                            self.data6 = response.data;
                            for (var i = 0; i < this.data6.length; i++) {
                                if(this.data6[i].deadline == moment().format("YYYY-MM-DD")){
                                    console.log("----------");
                                    self.open(false);
                                }
                            }
                        }
                            console.log("666661 " + this.data7.length);

                    })
                    .catch(function(error) {
                        console.log(error)
                        self.$router.push({ path: '/error' })
                    })
            },
            data1(){
                let moment = require('moment');
                console.log("111111111111 " + this.data6);
                for(var j = 0;j<this.data6.length;j++){
                    if(this.data6[j].deadline == moment().format("YYYY-MM-DD")){     //结束日期与今日日期是否相同
                        console.log("----------");
                        this.$Notice.open({
                            title: '任务提醒',
                            desc: this.data6[j].title + '任务 即将结束'
                        });
                    }
                }
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
        },
    }
</script>

<style scoped>

</style>