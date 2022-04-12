import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class AgentService {
    getAllAgent() {
        return axios.get(API_URL+'agent', { headers: authHeader() });
    }
    getDetailAgent(id) {
        return axios.get(API_URL+'agent/'+id, { headers: authHeader() });
    }
    TrackingAgent(id, data) {
        return axios.post(API_URL+'track/'+id, data, { headers: authHeader() });
    }
    addAgent(data) {
        return axios.post(API_URL+'agent', data, { headers: authHeader() });
    }
    updateAgent(id, data) {
        return axios.patch(API_URL+'agent/'+id, data, { headers: authHeader() });
    }
    updatePasswordAgent(data) {
        return axios.post(API_URL+'admin/reset-password', data, { headers: authHeader() });
    }
    deleteAgent(id) {
        return axios.delete(API_URL+'agent/'+id, { headers: authHeader() });
    }
    bulkDeleteAgent(data) {
        return axios.post(API_URL+'agent/bulk-delete', data, { headers: authHeader() });
    }
}

export default new AgentService();
