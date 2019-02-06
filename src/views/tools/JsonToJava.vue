<template>
  <div class="json-to-java">
    <!-- bidirectional data binding（双向数据绑定） -->
    <codemirror v-model="code" :options="cmOptions"></codemirror>
    <div class="submit-button">
      <el-button type="primary" @click="submitJson">生成java代码</el-button>
    </div>
    <json-to-java-generator-dialog ref="generator"/>
  </div>
</template>

<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/base16-dark.css";
import JsonToJavaGeneratorDialog from "@/components/Dialog/JsonToJavaGeneratorDialog.vue";
export default {
  components: {
    JsonToJavaGeneratorDialog
  },
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 4,
        mode: "application/json",
        theme: "idea",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },
  methods: {
    submitJson() {
      let jsonObj = null;
      try {
        jsonObj = JSON.parse(this.code);
      } catch (e) {
        this.$message.error(`json解析错误:${e.message}`);
      }
      if (jsonObj != null) {
        if (typeof jsonObj === "object" && !(jsonObj instanceof Array)) {
          this.$refs.generator.open(jsonObj);
        } else {
          this.$message.error(`必须输入一个非基本类型且非数组的对象`);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.json-to-java {
  margin: 20px;
  height: calc(100% - 100px);
  .vue-codemirror {
    height: 100%;
    border: 1px solid black;
    .CodeMirror {
      height: 100%;
    }
  }

  .submit-button {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
