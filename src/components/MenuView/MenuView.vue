<template>
  <el-menu
    @select="selectMenu"
    mode="vertical"
    :default-active="activitiIndex"
    :unique-opened="true"
  >
    <!--循环遍历菜单 -->
    <div v-for="menu in menuList" :key="menu.id">
      <div v-if="menu.children != null && menu.children.length > 0">
        <el-submenu :index="menu.id">
          <template slot="title">
            <icon-view v-if="menu.icon" class="icon" :icon="menu.icon"/>
            <span>{{menu.title}}</span>
          </template>
          <el-menu-item v-for="menuC in menu.children" :key="menuC.id" :index="menuC.id">
            <template slot="title">
              <icon-view v-if="menuC.icon" class="icon" :icon="menuC.icon"/>
              <span>{{menuC.title}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </div>
      <div v-else>
        <el-menu-item :index="menu.id">
          <icon-view v-if="menu.icon" class="icon" :icon="menu.icon"/>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
      </div>
    </div>
  </el-menu>
</template>

<script>
import menuList from "@/assets/menu.json";
import IconView from "@/components/IconView/IconView.vue";
export default {
  name: "hone",
  components: {
    IconView
  },
  data() {
    return {
      /**
       * 激活菜单索引
       */
      activitiIndex: null,

      /**
       * 菜单列表
       */
      menuList: [],

      /**
       * key => 菜单id value => 菜单url
       */
      menuIdMap: {},

      /**
       * key => 菜单url value => 菜单id
       */
      menuUrlMap: {}
    };
  },
  watch: {
    $route(to) {
      this.changeMenuActive(to.path);
    }
  },
  methods: {
    /**
     * @description 改变菜单事件
     * @param {String} index 菜单id
     * @returns
     *
     */
    selectMenu(index) {
      this.$router.push(this.menuIdMap[index]);
    },
    /**
     * @description 通过path改变激活的菜单
     * @param {String} path 菜单url
     * @returns
     *
     */
    changeMenuActive(path) {
      this.activitiIndex = this.menuUrlMap[path];
    }
  },
  mounted() {
    this.menuList = menuList;

    /**
     * 给菜单设置id,规则如下:[{
     *  id:1,
     *  children: [
     *    { id: 1-1 }
     *  ]
     * },{ id: 2 }];
     *
     * 顺便建立索引menuIdMap,menuUrlMap
     */
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
.icon {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 15px;
}
</style>
