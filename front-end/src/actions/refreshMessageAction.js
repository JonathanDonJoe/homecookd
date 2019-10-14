export default (data) => {
    console.log(data)
    return {
        type: 'refreshMessages',
        payload: {refresh: data}
    }
}