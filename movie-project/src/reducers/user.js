const userReducer = (state=null,action) => {
    switch(action.type){
        case'LOGIN':
            state = action.payload
            return state
        case'LOGOUT':
            state = null
            return state
        default:
            return state
    }
}

export default userReducer