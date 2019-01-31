<template>
  <div class="database-info">
    <el-tabs type="border-card">
      <el-tab-pane label="表格信息">
        <all-sort-and-search-table
          showPanel
          showSelect
          :columns="tableColumns"
          @getData="getTableList"
        >
          <template slot="table" slot-scope="{ data }">
            <sql-view :model="data"/>
          </template>

          <template slot="form" slot-scope="{ data }">
            <el-button
              type="primary"
              :disabled="data == null || data.length === 0"
              @click="() => getGeneratorTable(data)"
            >生成代码</el-button>
          </template>
        </all-sort-and-search-table>
        <sql-generator-dialog ref="SqlGeneratorDialog"/>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import dataBaseApi from "@/serveapi/dataBaseApi.js";
import AllSortAndSearchTable from "@/components/Table/AllSortAndSearchTable.vue";
import SqlView from "@/components/SqlView/SqlView.vue";
import SqlGeneratorDialog from "@/components/Dialog/SqlGeneratorDialog.vue";
export default {
  components: {
    AllSortAndSearchTable,
    SqlView,
    SqlGeneratorDialog
  },
  data() {
    return {
      tableColumns: [
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
  comments() {
    this.getDriverList();
  },
  methods: {
    async getTableList(setData, searchOver) {
      try {
        let list = await dataBaseApi.getTableList();
        setData(list);
      } finally {
        searchOver();
      }
    },
    getGeneratorTable(data) {
      this.$refs.SqlGeneratorDialog.open(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.database-info {
  margin: 30px;
}
</style>
