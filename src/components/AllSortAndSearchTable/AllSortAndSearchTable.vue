<template>
  <div>
    <div>
      <el-form :inline="true" :model="searchForm" style="margin-top: 20px;">
        <el-form-item v-for="column in myColumns" :key="column.key" :label="column.lable">
          <el-input
            v-if="!column.enSelectAble"
            v-model="searchForm[column.key]"
            :placeholder="column.lable"
            clearable
          ></el-input>
          <el-select v-model="searchForm[column.key]" clearable v-else>
            <el-option v-for="item in column.selectList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearch">重置查询</el-button>
          <el-button type="primary" @click="search" :loading="loading">刷新</el-button>
        </el-form-item>
      </el-form>
      <el-scrollbar wrap-class="collapse-scrollbar-wrapper" :native="false">
        <el-table
          v-loading="loading"
          :data="pageDataList"
          stripe
          border
          style="margin-left: 5px;"
          :default-sort="{prop: columns[0].key, order: 'ascending'}"
          @sort-change="sortChange"
        >
          <el-table-column v-if="showPanel" type="expand">
            <template slot-scope="{ row }">
               <slot :data="row"></slot>
            </template>
           
          </el-table-column>
          <el-table-column
            v-for="column in columns"
            :key="column.key"
            :prop="column.key"
            :label="column.lable"
            :width="column.width"
            sortable="custom"
          ></el-table-column>
        </el-table>
      </el-scrollbar>
      <div style="margin: 20px">
        <el-pagination
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataList.length"
        ></el-pagination>
      </div>
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
    },
    showPanel: {
      type: Boolean,
      default: false
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
        enSelectAble: element.enSelectAble === true,
        selectList: []
      });
    });

    return {
      /**
       * 查询表单
       */
      searchForm: searchForm,

      /**
       * 刷新中
       */
      loading: false,

      /**
       * 所有的数据
       */
      allDataList: [],

      /**
       * 我的列表头
       */
      myColumns: myColumns,

      /**
       * 起始页
       */
      currentPage: 1,

      /**
       * 每页条数
       */
      pageSize: 10,

      /**
       * 排序字段
       */
      sortKey: null,

      /**
       * 排序是否为升序
       */
      sortOrderAsc: true
    };
  },
  mounted() {
    this.search();
  },
  computed: {
    /**
     * @description 数据赛选和排序
     */
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

      if (!commonUtil.isEmpty(this.sortKey)) {
        result.sort((item1, item2) => {
          let compareResult = item1[this.sortKey].localeCompare(
            item2[this.sortKey]
          );

          compareResult = this.sortOrderAsc ? compareResult : -compareResult;

          return compareResult;
        });
      }

      return result;
    },

    /**
     * @description 数据分页
     */
    pageDataList() {
      let start = Math.min(
        this.dataList.length,
        (this.currentPage - 1) * this.pageSize
      );
      let end = Math.min(
        this.dataList.length,
        this.currentPage * this.pageSize
      );
      let result = this.dataList.slice(start, end);
      return result;
    }
  },
  methods: {
    setData(data) {
      this.allDataList = data;

      let enSelectAbleColumns = this.myColumns.filter(
        element => element.enSelectAble
      );
      enSelectAbleColumns.forEach(element => {
        element.selectList = data
          .map(element2 => element2[element.key])
          .filter((element3, index, self) => self.indexOf(element3) === index);
      });
    },
    /**
     * @description 排序改变事件
     * @param {object} param
     */
    sortChange(param) {
      this.sortKey = param.prop;
      this.sortOrderAsc = param.order === "ascending";
    },
    searchOver() {
      this.loading = false;
    },
    resetSearch() {
      for (let key in this.searchForm) {
        this.searchForm[key] = null;
      }
    },
    search() {
      this.loading = true;
      this.resetSearch();
      this.$emit("getData", this.setData, this.searchOver);
    }
  }
};
</script>

<style scoped>
</style>
