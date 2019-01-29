<template>
  <div class="spring">
    <el-tabs type="border-card">
      <el-tab-pane label="Spring配置信息">
        <all-sort-and-search-table
          :columns="springPropertyColumns"
          @getData="getspringPropertyData"
        />
      </el-tab-pane>
      <el-tab-pane label="Spring Bean列表">
        <all-sort-and-search-table :columns="springBeanColumns" @getData="getspringBeanData"/>
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
      springPropertyColumns: [
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
      springBeanColumns: [
        {
          key: "beanName",
          lable: "名称",
          width: 230
        },
        {
          key: "simpleClassName",
          lable: "简类名",
          width: 230
        },
        {
          key: "className",
          lable: "全类名"
        }
      ]
    };
  },
  methods: {
    async getspringPropertyData(setData, searchOver) {
      try {
        let springPropertieMap = await baseinfoApi.getSpringProperties();
        let list = commonUtil.mapToList(springPropertieMap);
        setData(list);
      } finally {
        searchOver();
      }
    },
    async getspringBeanData(setData, searchOver) {
      try {
        let list = await baseinfoApi.getSpringBeans();
        setData(list);
      } finally {
        searchOver();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.spring {
  margin: 30px;
}
</style>
