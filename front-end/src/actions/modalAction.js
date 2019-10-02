export default(toDo)=>{
    if (toDo === 'closeModal') {
        return ({
            type: "changeModal", 
            payload: {
                modal: 'close'
            }
        })
    } else if (toDo === 'openModal') {
        return ({
            type: 'changeModal', 
            payload: {
                modal: 'open'
            }
        })
    }
}