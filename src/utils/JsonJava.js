function titleCase(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
class Java {
  constructor(packageName, className) {
    /**
     * 包名
     */
    this._packageName = packageName;

    /**
     * 类名
     */
    this._className = className;

    /**
     * 需要导入的类
     */
    this._importList = [];

    /**
     * 字段信息
     */
    this._javaFieldList = [];

  }

  get packageName() {
    return this._packageName;
  }

  get className() {
    return this._className;
  }

  get importList() {
    return this._importList;
  }

  get javaFieldList() {
    return this._javaFieldList;
  }

  addImport(path) {
    if (this._importList.indexOf(path) < 0) {
      this._importList.push(path);
    }
  }

  addFiled(fieldName, fieldType, listDeep = 0) {
    const nameRep = /^[a-zA-Z_$][a-zA-Z0-9_$]*/;
    if(!nameRep.test(fieldName)) {
      throw new Error(`${fieldName}不符合JAVA名称规范`);
    }
    if (listDeep > 0) {
      this.addImport("java.util.List");
    }
    const langList = ["String", "Integer", "Double", "Object"];
    if (langList.indexOf(fieldType) < 0) {
      this.addImport(this._packageName + "." + fieldName +  "." + fieldType);
    }

    for (let i = 0; i < listDeep; i++) {
      fieldType = `List<${fieldType}>`;
    }

    this._javaFieldList.push({
      fieldName,
      fieldType
    });

  }

}
export default class JsonJava {

  constructor(jsonObj, packageName, className) {
    this._javaList = [];
    let newJava = new Java(packageName, className);
    this._javaList.push(newJava);

    this.handleObject(jsonObj, newJava);

  }

  handleObject(obj, java) {

    for (let key in obj) {
      let value = obj[key];
      let valueType = typeof value;
      if (valueType === "string") {
        java.addFiled(key, "String");
      } else if (valueType === "number") {
        if (value | 0 === value) {
          java.addFiled(key, "Integer");
        } else {
          java.addFiled(key, "Double");
        }
      } else if (valueType === "object") {
        if (value instanceof Array) {
          let deep = 1;
          let vl = value;
          while (vl != null && vl.length > 0 && vl[0] instanceof Array) {
            deep++;
            vl = vl[0];
          }

          if (vl == null || vl.length === 0) {
            java.addFiled(key, "Object", deep);
          } else {
            let valueType = typeof vl[0];
            if (valueType === "string") {
              java.addFiled(key, "String", deep);
            } else if (valueType === "number") {
              if (value | 0 === value) {
                java.addFiled(key, "Integer", deep);
              } else {
                java.addFiled(key, "Double", deep);
              }

            } else {
              let className = titleCase(key);
              java.addFiled(key, titleCase(key), deep);
              let newJava = new Java(java.packageName + "." + key, className);
              this._javaList.push(newJava);
              this.handleObject(vl[0], newJava);
            }
          }

        } else {
          let className = titleCase(key);
          java.addFiled(key, titleCase(key));
          let newJava = new Java(java.packageName + "." + key, className);
          this._javaList.push(newJava);
          this.handleObject(value, newJava);

        }
      }
    }

  }

  get javaList() {
    return this._javaList;
  }

}