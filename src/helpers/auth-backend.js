import axios from 'axios';

const API_URL = process.env.VUE_APP_BASE_API_URL;

// array in local storage for registered users
// let users = JSON.parse(localStorage.getItem('users'))
//     || [{ username: "admin", email: "admin@admin.com", password: "admin!@#" }];

export function configureBackend() {

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                
                    let params = JSON.parse(opts.body);
                    return axios
                    .post(API_URL + 'auth/login', {
                      email: params.email,
                      password: params.password
                    })
                    .then(response => {
                      if (response.data.success) {
                        // localStorage.setItem('user', JSON.stringify(response.data.data));
                        // localStorage.setItem('token', JSON.stringify(response.data.access_token));
                        let user = response.data.data;
                        let responseJson = {
                            username: user.username,
                            type: user.user_type,
                            email: user.email,
                            avatar: user.avatar,
                            is_active: user.is_active,
                            token: response.data.access_token,
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                      } 
                      return;
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            // console.log('err res ->',error.response);
                        reject(error.response.data.message);
                        }
                        else if(error.response.status === 404) {
                                reject('Server not found.');
                        }
                    });
                }

                // get users
                // if (url.endsWith('/users') && opts.method === 'GET') {
                //     // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //     if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                //         resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                //     } else {
                //         // return 401 not authorised if token is null or invalid
                //         reject('Unauthorised');
                //     }
                //     return;
                // }

                // get user by id
                // if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                //     if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                //         // find user by id in users array
                //         let urlParts = url.split('/');
                //         let id = parseInt(urlParts[urlParts.length - 1]);
                //         let matchedUsers = users.filter(user => { return user.id === id; });
                //         let user = matchedUsers.length ? matchedUsers[0] : null;

                //         // respond 200 OK with user
                //         resolve({ ok: true, text: () => JSON.stringify(user) });
                //     } else {
                //         // return 401 not authorised if token is null or invalid
                //         reject('Unauthorised');
                //     }

                //     return;
                // }


                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}
