<template>
  <div class="home">
    <el-button>haha</el-button>
  </div>
</template>

<script>
import request from '@/utils/request.js';
export default {
  name: 'home',
  async mounted() {
    console.log(await this.getData());
    
    
  },
  methods: {
     getData() {
      return request.get("jvm/jvm-properties");
    }
  }
}
</script>
