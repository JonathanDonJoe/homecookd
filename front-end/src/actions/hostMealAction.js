import axios from 'axios';

export default (data, token) => {
    console.log(data)
    console.log(token)
    const signUpUrl = `${window.apiHost}/events/hostMeal/`
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const axiosResponse = axios.post(signUpUrl, data);

    console.log(axiosResponse)

    return {
        type: 'hostMeal',
        payload: axiosResponse
        // ,
        // payload: axiosResponse
    }
}