import generatorApi from "@/serveapi/generatorApi.js";
const dbInfo = {
  state: {
    defaultJsonToJavaConfig: {
      
    },
    defaultJsonToJavaConfigGetOver: false
    
  },
  mutations: {
    SET_DEFAULT_JSON_TO_JAVA_CONFIG: (state, defaultJsonToJavaConfig) => {
      state.defaultJsonToJavaConfig = defaultJsonToJavaConfig;
      state.defaultJsonToJavaConfigGetOver = true;
    }
  },
  getters: {
    defaultJsonToJavaConfig: state => state.defaultJsonToJavaConfig
  },
  actions: {

    async getDefaultGenerateJsonToJavaConfig({state, commit}) {
      if( !state.defaultJsonToJavaConfigGetOver) {
        let defaultJsonToJavaConfig = await generatorApi.getDefaultGenerateJsonToJavaConfig();
        commit('SET_DEFAULT_JSON_TO_JAVA_CONFIG', defaultJsonToJavaConfig);
      } 
    },
    setDefaultGenerateJsonToJavaConfig({commit}, data) {
      let defaultJsonToJavaConfig = {...data};
      commit('SET_DEFAULT_JSON_TO_JAVA_CONFIG', defaultJsonToJavaConfig);
    }
  }
}
export default dbInfo;