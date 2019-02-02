<template>
  <div class="document-swagger">
    <el-form :model="dowmloadApiForm" :inline="true">
      <el-form-item label="语言">
        <el-select v-model="dowmloadApiForm.language" placeholder>
          <el-option
            v-for="language in languages"
            :key="language.code"
            :value="language.code"
            :label="language.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文档格式">
        <el-select v-model="dowmloadApiForm.fileType" placeholder>
          <el-option
            v-for="fileType in fileTypes"
            :key="fileType"
            :value="fileType"
            :label="fileType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="downloadApi">下载接口文档</el-button>
    </el-form>
    <iframe src="../swagger-ui.html" width="100%" class="iframe"></iframe>
  </div>
</template>

<script>
import swaggerApi from "@/serveapi/swaggerApi.js";
export default {
  data() {
    return {
      languages: [
        {
          code: "ZH",
          name: "中文"
        },
        {
          code: "EN",
          name: "English"
        }
      ],
      fileTypes: ["md", "adoc", "txt"],
      dowmloadApiForm: {
        language: "ZH",
        fileType: "md",
        hostUrl: null
      }
    };
  },
  methods: {
    async downloadApi() {
      this.dowmloadApiForm.hostUrl = window.location.href.substring(0, window.location.href.indexOf('/spring-takeaway-ui'));
      let data = await swaggerApi.downloadSpringApi(this.dowmloadApiForm);
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", `swagger-api.${this.dowmloadApiForm.fileType}`);

      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.document-swagger {
  margin: 10px;
  .iframe {
    height: calc(100vh - 100px);
  }
}
</style>
