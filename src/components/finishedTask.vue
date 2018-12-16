<template>
    <div>
        <div align="left">
            <div>
                <p style="font-size: 20px; padding-left:10px;">任务列表</p>
            </div>
            <!--<div>-->
                <!--<Input placeholder="输入任务标题" clearable style="width: 200px;" v-model="searchTitle">-->
                <!--<Icon type="ios-search" slot="suffix" />-->
                <!--</Input>-->
                <!--<Button name="" type="primary" style="width:60px;height:30px;font-size:10px;margin-left:10px" @click="onSearchByTitle">搜 索</Button>-->
            <!--</div>-->
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
                    // {
                    //     type: 'selection',
                    //     width: 50,
                    //     align: 'center'
                    // },
                    {
                        title: '任务标题',
                        key: 'title',
                        width: 250,
                        align: 'center',
                        tooltip: true,
                        // render: (h, params) => {
                        //     return h('div', [
                        //         h('Icon', {
                        //             props: {
                        //                 type: 'person'
                        //             }
                        //         }),
                        //         h('strong', params.row.title)
                        //     ]);
                        // }
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
                        //         return row.finish == '未完成';
                        //     } else if (value === '5') {
                        //         return row.finish == '已完成';
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
            this.getFinishedTask()
        },
        methods: {
            getFinishedTask() {
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
                        if (response.data != null && response.data != '') {
                            console.log(response.data)
                            self.data6 = response.data;
                            // console.log("222222" + self.data6);
                            console.log("55555551 " + this.data6.length);
                            for (var i = 0; i < this.data6.length; i++) {
                                if (this.data6[i].complete == 5) {
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
                                    this.data7[j].property = '紧急';
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
            remove (index) {
                this.data6.splice(index, 1);
            },
        },
        // mounted: function(){
        //     // var storage = window.localStorage
        //     // this.data6 = storage['lists']
        // }
    }
</script>

<style scoped>

</style>