import axios from 'axios';

export default(data)=>{
    // console.log(data)
    const loginUrl = `${window.apiHost}/users/login`
    const axiosResponse = axios.post(loginUrl,data);

    // Waiting. Waiting. Waiting. (via redux-promise - our middleware)

    return {
        type:"login",
        payload: axiosResponse
    }
}