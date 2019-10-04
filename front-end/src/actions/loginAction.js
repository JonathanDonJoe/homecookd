// import axios from 'axios';

export default (data) => {
    // const signUpUrl = `${window.apiHost}/users/login`
    // const axiosResponse = axios.post(signUpUrl, data);
    return {
        type: 'login',
        payload: data
        // ,
        // payload: axiosResponse
    }
}