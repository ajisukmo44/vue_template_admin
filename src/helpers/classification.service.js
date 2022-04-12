import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class ClassificationService {
    getAllClassification() {
        return axios.get(API_URL+'classification', { headers: authHeader() });
    }
    addClassification(data) {
        return axios.post(API_URL+'classification', data, { headers: authHeader() });
    }
    updateClassification(id, data) {
        return axios.patch(API_URL+'classification/'+id, data, { headers: authHeader() });
    }
    deleteClassification(id) {
        return axios.delete(API_URL+'classification/'+id, { headers: authHeader() });
    }
    bulkDeleteClassification(data) {
        return axios.post(API_URL +'classification/bulk-delete', data, { headers: authHeader() });
    }
}

export default new ClassificationService();
