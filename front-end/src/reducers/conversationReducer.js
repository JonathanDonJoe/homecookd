export default (state = {changeConvo:''}, action) => {
    if (action.type === 'changeConvo') {
        // console.log(action.payload)
        // console.log(action.payload);
        return action.payload
    }
    return state;
}