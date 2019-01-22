<template>
  <div id="app">
    <el-row>
      <el-col :span="3">
        <div class="left">
          <div class="left-head">
            <div class="left-title">
              <span>takeaway</span>
            </div>
          </div>
          <div>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">分组一</span>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <span slot="title">选项4</span>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import menuData from "@/assets/menu.json";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    console.log(menuData);
  }
};
</script>

<style scoped lang = "scss">
$head-height: 64px;
.left {
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  .left-head {
    height: $head-height;
    .left-title {
      text-align: center;
      line-height: $head-height;
      span {
        padding: 2px 25%;
        border-radius: 20px;
        background-color: rgb(228, 245, 239);
        font-weight: 100;
        &:hover {
          background-color: rgb(235, 248, 243);
        }
      }
    }
  }
}
</style>
