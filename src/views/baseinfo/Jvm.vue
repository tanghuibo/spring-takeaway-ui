<template>
  <div class="jvm">
    <el-collapse accordion v-model="activitiName">
      <el-collapse-item title="JVM配置信息" name="jvmProperties">
        <div>
          <el-form :inline="true" :model="jvmPropertieSearchForm">
            <el-form-item label="名称">
              <el-input v-model="jvmPropertieSearchForm.key" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="属性">
              <el-input v-model="jvmPropertieSearchForm.value" placeholder="属性"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getJvmProperties" :loading="refreshIng">刷新</el-button>
            </el-form-item>
          </el-form>
          <el-scrollbar wrap-class="collapse-scrollbar-wrapper">
            <el-table
              v-loading="refreshIng"
              :data="jvmProperties"
              stripe
              border
              style="margin-left: 5px;"
              :default-sort="{prop: 'key', order: 'ascending'}"
            >
              <el-table-column prop="key" label="名称" width="230" sortable></el-table-column>
              <el-table-column prop="value" label="属性" sortable></el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import baseinfoApi from "@/serveapi/baseinfoApi.js";
import commonUtil from "@/utils/commonUtil.js";
export default {
  data() {
    return {
      activitiName: "jvmProperties",
      refreshIng: false,
      jvmPropertieSearchForm: {
        key: null,
        value: null
      },
      allJvmProperties: []
    };
  },
  methods: {
    /**
     * @description 获取服务端配置信息
     * @returns
     */
    async getJvmProperties() {
      //进入loading
      this.refreshIng = true;
      try {
        /**
         * 获取数据为map格式，将其转换为list格式
         */
        let jvmPropertieMap = await baseinfoApi.getJvmProperties();
        let list = [];
        for (let key in jvmPropertieMap) {
          list.push({
            key,
            value: jvmPropertieMap[key]
          });
        }
        this.allJvmProperties = list;
      } finally {
        //退出loading
        this.refreshIng = false;
      }
    }
  },
  mounted() {
    this.getJvmProperties();
  },
  computed: {
    /**
     * @description 计算jvm配置信息
     * @returns jvm配置信息
     */
    jvmProperties() {
      let result = [...this.allJvmProperties];
      let key = this.jvmPropertieSearchForm.key;
      let value = this.jvmPropertieSearchForm.value;
      if (!commonUtil.isEmpty(key)) {
        key = key.trim();
        result = result.filter(item => item.key.indexOf(key) >= 0);
      }
      if (!commonUtil.isEmpty(value)) {
        value = value.trim();
        result = result.filter(
          item => !commonUtil.isEmpty(value) && item.value.indexOf(value) >= 0
        );
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.jvm {
  margin: 30px;
}
</style>
