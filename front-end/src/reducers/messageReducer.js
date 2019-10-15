export default (state = {refreshMessages:0}, action) => {
    if (action.type === 'refreshMessages') {
        return action.payload
    }
    return state;
}