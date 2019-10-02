export default (state = {}, action) => {
    if (action.type === 'changeModal') {
        return action.payload;
    } 
    return state;
}