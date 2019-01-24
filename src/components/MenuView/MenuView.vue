<template>
  <el-menu
    @select="selectMenu"
    mode="vertical"
    :default-active="activitiIndex"
    :unique-opened="true"
  >
    <div v-for="menu in menuList" :key="menu.id">
      <div v-if="menu.children != null && menu.children.length > 0">
        <el-submenu :index="menu.id">
          <template slot="title">
            <i v-if="menu.icon" :class="menu.icon"></i>
            <span>{{menu.title}}</span>
          </template>
          <el-menu-item
            v-for="menuC in menu.children"
            :key="menuC.id"
            :index="menuC.id"
          >{{menuC.title}}</el-menu-item>
        </el-submenu>
      </div>
      <div v-else>
        <el-menu-item :index="menu.id">
          <i v-if="menu.icon" :class="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
      </div>
    </div>
  </el-menu>
</template>

<script>
import menuList from "@/assets/menu.json";
export default {
  data() {
    return {
      activitiIndex: null,
      menuList: [],
      menuIdMap: {},
      menuUrlMap: {}
    };
  },
  watch: {
    $route(to) {

      this.changeMenuActive(to.path);
      
    }
  },
  methods: {
    selectMenu(index) {
      this.$router.push(this.menuIdMap[index]);
    },
    changeMenuActive(path) {
       this.activitiIndex = this.menuUrlMap[path];
       
    }
  },
  mounted() {
    this.menuList = menuList;
    let parentId = 1;
    menuList.forEach(item => {
      item.id = "" + parentId++;
      if (item.url != null) {
        this.menuIdMap[item.id] = item.url;
        this.menuUrlMap[item.url] = item.id;
      }
      let childrenId = 1;
      let children = item.children;
      if (children != null) {
        children.forEach(itemC => {
          itemC.id = item.id + "-" + childrenId++;
          if (itemC.url != null) {
            this.menuIdMap[itemC.id] = itemC.url;
            this.menuUrlMap[itemC.url] = itemC.id;
          }
        });
      }
    });

    let path = this.$route.path;
    this.changeMenuActive(path);
  }
};
</script>

<style scoped>
</style>
