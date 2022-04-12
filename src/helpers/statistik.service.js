import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class UserService {
    getAllUser() {
        return axios.get(API_URL+'user', { headers: authHeader() });
    }
    getAllManager() {
        return axios.get(API_URL+'manager-list', { headers: authHeader() });
    }
    getProfile() {
        return axios.get(API_URL+'user-profile', { headers: authHeader() });
    }
}

export default new UserService();
