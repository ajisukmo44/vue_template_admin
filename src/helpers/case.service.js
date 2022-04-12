import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class CaseService {
    getAllCase() {
        return axios.get(API_URL+'case', { headers: authHeader() });
    }
    getCaseDetail(id) {
        return axios.get(API_URL+'case/'+id, { headers: authHeader() });
    }
}

export default new CaseService();
