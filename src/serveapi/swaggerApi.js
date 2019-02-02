import req from '@/utils/request.js';
export default {
  downloadSpringApi(form) {
    return req.post("/swagger-docment/download", form);

  }
  
}