import req from '@/utils/request.js';
export default {

  /**
   * @description 获取数据库表列表
   * @returns 数据库表列表
   */
  getTableList() {
    return req.get('/database/tables');
  },

  getFieldInfo(tableName) {
    return req.get('/database/fields', {
      params: {
        tableName
      }
    });
  }
};