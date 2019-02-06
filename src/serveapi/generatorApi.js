
import req from '@/utils/request.js';
export default {
  
  /**
   * @description 获取json转java默认配置信息
   * @returns 服务端运行状态
   */
  getDefaultGenerateJsonToJavaConfig() {
    return req.get('/generator/default-generate-json-to-java-config');
  },

  generatorJsonToJavaCode(list) {

    return req.post('/generator/generate-json-to-java', list);

  }
};