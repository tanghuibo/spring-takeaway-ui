<template>
  <div id="app">
    <el-row style="margin-right: 10px">
      <el-col :span="3">
        <div class="left">
          <div class="left-head" @click="goHome">
            <text-hover-effect class="mallki-txt" text="spring-takeaway" />
          </div>
          <div>
            <el-scrollbar :native="false" wrap-class="left-scrollbar-wrapper">
              <MenuView/>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
      <el-col :span="21">
       <el-scrollbar :native="false" wrap-class="right-scrollbar-wrapper">
          <router-view/>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TextHoverEffect from "@/components/TextHoverEffect/TextHoverEffect.vue";
import MenuView from "@/components/MenuView/MenuView.vue";
export default {
  components: {
    TextHoverEffect,
    MenuView
  },
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/");
    }
  },
  mounted() {}
};
</script>

<style scoped lang = "scss">
$head-height: 6vh;
.left {
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  .left-head {
    text-align: center;
    .mallki-txt {
      line-height: $head-height;
    }
  }
}
.right-head {
  line-height: $head-height;
}
</style>
