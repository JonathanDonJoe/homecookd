export default (state = {searching:''}, action) => {
    if (action.type === 'searching') {
        console.log(action.payload)
        return action.payload
    }
    return state;
}