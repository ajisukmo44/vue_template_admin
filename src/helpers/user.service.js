import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class UserService {
    // admin
    getAllUser() {
        return axios.get(API_URL+'admin', { headers: authHeader() });
    }

    getDetailUser(id) {
        return axios.get(API_URL+'admin/'+id, { headers: authHeader() });
    }
    addUser(data) {
        return axios.post(API_URL+'admin', data, { headers: authHeader() });
    }
    updateUser(id, data) {
        return axios.patch(API_URL+'admin/'+id, data, { headers: authHeader() });
    }
    deleteUser(id) {
        return axios.delete(API_URL+'admin/'+id, { headers: authHeader() });
    }
    bulkDeleteUser(data) {
        return axios.post(API_URL +'admin/bulk-delete', data, { headers: authHeader() });
    }
    updatePasswordAdmin(data) {
        return axios.post(API_URL+'admin/reset-password', data, { headers: authHeader() });
    }
    

    // profile
    getProfile() {
        return axios.get(API_URL+'account/detail', { headers: authHeader() });
    }
    updateProfile(data) {
        return axios.post(API_URL+'account/change-profile', data, { headers: authHeader() });
    }
    updateUserAvatar(data) {
        return axios.post(API_URL + 'account/change-avatar', data, {headers: authHeader() });
    }
    updateChangePassword(id, data) {
        return axios.post(API_URL +'account/change-password/'+id, data, {headers: authHeader() });
    }
    

}

export default new UserService();
