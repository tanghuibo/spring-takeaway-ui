<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
    <div>
      <el-form ref="form" :model="generatorConfig" label-width="150px">
        <el-form-item label="作者">
          <el-input v-model="generatorConfig.author"></el-input>
        </el-form-item>
        <el-form-item label="工程路径">
          <el-input type="textarea" v-model="generatorConfig.projectPath"></el-input>
        </el-form-item>
        <el-form-item label="包名">
          <el-input v-model="generatorConfig.packageParentName"></el-input>
        </el-form-item>
        <el-form-item label="类名">
          <el-input v-model="generatorConfig.className"></el-input>
        </el-form-item>
        <el-form-item label="其它选项">
          <el-checkbox v-model="generatorConfig.entityLombokModel">使用lombok</el-checkbox>
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
import generatorApi from "@/serveapi/generatorApi.js";
import JsonJava from "@/utils/JsonJava.js";
export default {
  name: "JsonToJavaGeneratorDialog",
  props: {},
  data() {
    return {
      dialogVisible: false,
      jsonObj: [],
      loading: false,
      generatorConfig: {}
    };
  },
  computed: {
    ...mapGetters(["defaultJsonToJavaConfig"])
  },
  methods: {
    ...mapActions([
      "getDefaultGenerateJsonToJavaConfig",
      "setDefaultGenerateJsonToJavaConfig"
    ]),
    async open(jsonObj) {
      this.jsonObj = jsonObj;
      this.dialogVisible = true;
      await this.getDefaultGenerateJsonToJavaConfig();
      this.generatorConfig = { ...this.defaultJsonToJavaConfig };
    },
    async generatorCode() {
      this.loading = true;
      try {
        this.setDefaultGenerateJsonToJavaConfig(this.generatorConfig);
        let jsonJava = new JsonJava(
          this.jsonObj,
          this.defaultJsonToJavaConfig.packageParentName,
          this.defaultJsonToJavaConfig.className,
          this.defaultJsonToJavaConfig.projectPath,
          this.defaultJsonToJavaConfig.author,
          this.defaultJsonToJavaConfig.entityLombokModel
        );
        let data = jsonJava.javaList.map(item => {
          return {
            className: item.className,
            importList: item.importList,
            javaFieldInfoList: item.javaFieldList,
            packageName: item.packageName,
            projectPath: this.defaultJsonToJavaConfig.projectPath,
            author: this.defaultJsonToJavaConfig.author,
            entityLombokModel: this.defaultJsonToJavaConfig.entityLombokModel
          };
        });
        await generatorApi.generatorJsonToJavaCode(data);
        this.$message.success("代码生成成功");
        this.dialogVisible = false;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
