<template>
  <div>
    <div>
      <el-form :inline="true" :model="searchForm" style="margin-top: 20px;">
        <el-form-item v-for="column in myColumns" :key="column.key" :label="column.lable">
          <el-input
            v-if="!column.enSelect"
            v-model="searchForm[column.key]"
            :placeholder="column.lable"
            clearable
          ></el-input>
          <el-select v-model="searchForm[column.key]" v-else>
            <el-option
              v-for="item in column.selectList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearch">重置查询</el-button>
          <el-button type="primary" @click="search" :loading="refreshIng">刷新</el-button>
        </el-form-item>
      </el-form>
      <el-scrollbar wrap-class="collapse-scrollbar-wrapper">
        <el-table
          v-loading="refreshIng"
          :data="dataList"
          stripe
          border
          style="margin-left: 5px;"
          :default-sort="{prop: columns[0].key, order: 'ascending'}"
        >
          <el-table-column
            v-for="column in columns"
            :key="column.key"
            :prop="column.key"
            :label="column.lable"
            :width="column.width"
            sortable
          ></el-table-column>
        </el-table>
      </el-scrollbar>
      <div style="margin: 20px">{{`共${dataList.length}条数据`}}</div>
    </div>
  </div>
</template>

<script>
import commonUtil from "@/utils/commonUtil.js";
export default {
  name: "AllSortAndSearchTable",
  props: {
    /**
     * column数组
     */
    columns: {
      type: Array
    }
  },
  data() {
    let searchForm = {};
    let myColumns = [];
    this.columns.forEach(element => {
      searchForm[element.key] = "";
      myColumns.push({
        key: element.key,
        lable: element.lable,
        width: element.width,
        enSelect: element.enSelect === true,
        selectList: []
      });
    });

    return {
      searchForm: searchForm,
      refreshIng: false,
      allDataList: [],
      myColumns: myColumns
    };
  },
  mounted() {
    this.search();
  },
  computed: {
    dataList() {
      let result = [...this.allDataList];
      this.columns.forEach(column => {
        let key = column.key;
        let value = this.searchForm[key];
        if (!commonUtil.isEmpty(value)) {
          value = value.trim().toLowerCase();
          result = result.filter(
            item => (item[key] + "").toLowerCase().indexOf(value) >= 0
          );
        }
      });

      return result;
    }
  },
  methods: {
    setData(data) {
      this.allDataList = data;
      let enSelectColumns = this.myColumns.filter(element => element.enSelect);
      enSelectColumns.forEach(element => {
        element.selectList = data
          .map(element2 => element2[element.key])
          .filter((element3, index, self) =>  self.indexOf(element3) === index);
      });
      console.log(enSelectColumns);
      console.log(this.myColumns);
      
    },
    searchOver() {
      this.refreshIng = false;
    },
    resetSearch() {
      for (let key in this.searchForm) {
        this.searchForm[key] = null;
      }
    },
    search() {
      this.refreshIng = true;
      this.$emit("getData", this.setData, this.searchOver);
    }
  }
};
</script>

<style scoped>
</style>
