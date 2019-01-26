
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
  },

   /**
   * @description 获取jvm配置信息
   * @returns jvm配置属性
   */
  getClassLoaderClasses() {
    return req.get('/jvm/classloader-class');
  },

  /**
   * @description 获取spring配置信息
   * @returns spring配置属性
   */
  getSpringProperties() {
    return req.get('/spring/spring-properties');
  },

  /**
   * @description 获取spring bean列表
   * @returns spring bean列表
   */
  getSpringBeans() {
    return req.get('/spring/spring-beans');
  }
};