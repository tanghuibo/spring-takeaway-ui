import req from '@/utils/request.js';
export default {

  /**
   * @description 获取数据库表列表
   * @returns 数据库表列表
   */
  getTableList() {
    return req.get('/database/tables');
  },

  /**
   * @description 获取表格字段
   * @param {string} tableName 表格名称
   * @returns 表格字段信息
   */
  getFieldInfo(tableName) {
    return req.get('/database/fields', {
      params: {
        tableName
      }
    });
  },

  /**
   * @description 获取代码生成器默认属性
   * @retruns 默认配置信息
   */
  getDefaultConfig() {
    return req.get('/mybatis-generator/default-generate-mybatis-config');
  },

  /**
   * @description 生成代码
   * @param {object} config 配置属性
   * @returns 生成结果
   */
  generatorCode( config ) {
    return req.post('/mybatis-generator/mybatis-code', config);
  },

  /**
   * @description 获取driverClass列表
   * @return driverClass列表
   */
  getDriverList() {
    return req.get('/database/driver-list');
  }
};