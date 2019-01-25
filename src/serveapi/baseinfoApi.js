
import req from '@/utils/request.js';
export default {
  
  /**
   * @description 获取服务端运行时信息
   * @returns 服务端运行状态
   */
  getRuntimeInfo() {
    return req.get('/jvm/runtime-info');
  }, 
  
  /**
   * @description 获取jvm配置信息
   * @returns jvm配置属性
   */
  getJvmProperties() {
    return req.get('/jvm/jvm-properties');
  } 
};