import axios from 'axios';

export default (data) => {
    console.log(data)
    const signUpUrl = `${window.apiHost}/`
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    // // Fail Case
    // axios.defaults.headers.common['Authorization'] = `Bearer ${this.idToken}`.replace('d','b');

    const axiosResponse = axios.post(signUpUrl, data);
    console.log(axiosResponse)
    return {
        type: 'tokenLogin',
        payload: axiosResponse
        // ,
        // payload: axiosResponse
    }
}