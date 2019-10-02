import axios from 'axios';

export default (data) =>{
    console.log(data);

    const registerUrl = `${window.apiHost}/users/register`
    const axiosResponse = axios.post(registerUrl,data);

    return {
        type: "register",
        payload: axiosResponse
    }
}