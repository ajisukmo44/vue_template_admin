export function authHeader(multipart = false) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        if (multipart) {
            return { "Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + user.token };
        }
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}