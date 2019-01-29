<template>
  <div class="database-info">
    <el-tabs type="border-card">

      <el-tab-pane label="表格信息">
        <all-sort-and-search-table showPanel :columns="tableColumns" @getData="getTableList">
          <template slot-scope="{ data }">
            <sql-view :model="data"/>

          </template>
        </all-sort-and-search-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import dataBaseApi from "@/serveapi/dataBaseApi.js";
import AllSortAndSearchTable from "@/components/Table/AllSortAndSearchTable.vue";
import SqlView from "@/components/SqlView/SqlView.vue";
export default {
  components: {
    AllSortAndSearchTable,
    SqlView
  },
  data() {
    return {
      tableColumns: [
        {
          key:"type",
          lable:"类型",
          width: 230,
          enSelectAble: true
        },
        {
          key: "tableName",
          lable: "表名",
          width: 230
        },
        {
          key: "comment",
          lable: "备注"
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
