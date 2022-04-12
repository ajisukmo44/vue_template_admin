import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class RegionService {
    getAllRegion() {
        return axios.get(API_URL+'region', { headers: authHeader() });
    }
    addRegion(data) {
        return axios.post(API_URL+'region', data, { headers: authHeader() });
    }
    updateRegion(id, data) {
        return axios.patch(API_URL+'region/'+id, data, { headers: authHeader() });
    }
    deleteRegion(id) {
        return axios.delete(API_URL+'region/'+id, { headers: authHeader() });
    }
    bulkdeleteRegion(data) {
        return axios.post(API_URL +'region/bulk-delete', data, { headers: authHeader() });
    }
}

export default new RegionService();
