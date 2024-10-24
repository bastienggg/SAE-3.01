import {postRequest} from '../lib/api-request.js';

let UserData = {};

UserData.signup = async function(formdata) {
    let data = await postRequest('users/signup', formdata);
    return data;
}

UserData.signin = async function(email, password) {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    let response = await postRequest('users/signin', data);
    return response;
}



export {UserData};
