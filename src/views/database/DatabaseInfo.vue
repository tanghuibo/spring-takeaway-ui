<template>
  <div class="database-info">
    <el-tabs type="border-card">
      <el-tab-pane label="数据库信息">
      </el-tab-pane>

      <el-tab-pane label="表格信息">
        <all-sort-and-search-table :columns="tableColumns" @getData="getTableList"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import dataBaseApi from "@/serveapi/dataBaseApi.js";
import AllSortAndSearchTable from "@/components/AllSortAndSearchTable/AllSortAndSearchTable.vue";
export default {
  components: {
    AllSortAndSearchTable
  },
  data() {
    return {
      tableColumns: [
        {
          key: "tableName",
          lable: "表名"
        }
      ]
    };
  },
  methods: {
    async getTableList(setData, searchOver) {
      try {
        let list = await dataBaseApi.getTableList();
        setData(list);
      } finally {
        searchOver();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.database-info {
  margin: 30px;
}
</style>
