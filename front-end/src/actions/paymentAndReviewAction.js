import axios from 'axios';

export default (data, token) => {
    console.log(data)
    console.log(data.token)
    const submitReviewUrl = `${window.apiHost}/events/submit_review/`
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    const axiosResponse = axios.post(submitReviewUrl, data);

    // console.log(axiosResponse)

    return {
        type: 'submit_review',
        payload: axiosResponse
    }
}