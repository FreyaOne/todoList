<template>
    <div>
        <div align="right">
            <div style="float:left;">
                <p style="font-size: 20px; padding-left:10px;">任务列表</p>
            </div>
            <div>
                <Input placeholder="输入任务标题" clearable style="width: 200px;" v-model="searchTitle">
                <Icon type="ios-search" slot="suffix" />
                </Input>
                <Button name="" type="primary" style="width:60px;height:30px;font-size:10px;margin-left:10px" @click="onSearchByTitle">搜 索</Button>
            </div>
        </div>
        <div style="margin-top:20px;">
            <Table height="400" border ellipsis :columns="columns7" :data="data5"></Table>
        </div>
        <!--<input type="hidden" v-model="id" name="id" value=""/>-->
        <!--<input type="hidden" v-model="userId" name="userId" value=""/>-->
    </div>
</template>
<script>
    import axios from 'axios'
    import allTask from './allTask'
    export default {
        // events: {
        //     'searchA': function(items){
        //         console.log('44444444' + items);
        //     }
        // },
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
                        width:150,
                        align: 'center',
                        sortable:true,
                    },
                    {
                        title: '结束日期',
                        key: 'deadline',
                        width:150,
                        align: 'center'
                    },
                    {
                        title: '标记',
                        key: 'property',
                        width:150,
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
                        width:150,
                        align: 'center',
                        filters: [
                            {
                                label: '未完成',
                                value: '0'
                            },
                            {
                                label: '已完成',
                                value: '5'
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === '0') {
                                return row.complete == '未完成';
                            } else if (value === '5') {
                                return row.complete == '已完成';
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.show(params.index)
                                //         }
                                //     }
                                // }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight:'30px'
                                    },
                                    on: {
                                        click: () => {
                                           this.put(params.index);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(this.data6[params.index].id);
                                            this.onDeleteTodoItem(this.data6[params.index].id);
                                        }
                                    }
                                }, '删除')

                            ]);
                        }
                    }
                ],
                data6: [],
                data5: [],
                searchTitle:'',
            }
            // props:['searchTitle']
        },
        mounted() {
            //加载组件时从服务器获取数据
            this.getDataFromServer();
            // this.onSearchByTitle()
        },
        methods: {
            onDeleteTodoItem(itemid) {
                var self = this
                //删除item，其id为itemid

                var url = 'http://123.57.45.31:9000/todo/v1/todo/' + itemid
                //   url = 'http://127.0.0.1:9000/todo/v1/todo/' + itemid

                //使用delete方法删除数据,注意传参方式
                axios
                    .delete(url, {
                        data: {
                            userName: self.$store.state.user.userName,
                            userPassword: self.$store.state.user.userPassword
                        }
                    })
                    .then(function(response) {
                        //执行成功
                        if (response.data > 0) self.getDataFromServer()
                    })
                    .catch(function(error) {
                        console.log(error)
                        self.$router.push({ path: 'error' })
                    })
            },   //删除一个任务

            put(index){
                for (var i = 0; i < this.data5.length; i++) {
                    if (this.data5[i].property == '紧急') {
                        this.data6[i].property = '1';
                        // console.log('22222222222' + this.data5[i].property);
                    } else if (this.data5[i].property == '重要') {
                        this.data6[i].property = '2';
                    } else if (this.data5[i].property == '一般') {
                        this.data6[i].property = '3';
                    } else if (this.data5[i].property == '不急') {
                        this.data6[i].property = '4';
                    }
                    if(this.data5[i].complete == '未完成'){
                        this.data6[i].complete = "0";
                    }else if(this.data5[i].complete == '已完成'){
                        this.data6[i].complete = "5";
                    }
                }
                this.$router.push({path:'/hello/change',query:this.data6[index]});
            },   //将数据传给change界面
            onSearchByTitle() {
                var self = this
                this.data6 = []
                var url = 'http://123.57.45.31:9000/todo/v1/todos/title'
                //   url = 'http://127.0.0.1:9000/todo/v1/todos/title'
                // console.log(url)
                axios
                    .get(url, {
                        params: {
                            userName: self.$store.state.user.userName,
                            userPassword: self.$store.state.user.userPassword,
                            todo_title: self.searchTitle
                        }
                    })
                    .then(response => {
                        // this.data6 = [];
                        // this.data5 = [];
                        if (response.data != null && response.data != '') {
                            console.log(response.data);
                            self.data6 = response.data
                            self.data5 = self.data6;
                            // console.log('4444444444444' + self.data6)

                            for (var i = 0; i < this.data5.length; i++) {
                                if (this.data6[i].property == 1) {
                                    this.data5[i].property = '紧急';
                                    // console.log('22222222222' + this.data5[i].property);
                                } else if (this.data6[i].property == 2) {
                                    this.data5[i].property = '重要';
                                } else if (this.data6[i].property == 3) {
                                    this.data5[i].property = '一般';
                                } else if (this.data6[i].property == 4) {
                                    this.data5[i].property = '不急';
                                }
                                if(this.data6[i].complete == 0){
                                    this.data5[i].complete = '未完成';
                                }else if(this.data6[i].complete == 1){
                                    this.data5[i].complete = '已完成';
                                }
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                        self.$router.push({ path: '/error' })
                    })
            },    //通过标题查找
            getDataFromServer() {
                var self = this
                // var data6 = new array();
                var url = 'http://123.57.45.31:9000/todo/v1/todos'
                //  url = 'http://127.0.0.1:9000/todo/v1/todos'

                axios
                    .get(url, {
                        params: {
                            userName: self.$store.state.user.userName,
                            userPassword: self.$store.state.user.userPassword
                        }
                    })
                    .then(response => {
                        this.data6 = []
                        this.data5 = []
                        let data;
                        if (response.data != null && response.data != '') {

                            // console.log('77777 ' + Array.isArray(this.$route.query.data6));
                            // if (this.$route.query.data6 == undefined && Array.isArray(this.$route.query.data6) == false) {
                            self.data6 = response.data;
                            // console.log('9999999 ' + Array.isArray(this.$route.query.data6));
                            self.data5 = self.data6;
                            // }
                            // else {
                            // self.data6 = response.data
                            // self.data6 = this.$route.query.data6;
                            // self.data5 = self.data6;
                            // console.log('777777777' + Array.isArray(self.data5));
                            // }
                            // console.log(self.data5)
                            // self.data5 = self.data6;
                            // console.log('111111111' + this.data6[0].property);
                            for (var i = 0; i < this.data5.length; i++) {
                                if (this.data6[i].property == 1) {
                                    this.data5[i].property = '紧急';
                                    // console.log('22222222222' + this.data5[i].property);
                                } else if (this.data6[i].property == 2) {
                                    this.data5[i].property = '重要';
                                } else if (this.data6[i].property == 3) {
                                    this.data5[i].property = '一般';
                                } else if (this.data6[i].property == 4) {
                                    this.data5[i].property = '不急';
                                }
                                if (this.data6[i].complete == 0) {
                                    this.data5[i].complete = '未完成';
                                }
                                else if(this.data6[i].complete == 5){
                                    this.data5[i].complete = '已完成';
                                }

                                }

                            }

                    })
                    .catch(function(error) {
                        console.log(error)
                        self.$router.push({ path: '/error' })
                    })
            },    //获取所有任务
            remove (index) {
                this.data6.splice(index, 1);
            },


        },
    }
</script>

<style scoped>

</style>