import axios from 'axios';

export default (data) => {
    // console.log(data)
    const signUpUrl = `${window.apiHost}/users/tokenLogin`
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    // // Fail Case
    // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`.replace('d','b');

    const axiosResponse = axios.post(signUpUrl, data);
    return {
        type: 'tokenLogin',
        payload: axiosResponse
    }
}