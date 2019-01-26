let kSize = 1024;
let mSize = 1024 * kSize;
let gSize = 1024 * mSize;
export default {

  /**
   * @description 数字转换单位 K M G 例子: 2048 => 2K
   * @param {Number} num 
   * @returns 
   */
  numberChangeHumanSee(num) {
    if (num > gSize) {
      return (num / gSize).toFixed(3) + "G";
    }

    if (num > mSize) {
      return (num / mSize).toFixed(3) + "M";
    }

    if (num > kSize) {
      return (num / mSize).toFixed(3) + "K";
    }
  },

  /**
   * @description 判断字符串是否为空
   * @param {string} obj 
   * @returns
   */
  isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || (obj + "").trim() == "") {
      return true;
    } else {
      return false;
    }
  },
  /**
   * @description map转list
   * @param {object} map 
   * @returns list
   */
  mapToList(map) {
    let list = [];
    for (let key in map) {
      list.push({
        key,
        value: map[key]
      });
    }
    return list;
  }
}