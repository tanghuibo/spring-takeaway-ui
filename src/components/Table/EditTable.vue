<template>
  <div>
    <div v-loading="loading">
      <el-form :inline="true" :model="searchForm" style="margin-top: 20px;">
        <el-form-item v-for="column in columns" :key="column.key" :label="column.lable">
          <el-input v-model="searchForm[column.key]" :placeholder="column.lable" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="resetSearch">重置查询</el-button>
        </el-form-item>
      </el-form>
      <el-scrollbar wrap-class="collapse-scrollbar-wrapper" :native="false">
        <el-table
          :data="dataList"
          stripe
          border
          style="margin-left: 5px;"
          :default-sort="{prop: columns[0].key, order: 'ascending'}"
          @sort-change="sortChange"
        >
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
export default {
  name: "EditTable",
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
    this.columns.forEach(element => {
      searchForm[element.key] = "";
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
       * 数据
       */
      dataList: [],

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
  methods: {
    setData(data) {
      this.dataList = data;
    },
    /**
     * @description 排序改变事件
     * @param {object} param
     */
    sortChange(param) {
      this.sortKey = param.prop;
      this.sortOrderAsc = param.order === "ascending";
      this.search();
    },
    searchOver() {
      this.loading = false;
    },
    resetSearch() {
      for (let key in this.searchForm) {
        this.searchForm[key] = null;
      }
      this.search();
    },
    search() {
      this.loading = true;
      this.$emit("getData", this.setData, this.searchOver, {
        searchForm: this.searchForm,
        sortKey: this.sortKey,
        sortOrderAsc: this.sortOrderAsc,
        pageSize: this.pageSize,
        currentPage: this.currentPage

      });
    }
  },
  watch: {
    pageSize() {
      this.search();
    },
    currentPage() {
      this.search();
    }

  }
};
</script>

<style scoped>
</style>
