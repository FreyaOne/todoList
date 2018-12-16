<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">
            <p class="title" style="color:white;font-size:20px;">任务管理系统</p>
          </div>
          <div class="layout-nav">
            <div style="float:left;margin-left:145px;">
              <Dropdown placement="bottom-end" trigger="click" @on-click="pushToLogin">
                <a href="javascript:void(0)" style="color:white;">
                  Menu
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem :name="1">注销</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" style="height:621px;">
          <Menu theme="light" width="auto" class="sidebar-menu">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                查看任务
              </template>
              <MenuItem name="4"><router-link to="/hello/allTask" tag="p">所有任务</router-link></MenuItem>
              <MenuItem name="5"><router-link to="/hello/unFinishTask" tag="p">未完成</router-link></MenuItem>
              <MenuItem name="6"><router-link to="/hello/finishedTask" tag="p">已完成</router-link></MenuItem>
            </Submenu>
            <MenuItem name="2">
              <router-link to="/hello/today" tag="p">
                <Icon type="ios-alarm" style="margin-right:8px;"></Icon>
                今日任务
              </router-link>
            </MenuItem>
            <MenuItem name="3">
              <router-link to="/hello/newTask" tag="p">
                <Icon type="ios-keypad" style="margin-right:8px;"></Icon>
                  新建任务
              </router-link>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}" class="breadcurmb">
            <!--<BreadcrumbItem v-for="(nav,index) in breadList" :key="index">{{nav}}</BreadcrumbItem>-->
            <!--<BreadcrumbItem></BreadcrumbItem>-->
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>    <!--路由在此实现-->
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        data() {
            return {
                theme1: 'dark',
            }
        },
        methods: {
            pushToLogin(item) {
                this.$router.replace("/")    //跳转登录页面
            }

        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height:688px;
  }
  .layout-logo{
    width: 150px;
    height: 60px;
    border-radius: 3px;
    float: left;
    position: relative;
    left: 20px;
  }
  .layout-nav {
    width: 200px;
    height:60px;
    margin: 0 auto;
    margin-right: 10px;
  }
</style>
