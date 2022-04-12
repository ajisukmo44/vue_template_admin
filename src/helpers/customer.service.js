import axios from 'axios';
import { authHeader } from './authservice/auth-header';

const API_URL = process.env.VUE_APP_BASE_API_URL;

class CustomerServive {
    getAllCustomer() {
        return axios.get(API_URL+'customer', { headers: authHeader() });
    }
    getDetailCustomer(id) {
        return axios.get(API_URL+'customer/'+id, { headers: authHeader() });
    }
    // addCustomer(data) {
    //     return axios.post(API_URL+'customer', data, { headers: authHeader() });
    // }
    // updateCustomer(id, data) {
    //     return axios.patch(API_URL+'customer/'+id, data, { headers: authHeader() });
    // }
    // deleteCustomer(id) {
    //     return axios.delete(API_URL+'customer/'+id, { headers: authHeader() });
    // }
}

export default new CustomerServive();
