<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
    <div :v-loading="!defaultConfigInit">
      <el-form ref="form" :model="generatorConfig" label-width="150px">
        <el-form-item label="数据库url">
          <el-input type="textarea" v-model="generatorConfig.url"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="generatorConfig.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="generatorConfig.password"></el-input>
        </el-form-item>
        <el-form-item label="JDBC驱动">
          <el-select
            filterable
            no-match-text
            style="width: 100%"
            v-model="generatorConfig.jdbcDrive"
          >
            <el-option v-for="jdbc in driverList" :key="jdbc" :label="jdbc" :value="jdbc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表前缀">
          <el-input v-model="generatorConfig.tablePrefix"></el-input>
        </el-form-item>
        <el-form-item label="字段前缀">
          <el-input v-model="generatorConfig.fieldPrefix"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="generatorConfig.author"></el-input>
        </el-form-item>
        <el-form-item label="工程路径">
          <el-input type="textarea" v-model="generatorConfig.projectPath"></el-input>
        </el-form-item>
        <el-form-item label="公共包路径">
          <el-input v-model="generatorConfig.packageParentName"></el-input>
        </el-form-item>
        <el-form-item label="其它选项">
          <el-checkbox v-model="generatorConfig.entityLombokModel">使用lombok</el-checkbox>
          <el-checkbox v-model="generatorConfig.fileOverride">是否覆盖已存在的文件</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="generatorCode">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dataBaseApi from "@/serveapi/dataBaseApi.js";
export default {
  name: "SqlGeneratorDiaLog",
  props: {},
  data() {
    return {
      dialogVisible: false,
      tableList: [],
      defaultConfigInit: false,
      loading: false,
      generatorConfig: {}
    };
  },
  computed: {
    ...mapGetters(["driverList", "defaultConfig"])
  },
  methods: {
    ...mapActions(["getDriverList", "getDefaultConfig", "setDefaultConfig"]),
    async open(tableList) {
      this.tableList = tableList;
      this.dialogVisible = true;
      this.getDriverList();
      if (!this.defaultConfigInit) {
        await this.getDefaultConfig();
        this.generatorConfig = { ...this.defaultConfig };
        this.defaultConfigInit = true;
      }
    },
    async generatorCode() {
      this.loading = true;
      try {
        this.setDefaultConfig(this.generatorConfig);
        this.generatorConfig.tableNames = this.tableList.map(
          item => item.tableName
        );
        await dataBaseApi.generatorCode(this.generatorConfig);
        this.dialogVisible = false;
      } finally {
        this.loading = false;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>
