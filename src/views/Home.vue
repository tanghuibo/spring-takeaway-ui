<template>
  <div class="home">
    <div class="home-main">
      <github-corner class="git_cat" url="https://github.com/tanghuibo/"/>
      <ve-liquidfill :data="chartData" :settings="chartSettings"></ve-liquidfill>
      <div class="baseinfo">
        <el-form label-width="45vw" size="mini">
          <el-form-item size="mini">
            <template slot="label">
              <div>
                <span style="margin-right: 28px">操作系统
                  <IconView class="icon" icon="icon-os"/>
                </span>：
              </div>
            </template>
            {{this.baseInfo.osName}}
          </el-form-item>

          <el-form-item size="mini">
            <template slot="label">
              <div>
                <span style="margin-right: 28px">CPU
                  <IconView class="icon" icon="icon-cpu"/>
                </span>：
              </div>
            </template>

            <!-- {{`${this.baseInfo.numCpus}核 ${this.cpuFrequencyInHz}`}} -->
            {{`${this.baseInfo.numCpus}核`}}
          </el-form-item>
          <el-form-item size="mini">
            <template slot="label">
              <div>
                <span style="margin-right: 28px">内存
                  <IconView class="icon" icon="icon-memory"/>
                </span>：
              </div>
            </template>
            {{this.memoryTotalBytes}}
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner/GithubCorner.vue";
import IconView from "@/components/IconView/IconView.vue";
import baseinfoApi from "@/serveapi/baseinfoApi.js";
import commonUtil from "@/utils/commonUtil.js";
export default {
  name: "home",
  components: {
    GithubCorner,
    IconView
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
        /**
         * cpu核心数
         */
        numCpus: null,
        /**
         * 空闲内存大小(Byte)
         */
        memoryFreeBytes: null,
        /**
         * 总内存大小
         */
        memoryTotalBytes: null,
        /**
         * 操作系统名称
         */
        osName: null,
        /**
         * cpu使用百分比
         */
        cpuUsage: null,
        /**
         * 内存使用情况
         */
        memoryUsage: null
      },
      /**
       * 定时器,页面销毁时需要手动销毁
       */
      timer: null
    };
  },
  beforeDestroy() {
    window.clearTimeout(this.timer);
  },
  computed: {
    // cpuFrequencyInHz() {
    //   return (
    //     commonUtil.numberChangeHumanSee(this.baseInfo.cpuFrequencyInHz) + " Hz"
    //   );
    // },
    memoryTotalBytes() {
      return (
        commonUtil.numberChangeHumanSee(this.baseInfo.memoryTotalBytes) + "Byte"
      );
    },
    chartData() {
      return {
        columns: ["key", "percent"],
        rows: [
          {
            key: "CPU",
            percent: this.baseInfo.cpuUsage
          },
          {
            key: "内存",
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

.icon {
  width: 28px;
  height: 28px;
  line-height: 28px;
  position: absolute;
}
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

