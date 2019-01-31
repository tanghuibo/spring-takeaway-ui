import dataBaseApi from "@/serveapi/dataBaseApi.js";
const dbInfo = {
  state: {
    driverList: [],
    driverGetOver: false,
    defaultConfig: {
      
    },
    defaultConfigGetOver: false
    
  },
  mutations: {
    
    SET_DRIVER_LIST: (state, driverList) => {
      state.driverList = driverList;
      state.driverGetOver = true;
    },
    SET_DEFAULT_CONFIG: (state, defaultConfig) => {
      state.defaultConfig = defaultConfig;
      state.defaultConfigGetOver = true;
    }
  },
  getters: {
    driverList: state => state.driverList,
    defaultConfig: state => state.defaultConfig
  },
  actions: {
    async getDriverList({state, commit}) {
      if( !state.driverGetOver) {
        let driverList = await dataBaseApi.getDriverList();
        commit('SET_DRIVER_LIST', driverList);
      } 
    },

    async getDefaultConfig({state, commit}) {
      if( !state.defaultConfigGetOver) {
        let defaultConfig = await dataBaseApi.getDefaultConfig();
        commit('SET_DEFAULT_CONFIG', defaultConfig);
      } 
    },
    setDefaultConfig({commit}, data) {
      let defaultConfig = {...data};
      defaultConfig.tableNames = [];
      commit('SET_DEFAULT_CONFIG', defaultConfig);
    }
  }
}
export default dbInfo;