export default (data) => {
    // console.log(data)
    return {
        type: 'changeConvo',
        payload: {conversation: data}
    }
}