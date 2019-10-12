export default (state = {}, action) => {
    if (action.type === 'tokenLogin') {
        console.log('token login running')
        console.log(action.payload)
    } if (action.type === 'login') {
        // console.log('We are logging in')
        console.log(action.payload.data)
        localStorage['access_token'] = action.payload.data.token;
        return action.payload.data
    } else if (action.type === 'logout') {
        localStorage.removeItem('access_token');
        return {};
    }
    return state;
}