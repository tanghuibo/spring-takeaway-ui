<template>
  <div class="jvm">
    <el-tabs type="border-card">
      <el-tab-pane label="JVM配置信息">
        <all-sort-and-search-table :columns="jvmColumns" @getData="getJvmData"/>
      </el-tab-pane>
      <el-tab-pane label="Class信息">
        <all-sort-and-search-table :columns="classColumns" @getData="getClass"/>
      </el-tab-pane>
      <el-tab-pane label="jar包信息">
        <all-sort-and-search-table :columns="jarColumns" @getData="getJar"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseinfoApi from "@/serveapi/baseinfoApi.js";
import AllSortAndSearchTable from "@/components/Table/AllSortAndSearchTable.vue";
import commonUtil from "@/utils/commonUtil.js";
export default {
  components: {
    AllSortAndSearchTable
  },
  data() {
    return {
      activitiName: "jvmProperties",
      jvmColumns: [
        {
          key: "key",
          lable: "名称",
          width: 230
        },
        {
          key: "value",
          lable: "属性"
        }
      ],
      classColumns: [
        {
          key: "simpleClassName",
          lable: "类名",
          width: 230
        },
        {
          key: "classLoaderName",
          lable: "类加载器",
          width: 230,
          enSelectAble: true
        },
        {
          key: "className",
          lable: "全类名"
        }
      ],
      jarColumns: [
         {
          key: "jarName",
          lable: "名称",
          width: 230
        },
        {
          key: "jarPath",
          lable: "路径"
        }

      ]
    };
  },
  methods: {
    async getJvmData(setData, searchOver) {
      try {
        let jvmPropertieMap = await baseinfoApi.getJvmProperties();
        let list = commonUtil.mapToList(jvmPropertieMap);
        setData(list);
      } finally {
        searchOver();
      }
    },
    async getClass(setData, searchOver) {
      try {
        let list = await baseinfoApi.getClassLoaderClasses();
        setData(list);
      } finally {
        searchOver();
      }
    },
    async getJar(setData, searchOver) {
      try {
        let list = await baseinfoApi.getJars();
        setData(list);
      } finally {
        searchOver();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.jvm {
  margin: 30px;
}
</style>
