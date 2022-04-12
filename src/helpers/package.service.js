import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class PackageService {
    getAllPackage() {
        return axios.get(API_URL+'packages', { headers: authHeader() });
    }
    addPackage(data) {
        return axios.post(API_URL+'packages', data, { headers: authHeader() });
    }
    updatePackage(id, data) {
        return axios.patch(API_URL+'packages/'+id, data, { headers: authHeader() });
    }
    deletePackage(id) {
        return axios.delete(API_URL+'packages/'+id, { headers: authHeader() });
    }
    bulkDeletePackage(data) {
        return axios.post(API_URL +'packages/bulk-delete', data, { headers: authHeader() });
    }
}

export default new PackageService();
