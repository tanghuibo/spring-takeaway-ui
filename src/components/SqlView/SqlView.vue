<template>
  <div v-loading="loading">
    <el-tabs type="border-card">
      <el-tab-pane label="数据操作"></el-tab-pane>
      <el-tab-pane label="表格信息">
        <all-sort-and-search-table
          v-if="loadingOver"
          :columns="fieldColumns"
          @getData="getFieldList"
        ></all-sort-and-search-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import AllSortAndSearchTable from "@/components/AllSortAndSearchTable/AllSortAndSearchTable.vue";
import dataBaseApi from "@/serveapi/dataBaseApi.js";
export default {
  components: {
    AllSortAndSearchTable
  },
  name: "SqlView",
  props: {
    /**
     * 初始数据
     */
    model: {
      type: Object
    }
  },
  data() {
    return {
      filedList: [],
      loading: true,
      loadingOver: false,
      fieldColumns: [
        {
          key: "fieldName",
          lable: "名称",
          width: 230
        },
        {
          key: "dataType",
          lable: "数据类型",
          width: 230,
          enSelectAble: true
        },
        {
          key: "comment",
          lable: "备注"
        }
      ]
    };
  },
  mounted() {
    this.getFieldInfo();
  },
  methods: {
    async getFieldInfo() {
      this.loading = true;
      this.loadingOver = false;
      try {
        this.filedList = await dataBaseApi.getFieldInfo(this.model.tableName);
      } finally {
        this.loading = false;
        this.loadingOver = true;
      }
    },
    getFieldList(setData, searchOver) {
      setData(this.filedList);
      searchOver();

    }
  }
};
</script>

<style scoped>
</style>
