export default (state = {refreshMessages:0}, action) => {
    if (action.type === 'refreshMessages') {
        console.log('hi')
        // console.log(action.payload)
        // console.log(action.payload);
        return action.payload
    }
    console.log('hello')
    return state;
}