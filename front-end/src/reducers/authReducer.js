export default (state = {}, action) => {
    if (action.type === 'login') {
        // console.log('We are logging in')
        // console.log(action.payload.data)
        return action.payload.data
    } else if (action.type === 'logout') {
        return {};
    }
    return state;
}