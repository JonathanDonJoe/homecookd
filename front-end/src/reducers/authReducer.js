export default (state = {}, action) => {
    if (action.type === 'logout') {
        return {};
    }
    return state;
}