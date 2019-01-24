<template>
  <div class="home">
    <div class="home-main">
      <GithubCorner class="git_cat" url="https://github.com/tanghuibo/"/>
      <ve-liquidfill :data="chartData" :settings="chartSettings"></ve-liquidfill>
      <div class="baseinfo">
        <el-form label-width="45vw" size="mini">
          <el-form-item label="操作系统：" size="mini">{{this.baseInfo.osName}}</el-form-item>
          <el-form-item label="cpu频率：" size="mini">{{this.cpuFrequencyInHz}}</el-form-item>
          <el-form-item label="cpu核心数：" size="mini">{{this.baseInfo.numCpus}}</el-form-item>
          <el-form-item label="内存：" size="mini">{{this.memoryTotalBytes}}</el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner/GithubCorner.vue";
import baseinfoApi from "@/serveapi/baseinfoApi.js";
import commonUtil from "@/utils/commonUtil.js";
export default {
  name: "home",
  components: {
    GithubCorner
  },
  data() {
    this.chartSettings = {
      seriesMap: [
        {
          color: ["green", "red", "green"],
          label: {
            formatter(options) {
              return `${options.seriesName}\n${parseInt(
                options.data.value * 100
              )}%`;
            },
            fontSize: 30
          },
          center: ["40%", "50%"],
          radius: "40%"
        },
        {
          label: {
            formatter(options) {
              return `${options.seriesName}\n${parseInt(
                options.data.value * 100
              )}%`;
            },
            fontSize: 30
          },
          center: ["60%", "50%"],
          radius: "40%"
        }
      ]
    };
    return {
      baseInfo: {
        cpuFrequencyInHz: null,
        numCpus: null,
        memoryFreeBytes: null,
        memoryTotalBytes: null,
        osName: null,
        cpuUsage: null,
        memoryUsage: null
      },
      timer: null
    };
  },
  beforeDestroy() {
    window.clearTimeout(this.timer);
  },
  computed: {
    cpuFrequencyInHz() {
      return (
        commonUtil.numberChangeHumanSee(this.baseInfo.cpuFrequencyInHz) + " Hz"
      );
    },
    memoryTotalBytes() {
      return (
        commonUtil.numberChangeHumanSee(this.baseInfo.memoryTotalBytes) +
        " Byte"
      );
    },
    chartData() {
      return {
        columns: ["city", "percent"],
        rows: [
          {
            city: "CPU",
            percent: this.baseInfo.cpuUsage
          },
          {
            city: "内存",
            percent: this.baseInfo.memoryUsage
          }
        ]
      };
    }
  },
  mounted() {
    this.getRuntimeInfo();
    this.timer = setInterval(this.getRuntimeInfo, 2000);
  },
  methods: {
    async getRuntimeInfo() {
      let data = await baseinfoApi.getRuntimeInfo();
      this.baseInfo = data;
    }
  }
};
</script>



<style lang="scss" scoped>
$cat_right: 32px;
.home {
  .home-main {
    padding: $cat_right;
    position: relative;
    .git_cat {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }
  }
}
.baseinfo {
  background-color: #eee;
  .el-form-item--mini.el-form-item {
    margin-bottom: 5px;
  }
}
</style>

