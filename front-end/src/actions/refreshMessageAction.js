export default (data) => {
    return {
        type: 'refreshMessages',
        payload: {refresh: data}
    }
}