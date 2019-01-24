
import req from '@/utils/request.js';
export default {
  getRuntimeInfo() {
    return req.get('/jvm/runtime-info');
    
  } 
};