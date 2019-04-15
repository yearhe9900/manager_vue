<template>
  <el-container style="height:100%;">
    <el-header>Header</el-header>
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)">
        <sidebar class="sidebar-container"></sidebar>
      </el-aside>
      <el-container>
        <el-main>
          <app-main></app-main>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AppMain from "@/views/layout/components/AppMain"; //页面布局的右侧区域
import sidebar from "@/views/layout/components/sidebar"; //页面布局的左侧菜单

export default {
  name: "layout",
  components: {
    sidebar,
    AppMain
  }
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
