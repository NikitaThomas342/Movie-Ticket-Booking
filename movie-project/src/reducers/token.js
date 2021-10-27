const tokenReducer = (state='',action) => {
    switch(action.type){
        case'LOGIN_TOKEN':
            state = action.payload
            return state
        case'LOGOUT_TOKEN':
            state = ''
            return state
        default:
            return state
    }
}

export default tokenReducer